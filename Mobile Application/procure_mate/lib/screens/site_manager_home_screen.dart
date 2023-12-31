import 'dart:io';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:path_provider/path_provider.dart';
import 'package:procure_mate/models/response.dart';
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
List<String> options = ['Pending', 'Rejected', 'Approved', 'Completed'];

class _SiteManagerHomePageState extends State<SiteManagerHomePage> {
  List<Map<String, dynamic>> purchaseorders1 = [];
  List<Map<String, dynamic>> purchaseorders2 = [];

  //Banner count related
  late List<Map<String, dynamic>> deliveryNotes1;
  int countDN = 0;

  String currentOption = options[0];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getPurchaseOrders();
    getDeliveryNotes();
  }

  Future<void> getDeliveryNotes() async {
    deliveryNotes1 =
        await DBService.getAllApprovalPendingDeliveryNotes(widget.user.empId);

    setState(() {
      countDN = deliveryNotes1.length;
    });
  }

  Future<void> getPurchaseOrders() async {
    purchaseorders1 =
        await DBService.getSiteManagerPurchaseOrders(widget.user.empId);
    setState(() {
      purchaseorders2 = purchaseorders1;
    });
    filter(options[0]);
  }

  void deletePendingPO(String poNumber) async {
    Response response = await DBService.deletePendingPurchaseOrders(poNumber);
    if (response.code == 200) {
      Fluttertoast.showToast(
          msg: "Purchase Order deleted!",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.redAccent,
          textColor: Colors.white,
          fontSize: 16.0);
    } else {
      Fluttertoast.showToast(
          msg: "Delete Request Unsuccessful!",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.amberAccent,
          textColor: Colors.white,
          fontSize: 16.0);
    }
  }

  void filter(String option) {
    setState(() {
      purchaseorders2 = purchaseorders1
          .where((element) => element["status"] == option)
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        drawer: leftNavBar(),
        appBar: AppBar(
          title: Align(
              alignment: Alignment.center, child: Text('Welcome to Procumate')),
        ),
        body: Column(children: [
          radioButtonGroup(),
          Expanded(
              child: SizedBox(
            child: LoadPurchaseRequests(),
          ))
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
            trailing: countDN != 0
                ? ClipOval(
                    child: Container(
                      color: Colors.red,
                      width: 20,
                      height: 20,
                      child: Center(
                        child: Text(
                          countDN.toString(),
                          style: TextStyle(
                            color: Colors.grey,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ),
                  )
                : null,
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
    return Container(
      width: double.infinity,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: options.map((option) {
          return Column(
            children: [
              Radio(
                value: option,
                groupValue: currentOption,
                onChanged: (value) {
                  setState(() {
                    currentOption = value.toString();
                  });
                  filter(value!);
                },
              ),
              Text(
                option,
                style: TextStyle(
                    fontSize: 10), // You can adjust the font size here
              ),
            ],
          );
        }).toList(),
      ),
    );
  }

  // Widget LoadPurchaseRequests() => ListView(
  //     children: purchaseorders2
  //         .map((e) => GestureDetector(
  //               onTap: () {},
  //               child: Card(
  //                 elevation: 50,
  //                 shadowColor: Colors.black,
  //                 color: Colors.greenAccent[100],
  //                 child: SizedBox(
  //                   width: 400,
  //                   height: 160,
  //                   child: Padding(
  //                     padding: const EdgeInsets.all(20.0),
  //                     child: Column(
  //                       children: [
  //                         const SizedBox(
  //                           height: 10,
  //                         ),
  //                         Text(
  //                           'PO Number : ${e["pOrderId"]}',
  //                           style: TextStyle(
  //                             fontSize: 15,
  //                             color: Colors.green[900],
  //                             fontWeight: FontWeight.w500,
  //                           ),
  //                         ),
  //                         Text(
  //                           'DO Number : ${e["deliveryId"]}',
  //                           style: TextStyle(
  //                             fontSize: 15,
  //                             color: Colors.green[900],
  //                             fontWeight: FontWeight.w500,
  //                           ),
  //                         ),
  //                         const SizedBox(
  //                           height: 10,
  //                         ),
  //                         Row(
  //                           mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //                           children: [
  //                             Text(
  //                               'Item : ${e["itemName"]}',
  //                               style: TextStyle(
  //                                 fontSize: 15,
  //                                 color: Colors.green,
  //                               ),
  //                             ),
  //                             Text(
  //                               'Quantity : ${e["qty"]}',
  //                               style: TextStyle(
  //                                 fontSize: 15,
  //                                 color: Colors.green,
  //                               ),
  //                             ),
  //                           ],
  //                         ),
  //                         const SizedBox(
  //                           height: 10,
  //                         ),
  //                         Row(
  //                           mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //                           children: [
  //                             Text(
  //                               'Amount : Rs.10,000',
  //                               style: TextStyle(
  //                                 fontSize: 15,
  //                                 color: Colors.green,
  //                               ),
  //                             ),
  //                             Text(
  //                               'Date : ${e["date"].toString().substring(0, 10)}',
  //                               style: TextStyle(
  //                                 fontSize: 15,
  //                                 color: Colors.green,
  //                               ),
  //                             ),
  //                           ],
  //                         ),
  //                         const SizedBox(
  //                           height: 10,
  //                         ),
  //                       ],
  //                     ),
  //                   ),
  //                 ),
  //               ),
  //             ))
  //         .toList());

  Widget LoadPurchaseRequests() => ListView(
        children: purchaseorders2.map((e) {
          if (e["status"] == "Pending") {
            return Dismissible(
              key: UniqueKey(),
              onDismissed: (direction) {
                if (direction == DismissDirection.endToStart &&
                    e["status"] == "Pending") {
                  //delete from db
                  deletePendingPO(e['pOrderId']);
                  // Handle the swipe-to-left action (e.g., delete the card).
                  setState(() {
                    purchaseorders2.remove(e);
                    purchaseorders1.remove(e);
                  });
                }
              },
              background: Container(
                color: Colors.red, // Background color when swiping left
                alignment: Alignment.centerRight,
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Icon(
                    Icons.delete,
                    color: Colors.white,
                  ),
                ),
              ),
              child: Card(
                elevation: 5,
                shadowColor: Colors.black,
                color: Color(0xFFE8E478),
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
                            color: Colors.black,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        // Text(
                        //   'DO Number : ${e["deliveryId"]}',
                        //   style: TextStyle(
                        //     fontSize: 15,
                        //     color: Colors.black,
                        //     fontWeight: FontWeight.w500,
                        //   ),
                        // ),
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
                                color: Colors.black,
                              ),
                            ),
                            Text(
                              'Quantity : ${e["qty"]}',
                              style: TextStyle(
                                fontSize: 15,
                                color: Colors.black,
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
                              'Amount : Rs.${(e["qty"] * e["unitPrice"]).toStringAsFixed(2)}',
                              style: TextStyle(
                                fontSize: 15,
                                color: Colors.black,
                              ),
                            ),
                            Text(
                              'Date : ${e["date"].toString().substring(0, 10)}',
                              style: TextStyle(
                                fontSize: 15,
                                color: Colors.black,
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
            );
          } else {
            return GestureDetector(
              key: UniqueKey(),
              child: Card(
                elevation: 5,
                shadowColor: Colors.black,
                color: e["status"] == "Rejected"
                    ? Color(0xFFDA8383)
                    : e["status"] == "Completed"
                        ? Color(0xFF66DE87)
                        : Color(0xFFC8E7F2),
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
                            color: Colors.black,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        // Text(
                        //   'DO Number : ${e["deliveryId"]}',
                        //   style: TextStyle(
                        //     fontSize: 15,
                        //     color: Colors.black,
                        //     fontWeight: FontWeight.w500,
                        //   ),
                        // ),
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
                                color: Colors.black,
                              ),
                            ),
                            Text(
                              'Quantity : ${e["qty"]}',
                              style: TextStyle(
                                fontSize: 15,
                                color: Colors.black,
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
                              'Amount : Rs.${(e["qty"] * e["unitPrice"]).toStringAsFixed(2)}',
                              style: TextStyle(
                                fontSize: 15,
                                color: Colors.black,
                              ),
                            ),
                            Text(
                              'Date : ${e["date"].toString().substring(0, 10)}',
                              style: TextStyle(
                                fontSize: 15,
                                color: Colors.black,
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
            );
          }
        }).toList(),
      );
}
