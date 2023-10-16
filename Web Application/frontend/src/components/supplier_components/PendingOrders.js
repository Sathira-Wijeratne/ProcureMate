import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
import axios from "axios";
import constants from "../../common/SupplierCommonConstants";

export default function PendingOrders() {
  // Check whether the session is open
  if (sessionStorage.getItem(constants.SESSION_KEY_SUPPLIER) === null) {
    window.location.replace("/");
  }

  const supplierId = sessionStorage.getItem(constants.SESSION_KEY_SUPPLIER_ID);
  const supplierName = sessionStorage.getItem(
    constants.SESSION_KEY_SUPPLIER_NAME
  );
  const [currTime, setCurrTime] = useState(new Date());
  const dateFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);

    // Requesting all the pending orders from the backend which are relavant to the current user.
    axios
      .get(
        `${constants.BASE_URL}/${constants.SUPPLIER_URL}/${constants.GET_PENDINGS_ORDERS_URL}/${supplierId}`
      )
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [supplierId]);
  return (
    <div>
      <div className="row" style={{ height: "100%" }}>
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
            <b>{constants.PENDING_ORDERS}</b>
          </div>
          <div style={{ textAlign: "center", marginTop: "3%" }}>
            <b>{supplierName}</b>
            <br />
            {constants.SUPPLIER}
          </div>
          <div style={{ marginTop: "8%", fontSize: "150%", marginLeft: "10%" }}>
            <a
              href="/supplierhome/pendingorders"
              style={{ textDecoration: "none" }}
            >
              <BsFillStarFill
                style={{ marginBottom: "2%", marginRight: "5%" }}
              />
              <b style={{ color: "#3a7ae0" }}>{constants.PENDING_ORDERS}</b>
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
              <b style={{ color: "black" }}>{constants.INVOICES}</b>
            </a>
            <br />
            <br />
            <a
              href="/supplierhome/mydeliverylog"
              style={{ textDecoration: "none" }}
            >
              <BsMenuButtonWideFill
                style={{
                  marginBottom: "1%",
                  marginRight: "5%",
                  color: "black",
                }}
              />
              <b style={{ color: "black" }}>{constants.MY_DELIVERY_LOG}</b>
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
              sessionStorage.removeItem(constants.SESSION_KEY_SUPPLIER);
              sessionStorage.removeItem(constants.SESSION_KEY_SUPPLIER_EMAIL);
              sessionStorage.removeItem(constants.SESSION_KEY_SUPPLIER_ID);
              sessionStorage.removeItem(constants.SESSION_KEY_SUPPLIER_NAME);
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
              <b>{constants.PENDING_ORDERS}</b>
            </h2>
            {orders.length === 0 && (
              <center style={{ marginTop: "5%" }}>
                <h2>{constants.NO_PENDING_ORDERS}</h2>
              </center>
            )}
            {orders.length !== 0 && (
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
                    <th>{constants.PO_ID}</th>
                    <th>{constants.SITE_ID}</th>
                    <th>{constants.LOCATION}</th>
                    <th>{constants.ITEM_NAME}</th>
                    <th>{constants.QUANTITY}</th>
                    <th>{constants.DUE_DATE}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className="raised-orders-table-row-hover"
                      onClick={() => {
                        window.location.replace(
                          `/${constants.SUPPLIER_HOME_PATH}/${constants.PENDING_ORDERS_PATH
                          }/${order.pOrderId.substring(1)}`
                        );
                      }}
                    >
                      <td>
                        {order.pOrderId}
                      </td>
                      <td>{order.siteId}</td>
                      <td>{order.location}</td>
                      <td>{order.itemName}</td>
                      <td>
                        {order.qty} {order.uom}
                      </td>
                      <td>{new Date(order.dueDate).toLocaleDateString()}</td>
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
    </div>
  );
}
