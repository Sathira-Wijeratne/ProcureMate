import 'dart:io';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:procure_mate/models/site_manager.dart';
import 'package:procure_mate/screens/view_delivery_notes_screen.dart';
import 'package:procure_mate/screens/purchase_request_screen.dart';

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
List<String> options = ['Approval Pending','Supplier Pending','Rejected'];
class _SiteManagerHomePageState extends State<SiteManagerHomePage> {

  String currentOption = options[0];


  @override
  Widget build(BuildContext context) => Scaffold(
      drawer: leftNavBar(),
      appBar: AppBar(
        title: Align(alignment: Alignment.bottomRight, child : Text('Welcome to Procumate')),
      ),
      body:Column(children:[Text( "Purchase Order History"),radioButtonGroup()]),

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
              onTap: (){
                Navigator.of(context).pop(); // Close the drawer
                Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => ViewDeliveryNotesScreen(
                          widget._width, widget._height, widget.user)
                    ),
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
          onTap: (){
                    Navigator.of(context).pop(); // Close the drawer
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => DeliveryNoteHistoryScreen(
                        widget._width, widget._height, widget.user)
                      ),
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
                  builder: (BuildContext context) => LoginScreen(widget._width, widget._height),
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
          title: Text('Approval Pending'),
          leading: Radio(
            value : options[0],
            groupValue: currentOption,
            onChanged: (value){
              setState(() {
                currentOption = value.toString();
              });
            },
          ),
        ),
        ListTile(
          title: Text('Supplier Pending'),
          leading: Radio(
            value : options[1],
            groupValue: currentOption,
            onChanged: (value){
              setState(() {
                currentOption = value.toString();
              });
            },
          ),
        ),
        ListTile(
          title: Text('Rejected'),
          leading: Radio(
            value : options[2],
            groupValue: currentOption,
            onChanged: (value){
              setState(() {
                currentOption = value.toString();
              });
            },
          ),
        )
      ],
    );
  }

}
