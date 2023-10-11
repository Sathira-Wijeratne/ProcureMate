import 'dart:async';

import 'package:mongo_dart/mongo_dart.dart';

class DBService {
  static const String mongoConnUrl =
      "mongodb+srv://procureMate-db-admin:59RtgdWlrqMZRHhp@cluster0.iwgh5pm.mongodb.net/procureMate_DB?retryWrites=true&w=majority";
  static var db;
  static var staffMemberCollection;
  static var deliveryNoteCollection;

  static connect() async {
    db = await Db.create(mongoConnUrl);
    await db.open();
    staffMemberCollection = db.collection("staffmembers");
    deliveryNoteCollection = db.collection("deliverynotes");
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
static Future <List<Map<String, dynamic>>> getAllApprovalPendingDeliveryNotes(String siteMngId

    )
  async{
    try{
      final query = {"siteMngId": siteMngId};
      final deliveryNotes = await deliveryNoteCollection.find(query).toList();
      return deliveryNotes;
    }catch(e){
      return Future.value(e as FutureOr<List<Map<String, dynamic>>>?);
    }
  }
}
