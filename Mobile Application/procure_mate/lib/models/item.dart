import 'package:mongo_dart/mongo_dart.dart';

class Item {
  final ObjectId id;
  final String itemCode;
  final String itemName;
  final String supplierId;
  final double unitPrice;
  final String uom;

  Item(this.id, this.itemCode, this.itemName, this.supplierId, this.unitPrice,
      this.uom);
}
