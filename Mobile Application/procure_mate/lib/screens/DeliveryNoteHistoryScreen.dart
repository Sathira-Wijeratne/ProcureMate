import 'package:flutter/material.dart';

import '../models/site_manager.dart';

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
    return const Placeholder();
  }
}
