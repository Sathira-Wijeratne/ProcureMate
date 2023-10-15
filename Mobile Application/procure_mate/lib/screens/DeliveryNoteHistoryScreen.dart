import 'package:flutter/material.dart';
import 'package:procure_mate/services/db_service.dart';
import '../models/site_manager.dart';
import 'view_delivery_note_in_detail_screen.dart';

class DeliveryNoteHistoryScreen extends StatefulWidget {
  const DeliveryNoteHistoryScreen(this._width, this._height, this.user, {super.key});

  final double _width;
  final double _height;
  final SiteManager user;


  @override
  State<DeliveryNoteHistoryScreen> createState() => _DeliveryNoteHistoryScreenState();
}

class _DeliveryNoteHistoryScreenState extends State<DeliveryNoteHistoryScreen> {

  List<Map<String,dynamic>> POHistory1 =[];
  List<Map<String,dynamic>> POHistory2 =[];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getConfirmedDeliveryNotes();
  }

  Future<void> getConfirmedDeliveryNotes() async {
    POHistory1 =
    await DBService.getAllApprovedDeliveryNotes(widget.user.empId);
    print(POHistory1.toString());
    setState(() {
      POHistory2 = POHistory1;
    });
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Delivery Notes History"),
      ),
      body: ListView(
          children: POHistory2
              .map((e) => GestureDetector(
            onTap: () {
              // Navigate to the my claims page when the item is tapped
              Navigator.of(context).pop(); // Close the drawer
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => ViewDeliveryNoteInDetailScreen(
                      widget._width, widget._height, widget.user, e,false),
                ),
              );
            },
            child: Card(
              elevation: 50,
              shadowColor: Colors.black,
              color: Color(0xFFC8E7F2),
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
                      Text(
                        'DO Number : ${e["deliveryId"]}',
                        style: TextStyle(
                          fontSize: 15,
                          color: Colors.black,
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
                        mainAxisAlignment:
                        MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Amount : Rs.10,000',
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
          ))
              .toList()),
    );
  }
}