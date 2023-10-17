import 'package:flutter/material.dart';
import 'package:procure_mate/screens/purchase_request_screen.dart';
import 'package:procure_mate/screens/site_manager_home_screen.dart';
import 'package:procure_mate/screens/login_screen.dart';
import 'package:procure_mate/screens/login_exchange_screen.dart';
import 'package:procure_mate/services/db_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await DBService.connect();
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
    return MaterialApp(home: LoginExchangeScreen(_width, _height),);
  }
}
