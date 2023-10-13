import 'package:flutter/material.dart';

import '../models/site_manager.dart';
import '../services/db_service.dart';
import 'view_delivery_note_in_detail_screen.dart';

class ViewDeliveryNotesScreen extends StatefulWidget {
  const ViewDeliveryNotesScreen(this._width, this._height, this.user,
      {super.key});

  final double _width;
  final double _height;
  final SiteManager user;

  @override
  State<ViewDeliveryNotesScreen> createState() => _ViewDeliveryNotesScreenState();
}

class _ViewDeliveryNotesScreenState extends State<ViewDeliveryNotesScreen> {
  late List<Map<String, dynamic>> deliveryNotes1;
  late List<Map<String, dynamic>> deliveryNotes2;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    deliveryNotes2 = [];
    getDeliveryNotes();
  }

  Future<void> getDeliveryNotes() async {
    deliveryNotes1 =
        await DBService.getAllApprovalPendingDeliveryNotes(widget.user.empId);
    print(deliveryNotes1.toString());
    setState(() {
      deliveryNotes2 = deliveryNotes1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Delivery Notes"),
      ),
      body: ListView(
          children: deliveryNotes2
              .map((e) => GestureDetector(
                    onTap: () {
                      // Navigate to the my claims page when the item is tapped
                      Navigator.of(context).pop(); // Close the drawer
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => ViewDeliveryNoteInDetailScreen(
                              widget._width, widget._height, widget.user, e["deliveryId"]),
                        ),
                      );
                    },
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
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
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
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
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
              .toList()),
    );
  }
}
