import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
import axios from "axios";

export default function MyDeliveryLog() {
  if (sessionStorage.getItem("prMateReilppus") === null) {
    window.location.replace("/");
  }

  const supplierId = sessionStorage.getItem("supplierId");
  const supplierName = sessionStorage.getItem("supplierName");
  const dateFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const [deliveryNotes, setDeliveryNotes] = useState([]);

  const [currTime, setCurrTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);

    axios
      .get(`http://localhost:8070/supplier/getdeliverynotes/${supplierId}`)
      .then((res) => {
        console.log(res.data);
        setDeliveryNotes(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [supplierId]);
  return (
    <div>
      <div className="row" style={{ height: "100%" }}>
        {/* <div style={{ width: "1px" }}>
          <p style={{ color: "white" }}>Invisible</p>
        </div> */}
        <div
          className="col-3"
          style={{ backgroundColor: "#b9bdba", height: "100vh" }}
        >
          <div
            style={{
              backgroundColor: "#3a7ae0",
              color: "white",
              textAlign: "center",
              width: "104%",
              height: "8%",
              lineHeight: "250%",
              verticalAlign: "middle",
              fontSize: "150%",
              marginTop: "5%",
            }}
          >
            <b>My Delivery Log</b>
          </div>
          <div style={{ textAlign: "center", marginTop: "3%" }}>
            <b>{supplierName}</b>
            <br />
            Supplier
          </div>
          <div style={{ marginTop: "8%", fontSize: "150%", marginLeft: "10%" }}>
            <a
              href="/supplierhome/pendingorders"
              style={{ textDecoration: "none" }}
            >
              <BsMenuButtonWideFill
                style={{
                  marginBottom: "1%",
                  marginRight: "5%",
                  color: "black",
                }}
              />
              <b style={{ color: "black" }}>Pending Orders</b>
            </a>
            <br />
            <br />
            <a href="/supplierhome/invoices" style={{ textDecoration: "none" }}>
              <BsMenuButtonWideFill
                style={{
                  marginBottom: "1%",
                  marginRight: "5%",
                  color: "black",
                }}
              />
              <b style={{ color: "black" }}>Invoices</b>
            </a>
            <br />
            <br />
            <a
              href="/supplierhome/mydeliverylog"
              style={{ textDecoration: "none" }}
            >
              <BsFillStarFill
                style={{ marginBottom: "2%", marginRight: "5%" }}
              />
              <b style={{ color: "#3a7ae0" }}>My Delivery Log</b>
            </a>
            <br />
          </div>
        </div>
        <div className="col" style={{ marginTop: "2%" }}>
          <a
            href="/"
            style={{ float: "right" }}
            onClick={() => {
              sessionStorage.removeItem("prMateReilppus");
              sessionStorage.removeItem("supplierEmail");
              sessionStorage.removeItem("supplierId");
              sessionStorage.removeItem("supplierName");
            }}
          >
            <Button variant="btn btn-light">
              <b>Log Out</b>
            </Button>
          </a>
          <b style={{ marginLeft: "10%" }}>{currTime.toLocaleTimeString()}</b>
          <span style={{ marginLeft: "5%" }}>
            {currTime.toLocaleDateString("en-US", dateFormatOptions)}
          </span>
          <div style={{ marginTop: "3%" }}>
            <h2>
              <b>My Delivery Log</b>
            </h2>
            <table
              className="table"
              style={{
                width: "98%",
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              <thead>
                <tr>
                  <th>DO ID</th>
                  <th>PO ID</th>
                  <th>Site ID</th>
                  <th>Location</th>
                  <th>Invoice No</th>
                  <th>Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {deliveryNotes.map((deliveryNote) => (
                  <tr>
                    <td>
                      <a
                        href="#"
                        onClick={() => {
                          window.location.replace(
                            `/supplierhome/mydeliverylog/${deliveryNote.deliveryId.substring(
                              1
                            )}`
                          );
                        }}
                      >
                        {deliveryNote.deliveryId}
                      </a>
                    </td>
                    <td>{deliveryNote.pOrderId}</td>
                    <td>{deliveryNote.siteId}</td>
                    <td>{deliveryNote.location}</td>
                    <td>#IN-{deliveryNote.deliveryId.substring(3)}</td>
                    <td>{new Date(deliveryNote.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ width: "1px" }}>
          <p style={{ color: "white" }}>Invisible</p>
        </div>
      </div>
    </div>
  );
}
