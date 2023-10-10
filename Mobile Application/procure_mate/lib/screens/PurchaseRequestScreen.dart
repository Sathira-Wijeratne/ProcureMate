import 'package:flutter/material.dart';
import 'dart:math';

class PurchaseRequestScreen extends StatefulWidget {
  const PurchaseRequestScreen(this._width, this._height, {super.key});
  final double _width;
  final double _height;

  @override
  State<PurchaseRequestScreen> createState() => _PurchaseRequestScreenState();
}

class _PurchaseRequestScreenState extends State<PurchaseRequestScreen> {
  final emailController = TextEditingController();
  final Random _random = Random();

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
  }

  void _generateRandomPONumber() {
    setState(() {
      _randomPO = '#P-${_random.nextInt(1000).toString().padLeft(4, '0')}';
    });
  }

  @override
  Widget build(BuildContext context) => Scaffold(
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
          displaySupplier(),
          ElevatedButton(
            child: Text('Submit'),
            onPressed: () {
              _generateRandomPONumber();
            },
          ),


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
    controller: TextEditingController(text: _randomPO),
  );

  Widget ClaimDate() {
    return TextFormField(
      readOnly: true,
      decoration: InputDecoration(
        labelText: 'Claim Date',
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
            : '${_selectedDate!.toLocal()}'.split(' ')[0], // Display selected date in the format yyyy-MM-dd.
      ),
    );
  }

  Widget Location() => TextField(
    decoration: InputDecoration(
      labelText: 'Location',
      border: OutlineInputBorder(),
    ),
    readOnly: true,
    controller: TextEditingController(),
  );

  Widget SiteManagerName() => TextField(
    decoration: InputDecoration(
      labelText: 'Site Manager Name',
      border: OutlineInputBorder(),
    ),
    readOnly: true,
  );

  Widget Items()=>DropdownButton(

    // Initial Value
    value: dropdownvalue,

    // Down Arrow Icon
    icon: const Icon(Icons.keyboard_arrow_down),

    // Array list of items
    items: items.map((String items) {
      return DropdownMenuItem(
        value: items,
        child: Text(items),
      );
    }).toList(),
    // After selecting the desired option,it will
    // change button value to selected value
    onChanged: (String? newValue) {
      setState(() {
        dropdownvalue = newValue!;
      });
    },

  );
  Widget Quantity() => TextField(
      decoration: InputDecoration(
        labelText: 'Quantity',
        border: OutlineInputBorder(),
      ),
      readOnly: true
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

  Widget displaySupplier()=>DataTable(
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
}