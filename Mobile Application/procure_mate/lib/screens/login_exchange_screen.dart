import 'dart:io';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:procure_mate/models/site_manager.dart';
import 'package:procure_mate/screens/login_screen.dart';
import 'package:procure_mate/screens/site_manager_home_screen.dart';

class LoginExchangeScreen extends StatefulWidget {
  const LoginExchangeScreen(this._width, this._height, {super.key});

  final double _width;
  final double _height;

  @override
  State<LoginExchangeScreen> createState() => _LoginExchangeScreenState();
}

class _LoginExchangeScreenState extends State<LoginExchangeScreen> {
  Future<void> _checkLoginStatus() async {
    final directory = await getApplicationDocumentsDirectory();
    final path = directory.path;
    File file = File('$path/userdata.txt');
    try {
      final userData = await file.readAsString();
      if (userData != '') {
        Map decodedUser = jsonDecode(userData);
        SiteManager user = SiteManager(
            decodedUser["empId"],
            decodedUser["name"],
            decodedUser["phoneNumber"],
            decodedUser["email"],
            decodedUser["password"],
            decodedUser["userRole"],
            decodedUser["siteID"],
            decodedUser["location"]);

        Navigator.of(context).pushReplacement(MaterialPageRoute(
            builder: (BuildContext context) =>
                SiteManagerHomePage(widget._width, widget._height, user)));
      } else {
        Navigator.of(context).pushReplacement(MaterialPageRoute(
            builder: (BuildContext context) =>
                LoginScreen(widget._width, widget._height)));
      }
    } catch (e) {
      Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (BuildContext context) =>
              LoginScreen(widget._width, widget._height)));
    }
  }

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold();
  }
}
