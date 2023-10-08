import axios from "axios";

// Test creating delivery note
describe("Testing delivery note creation", () => {
  it("Should get a valid status", async () => {
    const deliveryNote = {
      deliveryId: "#D-TEST-TEMP",
      pOrderId: "#P-TEST-TEMP",
      supplierId: "S-TEST-TEMP",
      date: new Date(),
      status: "Sent",
      itemName: "TEST-ITEM-TEMP",
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
    expect(res2.data[0].qty).not.toBe(deliveryNote.siteMngId + "MNG");
    const res3 = await axios.delete(
      `http://localhost:8070/supplier/deletedeliverynote/${deliveryNote.deliveryId.substring(
        1
      )}`
    );
    expect(res3.status).toBe(200);
  });
});

// Testing existing delivery note
describe("Testing existing delivery note", () => {
  it("Should get a valid status", async () => {
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
    expect(res.data[0].qty).not.toBe(deliveryNote.qty + 1);
    expect(res.data[0].uom).not.toBe(deliveryNote.uom + "s");
    expect(res.data[0].qty).not.toBe(deliveryNote.siteMngId + "MNG");
  });
});

// Testing updating delivery note
