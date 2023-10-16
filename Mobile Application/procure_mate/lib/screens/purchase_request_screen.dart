import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:procure_mate/models/purchase_order.dart';
import 'package:procure_mate/models/response.dart';
import 'dart:math';

import 'package:procure_mate/models/site_manager.dart';
import 'package:procure_mate/services/db_service.dart';

class PurchaseRequestScreen extends StatefulWidget {
  const PurchaseRequestScreen(this._width, this._height, this.user,
      {super.key});

  final double _width;
  final double _height;
  final SiteManager user;

  @override
  State<PurchaseRequestScreen> createState() => _PurchaseRequestScreenState();
}

class _PurchaseRequestScreenState extends State<PurchaseRequestScreen> {
  final emailController = TextEditingController();
  final _totalController = TextEditingController();
  final _quantityController = TextEditingController();
  final Random _random = Random();
  late List<Map<String, dynamic>> _allPurchaseOrders;
  late List<Map<String, dynamic>> _allItems;
  List<Map<String, dynamic>> _itemPrices = List.empty();
  List<String> _distinctItems = [""];
  List<String> _distinctSuppliers = [""];
  Map<String, dynamic>? _selectedItemDetails;

  // Initial Selected Value
  String _itemDropDownValue = '';
  String _supplierDropDownValue = '';

  // final String _currDate = DateTime.now().toString().substring(0, 10);
  final DateTime _currDate = DateTime.now();

  String _nextPO = '';
  DateTime? _dueDate; // Store the selected date.

  String _dueDateErrorMsg = '';
  String _qtyErrorMsg = '';

  @override
  void initState() {
    super.initState();
    emailController.addListener(() => setState(() {}));
    _generateNextPONumber();
    _getItems();
  }

  Future<void> _generateNextPONumber() async {
    _allPurchaseOrders = await DBService.getAllPurchaseOrders();
    int nextNumberInInt =
        int.parse(_allPurchaseOrders[0]['pOrderId'].substring(3)) + 1;
    String nextNumberInString = nextNumberInInt.toString().padLeft(4, '0');
    setState(() {
      _nextPO = '#P-$nextNumberInString';
    });
  }

  Future<void> _getItems() async {
    _allItems = await DBService.getAllItems();
    Set<String> distinctItemNames = <String>{};
    Set<String> distinctSuppliersId = <String>{};
    for (var item in _allItems) {
      if (item.containsKey("itemName")) {
        distinctItemNames.add(item["itemName"]);
      }
    }
    for (var supplier in _allItems) {
      if (supplier.containsKey("supplierId")) {
        distinctSuppliersId.add(supplier["supplierId"]);
      }
    }
    setState(() {
      _distinctItems = distinctItemNames.toList();
      _distinctSuppliers = distinctSuppliersId.toList();
    });
  }

  Future<void> _getItemPrices(String itemName) async {
    List<Map<String, dynamic>> itemPrices =
        await DBService.getItemPrices(itemName);
    setState(() {
      _itemPrices = itemPrices;
    });
    _calculateTotal();
  }

  void _calculateTotal() {
    if (_itemDropDownValue != '' &&
        _supplierDropDownValue != '' &&
        _quantityController.text != '') {
      _selectedItemDetails = _allItems.firstWhere(
        (item) =>
            item["itemName"] == _itemDropDownValue &&
            item["supplierId"] == _supplierDropDownValue,
        orElse: () => {}, // Handle the case where no matching item is found
      );
      print(_selectedItemDetails.toString());
      _totalController.text = (_selectedItemDetails?["unitPrice"].toDouble() *
              int.parse(_quantityController.text))
          .toStringAsFixed(2);
    }
  }

