import axios from "axios";

describe("GET /", () => {
    it("should get all pending purchase orders", async () => {
        const res = await axios.get(`http://localhost:8070/procurement/`);
        expect(res.status).toBe(200);
        expect(res.data[0].status).toBe("Pending");
        expect(res.data.length).toBeGreaterThan(0);
        expect(res.data[0].rejectReason).toBe("");

        expect(res.status).not.toBe(404);
        expect(res.data[0].status).not.toBe("Approved");
        expect(res.data[0].status).not.toBe("Rejected");
    });
});

describe("GET /approved", () => {
    it("should get all approved purchase orders", async () => {
        const res = await axios.get("http://localhost:8070/procurement/approved");
        expect(res.status).toBe(200);
        expect(res.data[0].status).toBe("Approved");
        expect(res.data.length).toBeGreaterThan(0);
        expect(res.data[0].rejectReason).toBe("");

        expect(res.status).not.toBe(404);
        expect(res.data[0].status).not.toBe("Pending");
        expect(res.data[0].status).not.toBe("Rejected");
    });
});

describe("GET /rejected", () => {
    it("should get all rejected purchase orders", async () => {
        const res = await axios.get("http://localhost:8070/procurement/rejected");
        expect(res.status).toBe(200);
        expect(res.data.length).toBeGreaterThan(0);
        expect(res.data[0].status).toBe("Rejected");

        expect(res.status).not.toBe(404);
        expect(res.data[0].status).not.toBe("Pending");
        expect(res.data[0].status).not.toBe("Approved");
        expect(res.data[0].rejectReason).not.toBe("");
    });
});

describe("GET /direct", () => {
    it("should get all direct placed purchase orders", async () => {
        const res = await axios.get("http://localhost:8070/procurement/direct");
        expect(res.status).toBe(200);
        expect(res.data.length).toBeGreaterThan(0);
        expect(["Approved", "Completed"]).toContain(res.data[0].status);
        expect(res.data[0].amount).toBeLessThan(100000);

        expect(res.status).not.toBe(404);
        expect(res.data[0].status).not.toBe("Pending");
        expect(res.data[0].status).not.toBe("Rejected");
        expect(res.data[0].rejectReason).not.toBe("");
    });
});

describe("GET /get/:id", () => {
    it("should get a specific pending purchase order", async () => {
        const res = await axios.get(`http://localhost:8070/procurement/get/P-0006`);
        expect(res.status).toBe(200);
        expect(res.data.pOrderId).toBe('#P-0006');
        expect(res.data.status).toBe("Pending");
        expect(res.data.rejectReason).toBe("");

        expect(res.status).not.toBe(404);
        expect(res.data.status).not.toBe("Approved");
        expect(res.data.status).not.toBe("Rejected");
        expect(res.data.status).not.toBe("Completed");
    });
});

describe("GET /get/staff/member/name/:id", () => {
    it("should get the name of a staff member by email", async () => {
        const res = await axios.get(`http://localhost:8070/procurement/get/staff/member/name/staff1@procuremate.lk`);
        expect(res.status).toBe(200);
        expect(res.data.name).toBe("Saman Perera");
        expect(Object.keys(res.data)).toEqual(['name']);

        expect(res.status).not.toBe(404);
        expect(res.data.name).not.toBe("Naveen Silva");
        expect(Object.keys(res.data)).not.toEqual(['empId']);
    });
});

describe("GET /get/staff/member/name/empId/:id", () => {
    it("should get the name of a staff member by empId", async () => {
        const res = await axios.get(`http://localhost:8070/procurement/get/staff/member/name/empId/E001`);
        expect(res.status).toBe(200);
        expect(res.data.name).toBe("Saman Perera");
        expect(Object.keys(res.data)).toEqual(['name']);

        expect(res.status).not.toBe(404);
        expect(res.data.name).not.toBe("Naveen Silva");
        expect(Object.keys(res.data)).not.toEqual(['empId']);
    });
});