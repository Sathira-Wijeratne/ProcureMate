import React from "react";
import Button from "react-bootstrap/Button";

export default function PendingOrders() {
  return (
    <div style={{ margin: "20px" }}>
      <div className="row" style={{ height: "100%" }}>
        <div style={{ width: "1px" }}>
          <p style={{ color: "white" }}>Invisible</p>
        </div>
        <div
          className="col-4"
          style={{ backgroundColor: "#b9bdba", height: "100vh" }}
        >
          <div
            style={{
              backgroundColor: "#3a7ae0",
              color: "white",
              textAlign: "center",
              width: "100%",
            }}
          >
            Pending Orders
          </div>
          <a href="/admin/managerequests/view">
            <button
              type="button"
              class="btn btn-info btn-lg"
              style={{ width: "90%", height: "17%" }}
            >
              Manage Requests
            </button>
          </a>
          <br />
          <br />
          <a href="/admin/addserviceprovider">
            <button
              type="button"
              class="btn btn-success btn-lg"
              style={{ width: "90%", height: "17%" }}
            >
              Add Service Provider
            </button>
          </a>
          <br />
          <br />
          <a href="/admin/manageserviceproviders">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              style={{ width: "90%", height: "17%" }}
            >
              Manage Service Providers
            </button>
          </a>
          <br />
          <br />
          <a href="/admin/managetourists">
            <button
              type="button"
              class="btn btn-warning btn-lg"
              style={{ width: "90%", height: "17%" }}
            >
              Manage Tourists
            </button>
          </a>
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
