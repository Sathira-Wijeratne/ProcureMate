import axios from "axios";

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

describe("Invoices with Pending status", () => {
  it("Positive Test case", async () => {
    const res = await axios.get(
      "http://localhost:8070/invoice/invoices/pending"
    );
    expect(res.status).toBe(200);
    expect(res.data[0].paymentStatus).toBe("Pending");
    expect(res.data.length).toBeGreaterThan(0);

    expect(res.status).not.toBe(404);
    expect(res.data[0].paymentStatus).not.toBe("Paid");
  });
});

// Test specific purchase Order details.
describe("Testing specific purchase order", () => {
  it("Negative test case", async () => {
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

    expect(res.data.purchaseOrder.qty).not.toBe(purchaseOrder.qty + 100);
    expect(res.data.purchaseOrder.uom).not.toBe(purchaseOrder.uom + "S");
    expect(res.data.purchaseOrder.unitPrice).not.toBe(purchaseOrder.unitPrice + 300);
  });
});

// Test specific delivery Note details.
describe("Testing specific unavailable delivery Note", () => {
  it("Negative test case", async () => {
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
    expect(res.data.deliveryNote.qty).not.toBe(deliveryNote.qty + 100);
    expect(res.data.deliveryNote.deliveryId).not.toBe(deliveryNote.deliveryId + "R");
    expect(res.data.deliveryNote.pOrderId).not.toBe(deliveryNote.pOrderId+"P");
  });
});
