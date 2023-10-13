import 'package:mongo_dart/mongo_dart.dart';

class PurchaseOrder{
  final ObjectId id;
  final String pOrderId;
  final String itemCode;
  final String itemName;
  final double unitPrice;
  final double qty;
  final String uom;
  final double amount;
  final String date;
  final String dueDate;
  final String supplierId;
  final String siteMngId;
  final String siteId;
  final String location;
  final String status;

  PurchaseOrder(
      this.id,
      this.pOrderId,
      this.itemCode,
      this.itemName,
      this.unitPrice,
      this.qty,
      this.uom,
      this.amount,
      this.date,
      this.dueDate,
      this.supplierId,
      this.siteMngId,
      this.siteId,
      this.location,
      this.status);
}