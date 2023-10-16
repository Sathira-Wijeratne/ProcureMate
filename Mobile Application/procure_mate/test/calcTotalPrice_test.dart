import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:procure_mate/models/site_manager.dart';
import 'package:procure_mate/screens/purchase_request_screen.dart';


void main() {
  final testWidth = 300.0; // Provide the desired width for testing
  final testHeight = 400.0; // Provide the desired height for testing

  final testUser = SiteManager(
    empId: '123',
    siteId: '456',
    location: 'Example Location',
    name: 'John Doe',
  );

  testWidgets('Test total calculation', (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: PurchaseRequestScreen(
          width: testWidth, // Provide dynamic width value
          height: testHeight, // Provide dynamic height value
          user: testUser, // Provide dynamic user object
        ),
      ),
    );

    // Step 1: Build the widget and pump it
    await tester.pumpWidget(MaterialApp(home: PurchaseRequestScreen(widget._width, widget._height, widget.user)));

    // Step 2: Find the necessary widgets by key
    final itemsDropdown = find.byKey(Key('items_dropdown')); // Replace with the actual key
    final suppliersDropdown = find.byKey(Key('suppliers_dropdown')); // Replace with the actual key
    final quantityField = find.byKey(Key('quantity_field')); // Replace with the actual key
    final totalField = find.byKey(Key('total_field')); // Replace with the actual key

    // Step 3: Simulate user interactions
    await tester.tap(itemsDropdown);
    await tester.pumpAndSettle(); // Allow the dropdown to open
    await tester.tap(find.text('Your Item')); // Replace with the actual item name
    await tester.tap(suppliersDropdown);
    await tester.pumpAndSettle(); // Allow the dropdown to open
    await tester.tap(find.text('Your Supplier')); // Replace with the actual supplier name

    // Enter a quantity
    await tester.enterText(quantityField, '5'); // Replace with the desired quantity

    // Step 4: Wait for calculations to update the total
    await tester.pumpAndSettle();

    // Step 5: Check if the total field displays the correct value
    expect(find.text('Total: \$250.00'), findsOneWidget); // Replace with the expected total value
  });
}
