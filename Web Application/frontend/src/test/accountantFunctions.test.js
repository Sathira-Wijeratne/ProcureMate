import axios from "axios";

// // Testing invoice with Pending Payment status
// describe("Testing invoice with Pending Payment status", () => {
//   it("Positive test case", async () => {
//     // existing invoice
//     const invoice = {
//       invoiceId: "#IN-TEST",
//       deliveryId: "#D-TEST",
//       pOrderId: "#P-TEST",
//       supplierId: "S-TEST",
//       itemName: "TEST-ITEM",
//       qty: 20,
//       uom: "",
//       unitPrice: 10000,
//       cost: 200000,
//       date: new Date(),
//       paymentStatus: "Pending",
//     };

//     const res = await axios.get(
//       `http://localhost:8070/invoice/invoices/pending/${invoice.pOrderId.substring(
//         1
//       )}`
//     );
//     expect(res.data[0].invoiceId).toBe(invoice.invoiceId);
//     expect(res.data[0].deliveryId).toBe(invoice.deliveryId);
//     expect(res.data[0].pOrderId).toBe(invoice.pOrderId);
//   });
// });

//Updating Payment status
// describe("Testing invoice by updating the Pending Payment status", () => {
//     it("Positive test case", async () => {
//       // existing invoice
//           const invoice = {
//       invoiceId: "#IN-TEST-TEMP",
//       deliveryId: "#D-TEST-TEMP",
//       pOrderId: "#P-TEST-TEMP",
//       supplierId: "S-TEST-TEMP",
//       itemCode: "#IT-TEST-TEMP",
//       itemName: "TEST-ITEM-TEMP",
//       qty: 20,
//       uom: "",
//       unitPrice: 10000,
//       cost: 200000,
//       date: new Date(),
//       paymentStatus: "Paid",
//     };

//       const res = await axios.put(
//         `http://localhost:8070/invoice/invoices/pending/${invoice.pOrderId.substring(
//             1
//           )}`
//       );
//       expect(res.data[0].invoiceId).toBe(invoice.invoiceId);
//       expect(res.data[0].deliveryId).toBe(invoice.deliveryId);
//       expect(res.data[0].pOrderId).toBe(invoice.pOrderId);
//     });
//   });

// Test specific purchase Order details.
describe("Testing specific purchase order", () => {
  it("Positive test case", async () => {
    // existing invoice
    const purchaseOrder = {
      pOrderId: "#P-0001",
      itemName: "Cement",
      qty: 100,
      date: "2023-10-04",
      dueDate: "2023-10-07",
      supplierId: "S001",
      status: "Completed",
      amount: 4250,
      uom: "kg",
      location: "Malabe",
      siteId: "#S-0001",
      siteMngId: "E003",
      itemCode: "#IT-001",
      unitPrice: 42.5,
    };

    const res = await axios.get(
      `http://localhost:8070/purchaseOrderPayment/purchaseOrder/getPurchaseOrder/${purchaseOrder.pOrderId.substring(
        1
      )}`
    );
    expect(res.data.purchaseOrder.invoiceId).toBe(purchaseOrder.invoiceId);
    expect(res.data.purchaseOrder.deliveryId).toBe(purchaseOrder.deliveryId);
    expect(res.data.purchaseOrder.pOrderId).toBe(purchaseOrder.pOrderId);
  });
});

// Test specific delivery Note details.
describe("Testing specific delivery Note", () => {
  it("Positive test case", async () => {
    // existing deliveryNote
    const deliveryNote = {
      deliveryId: "#D-TEST",
      pOrderId: "#P-TEST",
      supplierId: "S-TEST",
      date: new Date(),
      status: "Sent",
      itemName: "TEST-ITEM",
      qty: 10,
      uom: "kg",
      siteMngId: "E-TEST",
      siteId: "#S-TEST",
      location: "TEST-LOCATION",
    };

    const res = await axios.get(
      `http://localhost:8070/deliveryOrderPayment/deliveryNote/getDeliveryNote/${deliveryNote.deliveryId.substring(
        1
      )}`
    );

    expect(res.data.deliveryNote.deliveryId).toBe(deliveryNote.deliveryId);
    expect(res.data.deliveryNote.pOrderId).toBe(deliveryNote.pOrderId);
  });
});
