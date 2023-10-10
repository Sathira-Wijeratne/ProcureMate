import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:procure_mate/models/site_manager.dart';
import 'package:procure_mate/screens/PurchaseRequestScreen.dart';
import 'package:procure_mate/screens/SiteManagerHomePage.dart';

import '../services/db_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen(this._width, this._height, {super.key});

  final double _width;
  final double _height;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  String? _validateEmail(String text) {
    if (text == "") {
      return "Email / Username is required!";
    } else if (!text.contains("@")) {
      return "Invalid email / username";
    }
    return null;
  }

  String? _validatePassword(String text) {
    if (text == "") {
      return "Password is required!";
    }
    return null;
  }

  Future<void> _validateLogin(BuildContext context) async {
    var siteManager =
        await DBService.login(_emailController.text, _passwordController.text);
    if (siteManager.isEmpty) {
      Fluttertoast.showToast(
          msg: "Invalid Credentials!",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0);
    } else {
      SiteManager user = SiteManager(
          siteManager[0]["_id"],
          siteManager[0]["empId"],
          siteManager[0]["name"],
          siteManager[0]["phoneNumber"],
          siteManager[0]["email"],
          siteManager[0]["password"],
          siteManager[0]["userRole"],
          siteManager[0]["siteID"],
          siteManager[0]["location"]);
      Navigator.of(context).push(MaterialPageRoute(
          builder: (BuildContext context) =>
              SiteManagerHomePage(widget._width, widget._height, user)));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: EdgeInsets.only(
                  bottom: widget._height / 26.76363636363636,
                  left: widget._width / 6.545454545454545,
                  right: widget._width / 6.545454545454545),
              child: Image.asset(
                "assets/logo_test.png",
                // scale: 3,
              ),
            ),
            Form(
                key: _formKey,
                child: Padding(
                  padding: EdgeInsets.symmetric(
                      horizontal: widget._width / 7.854545454545454),
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration:
                            const InputDecoration(hintText: "Email / Username"),
                        validator: (text) {
                          return _validateEmail(text!);
                        },
                        onSaved: (text) {},
                        textInputAction: TextInputAction.next,
                      ),
                      TextFormField(
                        controller: _passwordController,
                        keyboardType: TextInputType.text,
                        obscureText: true,
                        decoration: const InputDecoration(hintText: "Password"),
                        validator: (text) {
                          return _validatePassword(text!);
                        },
                        onSaved: (text) {},
                        textInputAction: TextInputAction.done,
                      ),
                      Padding(
                        padding: EdgeInsets.only(
                            top: widget._height / 26.76363636363636),
                        child: ElevatedButton(
                          onPressed: () {
                            if (_formKey.currentState!.validate()) {
                              _formKey.currentState?.save();
                              _validateLogin(context);
                            }
                          },
                          child: const Text("Login"),
                        ),
                      )
                    ],
                  ),
                ))
          ],
        ),
      ),
    );
  }
}
