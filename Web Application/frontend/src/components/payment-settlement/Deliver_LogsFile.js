import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import constants from "../../common/AccountantCommonConstants";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
export default function DeliveryLogs() {
  if (sessionStorage.getItem(constants.SESSION_KEY_ACCOUNTANT) === null) {
    window.location.replace("/");
  }
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

  const [deliveryLogs, setDeliveryLogs] = useState([]);

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);

    // Make an HTTP request to your server to fetch pending invoices using Axios
    axios
      .get(`${constants.BASE_URL}/deliveryOrderPayment/`) // Replace with your actual API endpoint
      .then((response) => {
        setDeliveryLogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching delivery Logs:", error);
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
            <BsMenuButtonWideFill
              style={{
                marginBottom: "1%",
                marginRight: "5%",
                color: "black",
              }}
            />
            <b style={{ color: "black" }}>{constants.RAISED_ORDERS}</b>
          </a>
          <br />
          <br />
          <a
            href="/accountinghome/deliveryLogs"
            style={{ textDecoration: "none" }}
          >
            <BsFillStarFill style={{ marginBottom: "2%", marginRight: "5%" }} />
            <b style={{ color: "#3a7ae0" }}>{constants.DELIVERY_LOGS}</b>
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
            <b>Delivery Logs</b>
          </h2>
          {deliveryLogs.length === 0 && (
            <center style={{ marginTop: "5%" }}>
              <h2>No Delivery Logs</h2>
            </center>
          )}
          {deliveryLogs.length !== 0 && (
            <table class="table">
              <thead>
                <tr>
                  <th>Delivery Id</th>
                  <th>Status</th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {deliveryLogs.map((deliveryLog) => (
                  <tr key={deliveryLog._id}>
                    <td>{deliveryLog.deliveryId}</td>
                    <td>{deliveryLog.status}</td>
                    <td>{deliveryLog.itemCode}</td>
                    <td>{deliveryLog.itemName}</td>
                    <td>{deliveryLog.unitPrice}</td>
                    <td>{deliveryLog.qty}</td>
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
