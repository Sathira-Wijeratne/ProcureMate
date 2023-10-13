import 'dart:async';

import 'package:mongo_dart/mongo_dart.dart';
import 'package:procure_mate/models/purchase_order.dart';
import 'package:procure_mate/models/response.dart';

class DBService {
  static const String mongoConnUrl =
      "mongodb+srv://procureMate-db-admin:59RtgdWlrqMZRHhp@cluster0.iwgh5pm.mongodb.net/procureMate_DB?retryWrites=true&w=majority";
  static var db;
  static var staffMemberCollection;
  static var deliveryNoteCollection;
  static var purchaseOrderCollection;
  static var itemCollection;

  static connect() async {
    db = await Db.create(mongoConnUrl);
    await db.open();
    staffMemberCollection = db.collection("staffmembers");
    deliveryNoteCollection = db.collection("deliverynotes");
    purchaseOrderCollection = db.collection("purchaseorders");
    itemCollection = db.collection("items");
  }

  static Future<List<Map<String, dynamic>>> login(
      String email, String password) async {
    try {
      final query = {"email": email, "password": password};
      final users = await staffMemberCollection.find(query).toList();
      return users;
    } catch (e) {
      print(e);
      return Future.value(e as FutureOr<List<Map<String, dynamic>>>?);
    }
  }

  //fetch the delivery note
  static Future<List<Map<String, dynamic>>> getAllApprovalPendingDeliveryNotes(
      String siteMngId) async {
    try {
      final query = {"siteMngId": siteMngId};
      final deliveryNotes = await deliveryNoteCollection.find(query).toList();
      return deliveryNotes;
    } catch (e) {
      return Future.value(e as FutureOr<List<Map<String, dynamic>>>?);
    }
  }

  static Future<List<Map<String, dynamic>>> getAllPurchaseOrders() async {
    try {
      final purchaseOrders = await purchaseOrderCollection.find(where.sortBy('pOrderId', descending: true)).toList();
      return purchaseOrders;
    } catch (e) {
      print(e);
      return Future.value(e as FutureOr<List<Map<String, dynamic>>>?);
    }
  }

  static Future<List<Map<String, dynamic>>> getAllItems() async {
    try {
      final items = await itemCollection.find().toList();
      return items;
    } catch (e) {
      print(e);
      return Future.value(e as FutureOr<List<Map<String, dynamic>>>?);
    }
  }

  static Future<List<Map<String, dynamic>>> getItemPrices(
      String itemName) async {
    try {
      final items = await itemCollection.find(where.eq("itemName", itemName).sortBy("supplierId")).toList();
      return items;
    } catch (e) {
      return Future.value(e as FutureOr<List<Map<String, dynamic>>>?);
    }
  }

  static Future<Response> createPO(Map<String, dynamic> purchaseOrder) async {
    Response response = Response();
    await purchaseOrderCollection.insertOne(purchaseOrder).whenComplete((){
      response.code = 200;
      response.message = "Purchase Order Created!";
    }).catchError((e){
      response.code = 500;
      response.message = e;
    });

    return response;
  }
}
