import 'package:flutter/material.dart';

import '../models/site_manager.dart';
import 'ViewDeliveryNoteInDetailScreen.dart';

class DeliveryNoteHistoryScreen extends StatefulWidget {
  const DeliveryNoteHistoryScreen(this._width, this._height, this.user, {super.key});

  final double _width;
  final double _height;
  final SiteManager user;


  @override
  State<DeliveryNoteHistoryScreen> createState() => _DeliveryNoteHistoryScreenState();
}

class _DeliveryNoteHistoryScreenState extends State<DeliveryNoteHistoryScreen> {
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
