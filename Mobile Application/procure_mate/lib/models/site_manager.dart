import 'package:mongo_dart/mongo_dart.dart';

class SiteManager{
  final ObjectId id;
  final String empId;
  final String name;
  final String phoneNumber;
  final String email;
  final String password;
  final String userRole;
  final String siteId;
  final String location;

  SiteManager(this.id, this.empId, this.name, this.phoneNumber, this.email,
      this.password, this.userRole, this.siteId, this.location);
}