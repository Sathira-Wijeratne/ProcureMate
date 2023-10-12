import 'package:flutter/material.dart';
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
  final Random _random = Random();
  late List<Map<String, dynamic>> _allPurchaseOrders;
  late List<Map<String, dynamic>> _allItems;
  List<String> _distinctItems = [""];
  List<String> _distinctSuppliers = [""];

  // Initial Selected Value
  String _itemDropDownValue = '';
  String _supplierDropDownValue = '';

  final String _currDate = DateTime.now().toString().substring(0, 10);

  String _nextPO = '';
  DateTime? _selectedDate; // Store the selected date.

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
      _nextPO = '#P-${nextNumberInString}';
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
              displaySupplier(),
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
                onPressed: () {},
              ),
              const SizedBox(height: 24),
              const SizedBox(height: 24),
            ],
          ),
        ),
      );

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
        text: _currDate, // Display selected date in the format yyyy-MM-dd.
      ),
    );
  }

  Widget dueDate() {
    return TextFormField(
      readOnly: true,
      decoration: InputDecoration(
        labelText: 'Due Date',
        border: OutlineInputBorder(),
        suffixIcon: GestureDetector(
          onTap: () async {
            final selectedDate = await showDatePicker(
              context: context,
              initialDate: DateTime.now(),
              firstDate: DateTime(2000),
              lastDate: DateTime(2101),
            );
            if (selectedDate != null) {
              setState(() {
                _selectedDate = selectedDate;
              });
            }
          },
          child: Icon(Icons.calendar_today),
        ),
      ),
      controller: TextEditingController(
        text: _selectedDate == null
            ? ''
            : '${_selectedDate!.toLocal()}'.split(
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
        },
      );

  Widget quantity() => TextField(
        keyboardType: TextInputType.number,
        decoration: InputDecoration(
          labelText: 'Quantity',
          border: OutlineInputBorder(),
        ),
        // readOnly: true,
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
        rows: const <DataRow>[
          DataRow(
            cells: <DataCell>[
              DataCell(Text('19')),
              DataCell(Text('Student')),
            ],
          ),
          DataRow(
            cells: <DataCell>[
              DataCell(Text('43')),
              DataCell(Text('Professor')),
            ],
          ),
          DataRow(
            cells: <DataCell>[
              DataCell(Text('27')),
              DataCell(Text('Associate Professor')),
            ],
          ),
        ],
      );

  Widget total() => TextField(
    controller: _totalController,
      decoration: InputDecoration(
        labelText: 'Total',
        border: OutlineInputBorder(),
      ),
      readOnly: true);
}
