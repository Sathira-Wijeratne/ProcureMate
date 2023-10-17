import axios from "axios";

// Test creating delivery note
describe("Testing delivery note creation", () => {
  it("Create, check and delete", async () => {
    const deliveryNote = {
      deliveryId: "#D-TEST-TEMP",
      pOrderId: "#P-TEST-TEMP",
      supplierId: "S-TEST-TEMP",
      date: new Date(),
      status: "Sent",
      itemCode: "#IT-TEST-TEMP",
      itemName: "TEST-ITEM-TEMP",
      unitPrice: 12,
      qty: 10,
      uom: "kg",
      siteMngId: "E-TEST-TEMP",
      siteId: "#S-TEST-TEMP",
      location: "TEST-LOCATION-TEMP",
    };
    const res1 = await axios.post(
      `http://localhost:8070/supplier/createdeliverynote/`,
      deliveryNote
    );
    expect(res1.status).toBe(200);

    const res2 = await axios.get(
      `http://localhost:8070/supplier/getdeliverynote/${deliveryNote.deliveryId.substring(
        1
      )}`
    );
    expect(res2.data[0].deliveryId).toBe(deliveryNote.deliveryId);
    expect(res2.data[0].pOrderId).toBe(deliveryNote.pOrderId);
    expect(res2.data[0].itemName).toBe(deliveryNote.itemName);
    expect(res2.data[0].qty).not.toBe(deliveryNote.qty + 1);
    expect(res2.data[0].uom).not.toBe(deliveryNote.uom + "s");
    expect(res2.data[0].siteMngId).not.toBe(deliveryNote.siteMngId + "MNG");
    const res3 = await axios.delete(
      `http://localhost:8070/supplier/deletedeliverynote/${deliveryNote.deliveryId.substring(
        1
      )}`
    );
    expect(res3.status).toBe(200);
  });
});

// Testing existing delivery note - Positive
describe("Testing existing delivery note", () => {
  it("Positive test case", async () => {
    // existing delivery note
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
      `http://localhost:8070/supplier/getdeliverynote/${deliveryNote.deliveryId.substring(
        1
      )}`
    );
    expect(res.data[0].deliveryId).toBe(deliveryNote.deliveryId);
    expect(res.data[0].pOrderId).toBe(deliveryNote.pOrderId);
    expect(res.data[0].itemName).toBe(deliveryNote.itemName);
  });
});

// Testing existing delivery note - Negative
describe("Testing existing delivery note", () => {
  it("Negative Test Case", async () => {
    // existing delivery note
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
      `http://localhost:8070/supplier/getdeliverynote/${deliveryNote.deliveryId.substring(
        1
      )}`
    );

    expect(res.data[0].qty).not.toBe(deliveryNote.qty + 1);
    expect(res.data[0].uom).not.toBe(deliveryNote.uom + "s");
    expect(res.data[0].siteMngId).not.toBe(deliveryNote.siteMngId + "MNG");
  });
});

// Test creating invoice
describe("Testing invoice creation", () => {
  it("Create, check and delete", async () => {
    const invoice = {
      invoiceId: "#IN-TEST-TEMP",
      deliveryId: "#D-TEST-TEMP",
      pOrderId: "#P-TEST-TEMP",
      supplierId: "S-TEST-TEMP",
      itemCode: "#IT-TEST-TEMP",
      itemName: "TEST-ITEM-TEMP",
      qty: 20,
      uom: "",
      unitPrice: 10000,
      cost: 200000,
      date: new Date(),
      paymentStatus: "Pending",
    };
    const res1 = await axios.post(
      `http://localhost:8070/supplier/createinvoice/`,
      invoice
    );
    expect(res1.status).toBe(200);

    const res2 = await axios.get(
      `http://localhost:8070/supplier/getinvoice/${invoice.invoiceId.substring(
        1
      )}`
    );
    expect(res2.data[0].invoiceId).toBe(invoice.invoiceId);
    expect(res2.data[0].deliveryId).toBe(invoice.deliveryId);
    expect(res2.data[0].pOrderId).toBe(invoice.pOrderId);
    expect(res2.data[0].qty).not.toBe(invoice.qty + 1);
    expect(res2.data[0].uom).not.toBe(invoice.uom + "s");
    expect(res2.data[0].paymentStatus).not.toBe("Paid");
    const res3 = await axios.delete(
      `http://localhost:8070/supplier/deleteinvoice/${invoice.invoiceId.substring(
        1
      )}`
    );
    expect(res3.status).toBe(200);
  });
});

// Testing existing invoice - Positive
describe("Testing existing invoice", () => {
  it("Positive test case", async () => {
    // existing invoice
    const invoice = {
      invoiceId: "#IN-TEST",
      deliveryId: "#D-TEST",
      pOrderId: "#P-TEST",
      supplierId: "S-TEST",
      itemName: "TEST-ITEM",
      qty: 20,
      uom: "",
      unitPrice: 10000,
      cost: 200000,
      date: new Date(),
      paymentStatus: "TEST_STATUS",
    };

    const res = await axios.get(
      `http://localhost:8070/supplier/getinvoice/${invoice.invoiceId.substring(
        1
      )}`
    );
    expect(res.data[0].invoiceId).toBe(invoice.invoiceId);
    expect(res.data[0].deliveryId).toBe(invoice.deliveryId);
    expect(res.data[0].pOrderId).toBe(invoice.pOrderId);
  });
});

// Testing existing invoice - Negative
describe("Testing existing invoice", () => {
  it("Negative test case", async () => {
    // existing invoice
    const invoice = {
      invoiceId: "#IN-TEST",
      deliveryId: "#D-TEST",
      pOrderId: "#P-TEST",
      supplierId: "S-TEST",
      itemName: "TEST-ITEM",
      qty: 20,
      uom: "",
      unitPrice: 10000,
      cost: 200000,
      date: new Date(),
      paymentStatus: "TEST_STATUS",
    };

    const res = await axios.get(
      `http://localhost:8070/supplier/getinvoice/${invoice.invoiceId.substring(
        1
      )}`
    );
    expect(res.data[0].qty).not.toBe(invoice.qty + 100);
    expect(res.data[0].uom).not.toBe(invoice.uom + "S");
    expect(res.data[0].cost).not.toBe(invoice.qty * invoice.unitPrice + 1000);
  });
});
