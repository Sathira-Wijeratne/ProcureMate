import 'package:flutter/material.dart';

class TestScreen extends StatelessWidget {
  const TestScreen(this._width, this._height, {super.key});

  final double _width;
  final double _height;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("test")),
      body: Center(child: Text("hello world"),),
    );
  }
}
