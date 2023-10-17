import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:procure_mate/models/response.dart';
import 'package:procure_mate/screens/view_delivery_notes_screen.dart';
import 'package:procure_mate/services/db_service.dart';
import '../models/site_manager.dart';

class ViewDeliveryNoteInDetailScreen extends StatefulWidget {
  const ViewDeliveryNoteInDetailScreen(
      this._width, this._height, this._user, this._deliveryNote,this._visible,
      {super.key});

  final double _width;
  final double _height;
  final SiteManager _user;
  final Map<String, dynamic> _deliveryNote;
  final bool _visible;

  @override
  State<ViewDeliveryNoteInDetailScreen> createState() =>
      _ViewDeliveryNoteInDetailScreenState();
}

class _ViewDeliveryNoteInDetailScreenState
    extends State<ViewDeliveryNoteInDetailScreen> {
  final emailController = TextEditingController();
  final Random _random = Random();
  List<Map<String, dynamic>> _purchaseOrder1 = [];
  Map<String, dynamic> _purchaseOrder2 = {};

  // Initial Selected Value
  String dropdownvalue = 'Item 1';

  // List of items in our dropdown menu
  var items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ];

  String _randomPO = '';
  DateTime? _selectedDate; // Store the selected date.

  @override
  void initState() {
    super.initState();
    emailController.addListener(() => setState(() {}));
    _generateRandomPONumber();
    _getPODetails();
  }

  Future<void> _getPODetails() async {
    _purchaseOrder1 =
        await DBService.getPurchaseOrder(widget._deliveryNote["pOrderId"]);
    setState(() {
      _purchaseOrder2 = _purchaseOrder1[0];
      print(_purchaseOrder2.toString());
    });
  }

  Future<bool> _onWillPop(String? newStatus) async {
    return (await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Are you sure?'),
          content: Text('Do you want to ${newStatus ?? ''} the delivery note'), // Include the newStatus variable with a default value

        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('No'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Yes'),
          ),
        ],
      ),
    )) ??
        false;
  }

  Future<void> _onTapConfirmationBtns(
      BuildContext context, String newStatus) async {
    var action = '';
    if(newStatus == 'Rejected'){
      action = "reject";
    } else{
      action = 'confirm';
    }
    var response = await _onWillPop(action);
    if(response){
      widget._deliveryNote["status"] = newStatus;
      print(widget._deliveryNote.toString());
      Response response =
      await DBService.updateDeliveryNoteStatus(widget._deliveryNote);
      if (response.code == 200) {
        Fluttertoast.showToast(
            msg: 'Delivery Note $newStatus!',
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
        // Navigator.pop(context);
        Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (BuildContext context)=>ViewDeliveryNotesScreen(widget._width, widget._height, widget._user)));
      } else {
        print(response.message);
        Fluttertoast.showToast(
            msg: 'Something went wrong!',
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.CENTER,
            timeInSecForIosWeb: 1,
            backgroundColor: Colors.red,
            textColor: Colors.white,
            fontSize: 16.0);
      }
    }else{

    }

  }

  void _generateRandomPONumber() {
    setState(() {
      _randomPO = '#P-${_random.nextInt(1000).toString().padLeft(4, '0')}';
    });
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text("Delivery Note"),
        ),
        body: Center(
          child: ListView(
            padding: EdgeInsets.all(32),
            children: [
              const SizedBox(height: 24),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: PONumber(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: ClaimDate(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Location(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: SiteManagerName(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Items(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Quantity(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: supplier(),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Total(),
              ),
              widget._visible==true ?
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  ElevatedButton(
                    child: Text('Confirm'),
                    onPressed: () {
                      _onTapConfirmationBtns(context, "Confirmed");
                    },
                  ),
                  ElevatedButton(
                    child: Text('Reject'),
                    onPressed: () {
                      _onTapConfirmationBtns(context, "Rejected");
                    },
                  ),
                ],
              ) :Container(),
              const SizedBox(height: 24),
              const SizedBox(height: 24),
            ],
          ),
        ),
      );

  Widget PONumber() => TextField(
        decoration: InputDecoration(
          labelText: 'PO Number',
          border: OutlineInputBorder(),
        ),
        readOnly: true,
        controller:
            TextEditingController(text: widget._deliveryNote["pOrderId"]),
      );

  Widget ClaimDate() {
    return TextFormField(
      readOnly: true,
      decoration: InputDecoration(
        labelText: 'Claim Date',
        border: OutlineInputBorder(),
      ),
      controller: TextEditingController(
          text: _purchaseOrder2["date"] == null
              ? ''
              : _purchaseOrder2["date"].toString().substring(0, 10)!),
    );
  }

  Widget Location() => TextField(
        decoration: InputDecoration(
          labelText: 'Location',
          border: OutlineInputBorder(),
        ),
        readOnly: true,
        controller: TextEditingController(text: _purchaseOrder2["location"]),
      );

  Widget SiteManagerName() => TextField(
        decoration: InputDecoration(
          labelText: 'Site Manager Name',
          border: OutlineInputBorder(),
        ),
        readOnly: true,
        controller: TextEditingController(text: widget._user.name),
      );

  Widget Items() => TextField(
    decoration: InputDecoration(
      labelText: 'Item',
      border: OutlineInputBorder(),
    ),
    readOnly: true,
    controller: TextEditingController(text: widget._deliveryNote["itemName"]),
  );

  Widget Quantity() => TextField(
        decoration: InputDecoration(
          labelText: 'Quantity',
          border: OutlineInputBorder(),
        ),
        readOnly: true,
        controller:
            TextEditingController(text: widget._deliveryNote["qty"].toString()),
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
                'Name',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            ),
          ),
          DataColumn(
            label: Expanded(
              child: Text(
                'Age',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            ),
          ),
          DataColumn(
            label: Expanded(
              child: Text(
                'Role',
                style: TextStyle(fontStyle: FontStyle.italic),
              ),
            ),
          ),
        ],
        rows: const <DataRow>[
          DataRow(
            cells: <DataCell>[
              DataCell(Text('Sarah')),
              DataCell(Text('19')),
              DataCell(Text('Student')),
            ],
          ),
          DataRow(
            cells: <DataCell>[
              DataCell(Text('Janine')),
              DataCell(Text('43')),
              DataCell(Text('Professor')),
            ],
          ),
          DataRow(
            cells: <DataCell>[
              DataCell(Text('William')),
              DataCell(Text('27')),
              DataCell(Text('Associate Professor')),
            ],
          ),
        ],
      );

  Widget supplier() => TextField(
    decoration: InputDecoration(
      labelText: 'Supplier',
      border: OutlineInputBorder(),
    ),
    readOnly: true,
    controller: TextEditingController(
        text: widget._deliveryNote["supplierId"],
  ));

  Widget Total() => TextField(
        decoration: InputDecoration(
          labelText: 'Total',
          border: OutlineInputBorder(),
        ),
        readOnly: true,
        controller: TextEditingController(
            text: (widget._deliveryNote["qty"] *
                    widget._deliveryNote["unitPrice"])
                .toString()),
      );
}
