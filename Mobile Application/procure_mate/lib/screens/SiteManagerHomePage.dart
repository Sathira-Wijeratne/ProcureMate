import 'package:flutter/material.dart';
import 'package:procure_mate/screens/PurchaseRequestScreen.dart';

class SiteManagerHomePage extends StatefulWidget {
  const SiteManagerHomePage(this._width, this._height, {super.key});

  final double _width;
  final double _height;

  @override
  State<SiteManagerHomePage> createState() => _SiteManagerHomePageState();
}

class _SiteManagerHomePageState extends State<SiteManagerHomePage> {
  @override
  Widget build(BuildContext context)=> Scaffold(
    body: Center(
      child: ListView(
        padding: EdgeInsets.all(32),
          children:[
            leftNavBar()
          ]
      ),
    ),
  );

  Widget leftNavBar () =>Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            accountName: Text('Head of department'),
            accountEmail: Text('Approver@gmail.com'),
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
              image: new DecorationImage(
                image:new AssetImage('assets/useravatarimage.jpg'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          ListTile(
            leading: Icon(Icons.home),
            title: Text("Purchase Request"),
            onTap: (){
              // Navigate to the my claims page when the item is tapped
              Navigator.of(context).pop(); // Close the drawer
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(
                  builder: (context) => PurchaseRequestScreen(MediaQuery.of(context).size.width, MediaQuery.of(context).size.height),
                ),
              );
            },
            trailing: ClipOval(
              child: Container(
                color: Colors.red,
                width: 20,
                height: 20,
                child: Center(
                  child: Text('8',style: TextStyle(color: Colors.grey,fontSize: 12,),),
                ),
              ),
            ),
          ),
          Divider(),
          ListTile(
              leading: Icon(Icons.analytics_outlined),
              title: Text("View Reports"),
              onTap: null
          ),
          Divider(),
          ListTile(
              leading: Icon(Icons.monetization_on),
              title: Text("My Claims"),
              onTap: null
          ),
          Divider(),
        ],
      ));
}
