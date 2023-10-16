import 'package:flutter_test/flutter_test.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:procure_mate/models/delivery_note.dart';
import 'package:procure_mate/models/purchase_order.dart';
import 'package:procure_mate/models/site_manager.dart';

void main() {
  group('site_manager', () {
    test('toJson', () {
      final model = SiteManager('E001', 'Saman', '0714253659',
          'saman@gmail.com', 'pw', 'Site Manager', 'S001', 'Kadawatha');

      final json = {
        "empId": model.empId,
        "name": model.name,
        "phoneNumber": model.phoneNumber,
        "email": model.email,
        "password": model.password,
        "userRole": model.userRole,
        "siteId": model.siteId,
        "location": model.location
      };

      expect(json, isA<Map<String, dynamic>>());
      expect(json["empId"], equals("E001"));
      expect(json["name"], equals("Saman"));
      expect(json["phoneNumber"], equals("0714253659"));
      expect(json["email"], equals("saman@gmail.com"));
      expect(json["password"], equals("pw"));
      expect(json["userRole"], equals("Site Manager"));
      expect(json["siteId"], equals("S001"));
      expect(json["location"], equals("Kadawatha"));
    });
  });

  group('purchase_order', () {
    test('toJson', () {
      final objectId = ObjectId();
      final model = PurchaseOrder(
          objectId,
          'P001',
          'I001',
          'Cement',
          150,
          30,
          'kg',
          3000.00,
          '2023/10/12',
          '2023/10/16',
          'S001',
          'SM001',
          'SI003',
          'Kaluthara',
          'Pending',
          'new');

      final json = {
        "_id": model.id,
        "pOrderId": model.pOrderId,
        "itemCode": model.itemCode,
        "itemName": model.itemName,
        "unitPrice": model.unitPrice,
        "qty": model.qty,
        "uom": model.uom,
        "amount": model.amount,
        "date": model.date,
        "dueDate": model.dueDate,
        "supplierId": model.supplierId,
        "siteMngId": model.siteMngId,
        "siteId": model.siteId,
        "location": model.location,
        "status": model.status,
        "rejectReason": model.rejectReason,
      };

      expect(json, isA<Map<String, dynamic>>());
      expect(json["_id"], equals(objectId));
      expect(json["pOrderId"], equals("P001"));
      expect(json["itemCode"], equals("I001"));
      expect(json["itemName"], equals("Cement"));
      expect(json["unitPrice"], equals(150));
      expect(json["qty"], equals(30));
      expect(json["uom"], equals("kg"));
      expect(json["amount"], equals(3000.00));
      expect(json["date"], equals("2023/10/12"));
      expect(json["dueDate"], equals("2023/10/16"));
      expect(json["supplierId"], equals("S001"));
      expect(json["siteMngId"], equals("SM001"));
      expect(json["siteId"], equals("SI003"));
      expect(json["location"], equals("Kaluthara"));
      expect(json["status"], equals("Pending"));
      expect(json["rejectReason"], equals("new"));
    });
  });

  group('delivery_note', () {
    final objectId1 = ObjectId();
    test('toJson', () {
      final model1 = DeliveryNote(
          objectId1,
          "D001",
          "P001",
          "S001",
          "2023/10/12",
          "Confirmed",
          "I001",
          "Cement",
          150,
          30,
          "kg",
          "S001",
          "SM001",
          'Kaluthara');

      final json = {
        "_id": model1.id,
        "deliveryId": model1.deliveryId,
        "pOrderId": model1.pOrderId,
        "supplierId": model1.supplierId,
        "date": model1.date,
        "status": model1.status,
        "itemCode": model1.itemCode,
        "itemName": model1.itemName,
        "unitPrice": model1.unitPrice,
        "qty": model1.qty,
        "uom": model1.uom,
        "siteMngId": model1.siteMngId,
        "siteId": model1.siteId,
        "location": model1.location,
      };

      expect(json, isA<Map<String, dynamic>>());
      expect(json["_id"], equals(objectId1));
      expect(json["deliveryId"], equals("D001"));
      expect(json["pOrderId"], equals("P001"));
      expect(json["supplierId"], equals("S001"));
      expect(json["date"], equals('2023/10/12'));
      expect(json["status"], equals('Confirmed'));
      expect(json["itemCode"], equals("I001"));
      expect(json["itemName"], equals('Cement'));
      expect(json["unitPrice"], equals(150));
      expect(json["qty"], equals(30));
      expect(json["uom"], equals("kg"));
      expect(json["siteMngId"], equals("S001"));
      expect(json["siteId"], equals("SM001"));
      expect(json["location"], equals("Kaluthara"));
    });
  });
}
