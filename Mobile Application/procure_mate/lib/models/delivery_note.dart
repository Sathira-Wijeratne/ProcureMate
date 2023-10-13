import 'package:mongo_dart/mongo_dart.dart';

class DeliveryNote {
  final ObjectId id;
  final String deliveryId;
  final String pOrderId;
  final String supplierId;
  final String date;
  final String status;
  final String itemCode;
  final String itemName;
  final double unitPrice;
  final double qty;
  final String uom;
  final String siteMngId;
  final String siteId;
  final String location;

  DeliveryNote(
      this.id,
      this.deliveryId,
      this.pOrderId,
      this.supplierId,
      this.date,
      this.status,
      this.itemCode,
      this.itemName,
      this.unitPrice,
      this.qty,
      this.uom,
      this.siteMngId,
      this.siteId,
      this.location);
}
