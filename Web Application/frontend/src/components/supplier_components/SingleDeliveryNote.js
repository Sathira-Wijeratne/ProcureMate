import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function SingleDeliveryNote() {
  if (sessionStorage.getItem("prMateReilppus") === null) {
    window.location.replace("/");
  }

  const { deliveryId } = useParams();

  const supplierId = sessionStorage.getItem("supplierId");
  const supplierName = sessionStorage.getItem("supplierName");
  const [currTime, setCurrTime] = useState(new Date());
  const dateFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const [deliveryNote, setDeliveryNote] = useState({});
  const [order, setOrder] = useState({});

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);

    axios
      .get(`http://localhost:8070/supplier/getdeliverynote/${deliveryId}`)
      .then((res) => {
        setDeliveryNote(res.data[0]);
        console.log(res.data[0]);
        axios
          .get(
            `http://localhost:8070/supplier/getorder/${supplierId}/${res.data[0].pOrderId.substring(
              1
            )}`
          )
          .then((res) => {
            setOrder(res.data[0]);
            console.log(res.data[0]);
          });
      });
  }, [deliveryId, supplierId]);

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
              <b>Delivery Note</b>
            </h2>
            <form>
              <div className="row" style={{ marginTop: "2%" }}>
                <div className="col">
                  <center>
                    <b>PO ID - {deliveryNote.pOrderId}</b>
                  </center>
                </div>
                <div className="col">
                  <center>
                    <b>Item Name - {deliveryNote.itemName}</b>
                  </center>
                </div>
              </div>
              <center>
                <div
                  style={{
                    marginTop: "10%",
                    width: "50%",
                    height: "100%",
                    border: "3px solid gray",
                  }}
                >
                  <center style={{ marginTop: "4%" }}>
                    <h5>
                      <b>Delivery Information</b>
                    </h5>
                  </center>
                  <center>
                    <table style={{ marginTop: "15%", marginBottom: "10%" }}>
                      <tr>
                        <th>DO ID</th>
                        <td>- {deliveryNote.deliveryId}</td>
                      </tr>
                      <tr>
                        <th>Requested Quantity</th>
                        <td>
                          - {order.qty} {deliveryNote.uom}
                        </td>
                      </tr>
                      <tr>
                        <th>Delivered Quantity</th>
                        <td>
                          -{deliveryNote.qty} {deliveryNote.uom}
                        </td>
                      </tr>
                      <tr>
                        <th>Site ID</th>
                        <td>- {deliveryNote.siteId}</td>
                      </tr>
                      <tr>
                        <th>Location</th>
                        <td>- {deliveryNote.location}</td>
                      </tr>
                    </table>
                  </center>
                </div>
              </center>
            </form>
          </div>
        </div>
        <div style={{ width: "1px" }}>
          <p style={{ color: "white" }}>Invisible</p>
        </div>
      </div>
    </div>
  );
}
