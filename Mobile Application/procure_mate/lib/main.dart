import 'package:flutter/material.dart';
import 'package:procure_mate/screens/PurchaseRequestScreen.dart';
import 'package:procure_mate/screens/SiteManagerHomePage.dart';
import 'package:procure_mate/screens/login_screen.dart';
import 'package:procure_mate/screens/test_screen.dart';

void main(){
  runApp(ProcureMate());
}

class ProcureMate extends StatelessWidget {
  ProcureMate({super.key});

  late double _width;
  late double _height;

  @override
  Widget build(BuildContext context) {
    _width = MediaQuery.of(context).size.width;
    _height = MediaQuery.of(context).size.height;
    return MaterialApp(home: LoginScreen(_width, _height),);
  }
}
