import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import constants from "../../common/AccountantCommonConstants";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
export default function PendingInvoices() {
  // if (sessionStorage.getItem(constants.SESSION_KEY_ACCOUNTANT) === null) {
  //       window.location.replace("/");
  //     }
  const accountantId = sessionStorage.getItem(
    constants.SESSION_KEY_ACCOUNTANT_ID
  );
  const accountantName = sessionStorage.getItem(
    constants.SESSION_KEY_ACCOUNTANT_NAME
  );
  const [currTime, setCurrTime] = useState(new Date());
  const dateFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);

    // Make an HTTP request to your server to fetch pending invoices using Axios
    axios
      .get(`${constants.BASE_URL}/invoice/invoices/pending`) // Replace with your actual API endpoint
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pending invoices:", error);
      });
  }, []);

  return (
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
          <b>{constants.RAISED_ORDERS}</b>
        </div>
        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <b>{accountantName}</b>
          <br />
          {constants.ACCOUNTANT}
        </div>
        <div style={{ marginTop: "8%", fontSize: "150%", marginLeft: "10%" }}>
          <a
            href="/accountinghome/pendingInvoices"
            style={{ textDecoration: "none" }}
          >
            <BsFillStarFill style={{ marginBottom: "2%", marginRight: "5%" }} />
            <b style={{ color: "#3a7ae0" }}>{constants.RAISED_ORDERS}</b>
          </a>
          <br />
          <br />
          <a
            href="/accountinghome/deliveryLogs"
            style={{ textDecoration: "none" }}
          >
            <BsMenuButtonWideFill
              style={{
                marginBottom: "1%",
                marginRight: "5%",
                color: "black",
              }}
            />
            <b style={{ color: "black" }}>{constants.DELIVERY_LOGS}</b>
          </a>
          <br />
          <br />
          <a
            href="/accountinghome/compareOrders"
            style={{ textDecoration: "none" }}
          >
            <BsMenuButtonWideFill
              style={{
                marginBottom: "1%",
                marginRight: "5%",
                color: "black",
              }}
            />
            <b style={{ color: "black" }}>{constants.COMPARE_ORDERS}</b>
          </a>
          <br />
        </div>
      </div>
      <div className="col" style={{ marginTop: "2%" }}>
        <a
          href="/"
          style={{ float: "right" }}
          onClick={() => {
            // Closing the session.
            sessionStorage.removeItem(constants.SESSION_KEY_ACCOUNTANT);
            sessionStorage.removeItem(constants.SESSION_KEY_ACCOUNTANT_EMAIL);
            sessionStorage.removeItem(constants.SESSION_KEY_ACCOUNTANT_ID);
            sessionStorage.removeItem(constants.SESSION_KEY_ACCOUNTANT_NAME);
          }}
        >
          <Button variant="btn btn-light">
            <b>{constants.LOG_OUT}</b>
          </Button>
        </a>
        <b style={{ marginLeft: "10%" }}>{currTime.toLocaleTimeString()}</b>
        <span style={{ marginLeft: "5%" }}>
          {currTime.toLocaleDateString("en-US", dateFormatOptions)}
        </span>
        <div style={{ marginTop: "3%" }}>
          <h2>
            <b>Pending Invoices</b>
          </h2>
          {invoices.length === 0 && (
            <center style={{ marginTop: "5%" }}>
              <h2>No Pending Invoices</h2>
            </center>
          )}
          {invoices.length !== 0 && (
            <table>
              <thead>
                <tr>
                  <th>Delivery ID</th>
                  <th>Purchase Order ID</th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td>{invoice.deliveryId}</td>
                    <td>{invoice.pOrderId}</td>
                    <td>{invoice.itemCode}</td>
                    <td>{invoice.itemName}</td>
                    <td>{invoice.qty}</td>
                    <td>{invoice.unitPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div style={{ width: "1px" }}>
        <p style={{ color: "white" }}>{constants.INVISIBLE}</p>
      </div>
    </div>
  );
}