  bool _validateFields() {
    if (_dueDate == null){
      setState(() {
        _dueDateErrorMsg = 'Select due date!';
      });
    }
    if (_quantityController.text == ''){
      setState(() {
        _qtyErrorMsg = 'Enter the quantity!';
      });
    }
    if (_nextPO == '') {
      Fluttertoast.showToast(
          msg: "Network Error! Please restart app.",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return false;
    } else if (_dueDate == null) {

      Fluttertoast.showToast(
          msg: "Select due date!",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return false;
    } else if (_itemDropDownValue == '') {
      Fluttertoast.showToast(
          msg: "Select an item!",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return false;
    } else if (_quantityController.text == '') {

      Fluttertoast.showToast(
          msg: "Enter the quantity!",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return false;
    } else if (_supplierDropDownValue == '') {
      Fluttertoast.showToast(
          msg: "Select a supplier!",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
      return false;
    }
    return true;
  }

  Future<void> _onTapSubmitBtn(BuildContext context) async {
    if (_validateFields() == true) {
      String status = "";
      double amount = double.parse(_quantityController.text) *
          _selectedItemDetails?["unitPrice"];
      if (amount > 100000) {
        status = "Pending";
      } else {
        status = "Approved";
      }

      Map<String, dynamic> purchaseOrder = {
        "pOrderId": _nextPO,
        "itemCode": _selectedItemDetails?["itemCode"],
        "itemName": _selectedItemDetails?["itemName"],
        "unitPrice": _selectedItemDetails?["unitPrice"],
        "qty": double.parse(_quantityController.text),
        "uom": _selectedItemDetails?["uom"],
        "amount": amount,
        "date": _currDate,
        "dueDate": _dueDate,
        "supplierId": _supplierDropDownValue,
        "siteMngId": widget.user.empId,
        "siteId": widget.user.siteId,
        "location": widget.user.location,
        "status": status,
        "rejectReason": ""
      };
      print(purchaseOrder.toString());
      Response response = await DBService.createPO(purchaseOrder);
      if (response.code == 200) {
        Fluttertoast.showToast(
            msg: "Purchase Order created successfully!",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.green,
            textColor: Colors.white,
            fontSize: 16.0);
        Navigator.pop(context);
      } else {
        print(response.message);
        Fluttertoast.showToast(
            msg: "Error!",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
      }
    }
  }

  Widget pONumber() => TextField(
        decoration: InputDecoration(
          labelText: 'PO Number',
          border: OutlineInputBorder(),
        ),
        readOnly: true,
        controller: TextEditingController(text: _nextPO),
      );

  Widget claimDate() {
    return TextFormField(
      readOnly: true,
      decoration: InputDecoration(
        labelText: 'Current Date',
        border: OutlineInputBorder(),
      ),
      controller: TextEditingController(
        text: _currDate.toString().substring(
            0, 10), // Display selected date in the format yyyy-MM-dd.
      ),
    );
  }

  Widget dueDate() {
    return TextFormField(
      readOnly: true,
      decoration: InputDecoration(
        errorText: _dueDateErrorMsg.isEmpty ? null : _dueDateErrorMsg,
        labelText: 'Due Date',
        border: OutlineInputBorder(),
        suffixIcon: GestureDetector(
          onTap: () async {
            final selectedDate = await showDatePicker(
              context: context,
              initialDate: DateTime.now(),
              firstDate: DateTime(2023),
              lastDate: DateTime(2101),
            );
            if (selectedDate != null) {
              setState(() {
                _dueDate = selectedDate;
                _dueDateErrorMsg = '';
              });
            }
          },
          child: Icon(Icons.calendar_today),
        ),
      ),
      controller: TextEditingController(
        text: _dueDate == null
            ? ''
            : '${_dueDate!.toLocal()}'.split(
                ' ')[0], // Display selected date in the format yyyy-MM-dd.
      ),
    );
  }

  Widget location() => TextField(
        decoration: InputDecoration(
          labelText: 'Location',
          border: OutlineInputBorder(),
        ),
        readOnly: true,
        controller: TextEditingController(text: widget.user.location),
      );

  Widget siteManagerName() => TextField(
        decoration: InputDecoration(
          labelText: 'Site Manager Name',
          border: OutlineInputBorder(),
        ),
        readOnly: true,
        controller: TextEditingController(text: widget.user.name),
      );

  Widget items() => DropdownButton(
        // Initial Value
        value: _itemDropDownValue.isNotEmpty ? _itemDropDownValue : null,
        hint: Text("Select an item"),
        // Down Arrow Icon
        icon: const Icon(Icons.keyboard_arrow_down),
        // Array list of items
        items: _distinctItems.map((String items) {
          return DropdownMenuItem(
            value: items,
            child: Text(items),
          );
        }).toList(),
        // After selecting the desired option,it will
        // change button value to selected value
        onChanged: (String? newValue) {
          _getItemPrices(newValue!);

          setState(() {
            _itemDropDownValue = newValue!;
          });
        },
      );

  Widget suppliers() => DropdownButton(
        // Initial Value
        value:
            _supplierDropDownValue.isNotEmpty ? _supplierDropDownValue : null,
        hint: Text("Select a supplier"),
        // Down Arrow Icon
        icon: const Icon(Icons.keyboard_arrow_down),
        items: _distinctSuppliers.map((String supplier) {
          return DropdownMenuItem(
            value: supplier,
            child: Text(supplier),
          );
        }).toList(),
        // After selecting the desired option,it will
        // change button value to selected value
        onChanged: (String? newValue) {
          setState(() {
            _supplierDropDownValue = newValue!;
          });
          _calculateTotal();
        },
      );

  Widget quantity() => TextField(
        controller: _quantityController,
        keyboardType: TextInputType.numberWithOptions(),
        decoration: InputDecoration(
          errorText: _qtyErrorMsg.isEmpty ? null : _qtyErrorMsg,
          labelText: 'Quantity',
          border: OutlineInputBorder(),
        ),
        onChanged: (text) {
          _calculateTotal();
          setState(() {
            _qtyErrorMsg = '';
          });
        },
      );

  Widget buildEmail() => TextField(
        controller: emailController,
        decoration: InputDecoration(
          hintText: 'name@gmail.com',
          prefixIcon: Icon(Icons.mail),
          suffixIcon: emailController.text.isEmpty
              ? Container(width: 0)
              : IconButton(
                  icon: Icon(Icons.close),
                  onPressed: () => emailController.clear(),
                ),
          border: OutlineInputBorder(),
        ),
        keyboardType: TextInputType.emailAddress,
        textInputAction: TextInputAction.next,
      );

  Widget displaySupplier() => DataTable(
        columns: const <DataColumn>[
          DataColumn(
            label: Expanded(
              child: Text(
                'Supplier',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            ),
          ),
          DataColumn(
            label: Expanded(
              child: Text(
                'Unit Price',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            ),
          ),
        ],
        rows: _itemPrices
            .map((e) => DataRow(cells: [
                  DataCell(Text(e["supplierId"])),
                  DataCell(Text("Rs." + e["unitPrice"].toStringAsFixed(2)))
                ]))
            .toList(),
      );

  Widget total() => TextField(
      controller: _totalController,
      decoration: InputDecoration(
        labelText: 'Total',
        border: OutlineInputBorder(),
      ),
      readOnly: true);

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: const Text("Purchase Request"),
        ),
        body: Center(
          child: ListView(
            padding: EdgeInsets.all(32),
            children: [
              const SizedBox(height: 24),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: pONumber(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: claimDate(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: location(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: siteManagerName(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: dueDate(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: items(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: quantity(),
              ),
              _itemPrices.isNotEmpty ? displaySupplier() : Container(),
              // displaySupplier(),
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: suppliers(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: total(),
              ),
              ElevatedButton(
                child: const Text('Submit'),
                onPressed: () {
                  _onTapSubmitBtn(context);
                },
              ),
              const SizedBox(height: 24),
              const SizedBox(height: 24),
            ],
          ),
        ),
      );
}
