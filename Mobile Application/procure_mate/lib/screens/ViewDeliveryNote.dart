import 'package:flutter/material.dart';

import '../models/site_manager.dart';

class ViewDeliveryNote extends StatefulWidget {
  const ViewDeliveryNote(this._width,this._height,this.user,{super.key});
  final double _width;
  final double _height;
  final SiteManager user;

  @override
  State<ViewDeliveryNote> createState() => _ViewDeliveryNoteState();
}

class _ViewDeliveryNoteState extends State<ViewDeliveryNote> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
