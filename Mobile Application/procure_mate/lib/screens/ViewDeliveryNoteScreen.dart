import 'package:flutter/material.dart';

import '../models/site_manager.dart';
import '../services/db_service.dart';
import 'ViewDeliveryNote.dart';

class ViewDeliveryNoteScreen extends StatefulWidget {
  const ViewDeliveryNoteScreen(this._width,this._height,this.user,{super.key});
  final double _width;
  final double _height;
  final SiteManager user;

  @override
  State<ViewDeliveryNoteScreen> createState() => _ViewDeliveryNoteScreenState();
}

class _ViewDeliveryNoteScreenState extends State<ViewDeliveryNoteScreen> {
  late List<Map<String, dynamic>> deliveryNotes;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getDeliveryNotes();
  }

  Future<void> getDeliveryNotes() async {
    deliveryNotes =
    await DBService.getAllApprovalPendingDeliveryNotes(widget.user.empId);
    print(deliveryNotes.toString());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        /** Card Widget **/
        child: GestureDetector(
          onTap: () {
            // Navigate to the my claims page when the item is tapped
            Navigator.of(context).pop(); // Close the drawer
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => ViewDeliveryNote(
                    widget._width, widget._height, widget.user),
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
                      'PO Number : 123',
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
                          'Item : ABC',
                          style: TextStyle(
                            fontSize: 15,
                            color: Colors.green,
                          ),
                        ),
                        Text(
                          'Quantity : 10',
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
                          'Date : 12/10/2023',
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
        ),
      ),
    );
  }
}

