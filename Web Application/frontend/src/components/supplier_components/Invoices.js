import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
import axios from "axios";
import constants from "../../common/SupplierCommonConstants";

export default function Invoices() {
  if (sessionStorage.getItem("prMateReilppus") === null) {
    window.location.replace("/");
  }

  const supplierId = sessionStorage.getItem("supplierId");
  const supplierName = sessionStorage.getItem("supplierName");
  const [currTime, setCurrTime] = useState(new Date());
  const dateFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);
    axios
      .get(`http://localhost:8070/supplier/getinvoices/${supplierId}`)
      .then((res) => {
        console.log(res.data);
        setInvoices(res.data);
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
              sessionStorage.removeItem("prMateReilppus");
              sessionStorage.removeItem("supplierEmail");
              sessionStorage.removeItem("supplierId");
              sessionStorage.removeItem("supplierName");
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
              <b>{constants.INVOICES}</b>
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
                  <th>{constants.INVOICE_NO}</th>
                  <th>{constants.PO_ID}</th>
                  <th>{constants.DO_ID}</th>
                  <th>{constants.AMOUNT}</th>
                  <th> {constants.DATE}</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr>
                    <td>
                      <a
                        href="#"
                        onClick={() => {
                          window.location.replace(
                            `/supplierhome/invoices/${invoice.invoiceId.substring(
                              1
                            )}`
                          );
                        }}
                      >
                        {invoice.invoiceId}
                      </a>
                    </td>
                    <td>{invoice.pOrderId}</td>
                    <td>{invoice.deliveryId}</td>
                    <td>
                      {constants.RS_DOT}{" "}
                      {Number.parseFloat(invoice.cost).toFixed(2)}
                    </td>
                    <td>{new Date(invoice.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ width: "1px" }}>
          <p style={{ color: "white" }}>{constants.INVISIBLE}</p>
        </div>
      </div>
    </div>
  );
}
