import 'package:flutter/material.dart';

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              "assets/logo_test.png",
              scale: 3,
            ),
            Form(
                key: _formKey,
                child: Column(
                  children: [
                    TextFormField(
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(hintText: "Email / Username"),
                      validator: (text) {
                        return null;
                      },
                      onSaved: (text) {},
                      textInputAction: TextInputAction.next,
                    ),
                    TextFormField(
                      controller: _passwordController,
                      keyboardType: TextInputType.text,
                      obscureText: true,
                      decoration: InputDecoration(hintText: "Password"),
                      validator: (text) {
                        return null;
                      },
                      onSaved: (text) {},
                      textInputAction: TextInputAction.done,
                    ),
                    ElevatedButton(onPressed: (){}, child: Text("Login"))
                  ],
                ))
          ],
        ),
      ),
    );
  }
}
