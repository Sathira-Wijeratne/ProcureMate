import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
import constants from "../../common/SupplierCommonConstants";

export default function SingleInvoice() {
  // Check whether the session is open
  if (sessionStorage.getItem(constants.SESSION_KEY_SUPPLIER) === null) {
    window.location.replace("/");
  }
  const { invoiceId } = useParams();

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
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);

    // Requesting invoice details from the backend.
    axios
      .get(
        `${constants.BASE_URL}/${constants.SUPPLIER_URL}/${constants.GET_INVOICE_URL}/${invoiceId}`
      )
      .then((res) => {
        setInvoice(res.data[0]);
        console.log(res.data[0]);
      });
  }, [invoiceId]);

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
            <b>{constants.INVOICES}</b>
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
              <BsMenuButtonWideFill
                style={{
                  marginBottom: "1%",
                  marginRight: "5%",
                  color: "black",
                }}
              />
              <b style={{ color: "black" }}>{constants.PENDING_ORDERS}</b>
            </a>
            <br />
            <br />
            <a href="/supplierhome/invoices" style={{ textDecoration: "none" }}>
              <BsFillStarFill
                style={{ marginBottom: "2%", marginRight: "5%" }}
              />
              <b style={{ color: "#3a7ae0" }}>{constants.INVOICES}</b>
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
              <b>{constants.INVOICE}</b>
            </h2>
            <form>
              <div className="row" style={{ marginTop: "2%" }}>
                <div className="col">
                  <center>
                    <b>
                      {constants.PO_ID} - {invoice.pOrderId}
                    </b>
                  </center>
                </div>
                <div className="col">
                  <center>
                    <b>
                      {constants.ITEM_NAME} - {invoice.itemName}
                    </b>
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
                      <b>{constants.INVOICE_DETAILS}</b>
                    </h5>
                  </center>
                  <center>
                    <table style={{ marginTop: "15%", marginBottom: "10%" }}>
                      <tr>
                        <th>{constants.INVOICE_NO}</th>
                        <td>- #{invoiceId}</td>
                      </tr>
                      <tr>
                        <th>{constants.UNIT_PRICE}</th>
                        <td>
                          - {constants.RS_DOT}{" "}
                          {Number.parseFloat(invoice.unitPrice).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>{constants.QUANTITY}</th>
                        <td>
                          - {invoice.qty} {invoice.uom}
                        </td>
                      </tr>

                      <tr>
                        <th>{constants.TOTAL_AMOUNT}</th>
                        <td>
                          - {constants.RS_DOT}{" "}
                          {Number.parseFloat(invoice.cost).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>{constants.PAYMENT_STATUS}</th>
                        <td>- {invoice.paymentStatus}</td>
                      </tr>
                    </table>
                  </center>
                </div>
              </center>
            </form>
          </div>
        </div>
        <div style={{ width: "1px" }}>
          <p style={{ color: "white" }}>{constants.INVISIBLE}</p>
        </div>
      </div>
    </div>
  );
}
