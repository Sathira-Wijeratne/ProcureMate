import 'dart:io';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:procure_mate/models/site_manager.dart';
import 'package:procure_mate/screens/view_delivery_notes_screen.dart';
import 'package:procure_mate/screens/purchase_request_screen.dart';
import 'package:procure_mate/services/db_service.dart';

import 'DeliveryNoteHistoryScreen.dart';
import 'login_screen.dart';

class SiteManagerHomePage extends StatefulWidget {
  const SiteManagerHomePage(this._width, this._height, this.user, {super.key});

  final double _width;
  final double _height;
  final SiteManager user;

  @override
  State<SiteManagerHomePage> createState() => _SiteManagerHomePageState();
}

//Radio Button Group related logic
List<String> options = [
  'Approved',
  'Pending',
  'Rejected',
  'Completed'
];

class _SiteManagerHomePageState extends State<SiteManagerHomePage> {
  List<Map<String, dynamic>> purchaseorders1 = [];
  List<Map<String, dynamic>> purchaseorders2 = [];

  String currentOption = options[0];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getPurchaseOrders();
  }

  Future<void> getPurchaseOrders() async {
    purchaseorders1 =
        await DBService.getSiteManagerPurchaseOrders(widget.user.empId);
    print(purchaseorders1.toString());
    setState(() {
      purchaseorders2 = purchaseorders1;
    });
  }

  void filter(String option){
    setState(() {
      purchaseorders2 = purchaseorders1.where((element) => element["status"] == option).toList();
    });
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        drawer: leftNavBar(),
        appBar: AppBar(
          title: Align(
              alignment: Alignment.bottomRight,
              child: Text('Welcome to Procumate')),
        ),
        body: Column(children: [
          Text("Purchase Order History"),
          radioButtonGroup(),
          Expanded(child: SizedBox(child: LoadPurchaseRequests()))
        ]),
      );

  Widget leftNavBar() => Drawer(
          child: ListView(
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            accountName: Text(widget.user.name),
            accountEmail: Text(widget.user.email),
            currentAccountPicture: CircleAvatar(
              child: ClipOval(
                child: Image.asset(
                  'assets/avatarpic.jpg',
                  width: 90,
                  height: 90,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            decoration: BoxDecoration(
              color: Colors.blueAccent,
            ),
          ),
          ListTile(
            leading: Icon(Icons.home),
            title: Text("Purchase Request"),
            onTap: () {
              // Navigate to the my claims page when the item is tapped
              Navigator.of(context).pop(); // Close the drawer
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => PurchaseRequestScreen(
                      widget._width, widget._height, widget.user),
                ),
              );
            },
          ),
          Divider(),
          ListTile(
            leading: Icon(Icons.analytics_outlined),
            title: Text("View Delivery Notes"),
            onTap: () {
              Navigator.of(context).pop(); // Close the drawer
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => ViewDeliveryNotesScreen(
                        widget._width, widget._height, widget.user)),
              );
            },
            trailing: ClipOval(
              child: Container(
                color: Colors.red,
                width: 20,
                height: 20,
                child: Center(
                  child: Text(
                    '8',
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 12,
                    ),
                  ),
                ),
              ),
            ),
          ),
          Divider(),
          ListTile(
            leading: Icon(Icons.monetization_on),
            title: Text("Delivery Note History"),
            onTap: () {
              Navigator.of(context).pop(); // Close the drawer
              Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) => DeliveryNoteHistoryScreen(
                        widget._width, widget._height, widget.user)),
              );
            },
          ),
          Divider(),
          ListTile(
            leading: Icon(Icons.logout),
            title: Text("LOG OUT"),
            onTap: () async {
              final directory = await getApplicationDocumentsDirectory();
              final path = directory.path;
              File file = File('$path/userdata.txt');
              await file.delete();

              Navigator.of(context).pop(); // Close the drawer
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (BuildContext context) =>
                      LoginScreen(widget._width, widget._height),
                ),
              );
            },
          )
        ],
      ));

  Widget radioButtonGroup() {
    return Column(
      children: [
        ListTile(
          title: Text('Approved'),
          leading: Radio(
            value: options[0],
            groupValue: currentOption,
            onChanged: (value) {
              setState(() {
                currentOption = value.toString();
              });
              filter(value!);
            },
          ),
        ),
        ListTile(
          title: Text('Pending'),
          leading: Radio(
            value: options[1],
            groupValue: currentOption,
            onChanged: (value) {
              setState(() {
                currentOption = value.toString();
              });
              filter(value!);
            },
          ),
        ),
        ListTile(
          title: Text('Rejected'),
          leading: Radio(
            value: options[2],
            groupValue: currentOption,
            onChanged: (value) {
              setState(() {
                currentOption = value.toString();
              });
              filter(value!);
            },
          ),
        ),
        ListTile(
          title: Text('Completed'),
          leading: Radio(
            value: options[3],
            groupValue: currentOption,
            onChanged: (value) {
              setState(() {
                currentOption = value.toString();
              });
              filter(value!);
            },
          ),
        )
      ],
    );
  }

  Widget LoadPurchaseRequests() => ListView(
      children: purchaseorders2
          .map((e) => GestureDetector(
                onTap: () {},
                child: Card(
                  elevation: 50,
                  shadowColor: Colors.black,
                  color: Colors.greenAccent[100],
                  child: SizedBox(
                    width: 400,
                    height: 160,
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        children: [
                          const SizedBox(
                            height: 10,
                          ),
                          Text(
                            'PO Number : ${e["pOrderId"]}',
                            style: TextStyle(
                              fontSize: 15,
                              color: Colors.green[900],
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          Text(
                            'DO Number : ${e["deliveryId"]}',
                            style: TextStyle(
                              fontSize: 15,
                              color: Colors.green[900],
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Item : ${e["itemName"]}',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.green,
                                ),
                              ),
                              Text(
                                'Quantity : ${e["qty"]}',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.green,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Amount : Rs.10,000',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.green,
                                ),
                              ),
                              Text(
                                'Date : ${e["date"].toString().substring(0, 10)}',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.green,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ))
          .toList());
}
