import axios from "axios";

// Test creating delivery note
describe("Testing creating delivery note", () => {
  it("Should get a valid status", async () => {
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
    const res1 = await axios.post(
      `http://localhost:8070/supplier/createdeliverynote/`,
      deliveryNote
    );
    expect(res1.status).toBe(200);

    const res3 = await axios.delete(
      `http://localhost:8070/supplier/deletedeliverynote/D-TEST`
    );
    expect(res3.status).toBe(200);
  });
});
