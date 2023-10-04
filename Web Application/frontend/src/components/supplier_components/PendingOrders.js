import React from "react";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";

export default function PendingOrders() {
  return (
    <div style={{ margin: "20px" }}>
      <div className="row" style={{ height: "100%" }}>
        <div style={{ width: "1px" }}>
          <p style={{ color: "white" }}>Invisible</p>
        </div>
        <div
          className="col-3"
          style={{ backgroundColor: "#b9bdba", height: "100vh" }}
        >
          <div
            style={{
              backgroundColor: "#3a7ae0",
              color: "white",
              textAlign: "center",
              width: "100%",
              height: "8%",
              lineHeight: "250%",
              verticalAlign: "middle",
              fontSize: "150%",
            }}
          >
            <b>Pending Orders</b>
          </div>
          <div style={{ textAlign: "center", marginTop: "3%" }}>
            <b>Kamal Perera</b>
            <br />
            Supplier
          </div>
          <div style={{ marginTop: "8%", fontSize: "150%", marginLeft: "10%" }}>
            <a
              href="/supplierhome/pendingorders"
              style={{ textDecoration: "none" }}
            >
              <BsFillStarFill
                style={{ marginBottom: "2%", marginRight: "5%" }}
              />
              <b style={{ color: "#3a7ae0" }}>Pending Orders</b>
            </a>
            <br />
            <a href="/supplierhome/invoices" style={{ textDecoration: "none" }}>
              <BsMenuButtonWideFill
                style={{ marginBottom: "1%", marginRight: "5%" }}
              />
              <b style={{ color: "black" }}>Invoices</b>
            </a>
            <br />
            <a
              href="/supplierhome/deliverylog"
              style={{ textDecoration: "none" }}
            >
              <BsMenuButtonWideFill
                style={{ marginBottom: "1%", marginRight: "5%" }}
              />
              <b style={{ color: "black" }}>My Delovery Log</b>
            </a>
            <br />
          </div>
        </div>
        <div className="col">
          <a
            href="/"
            style={{ float: "right" }}
            onClick={() => {
              sessionStorage.removeItem("sTravPlaNimda");
            }}
          >
            <Button variant="danger">Signout</Button>{" "}
          </a>
          {/* Add a Service Provider */}
          Hello
        </div>
        <div style={{ width: "1px" }}>
          <p style={{ color: "white" }}>Invisible</p>
        </div>
      </div>
    </div>
  );
}
