import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";

export default function SingleInvoice() {
  if (sessionStorage.getItem("prMateReilppus") === null) {
    window.location.replace("/");
  }
  const { invoiceId } = useParams();

  const supplierId = sessionStorage.getItem("supplierId");
  const supplierName = sessionStorage.getItem("supplierName");
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
    axios
      .get(`http://localhost:8070/supplier/getinvoice/${invoiceId}`)
      .then((res) => {
        setInvoice(res.data[0]);
        console.log(res.data[0]);
      });
  }, [invoiceId]);

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
            <b>Invoices</b>
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
              <BsFillStarFill
                style={{ marginBottom: "2%", marginRight: "5%" }}
              />
              <b style={{ color: "#3a7ae0" }}>Invoices</b>
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
              <b style={{ color: "black" }}>My Delovery Log</b>
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
              <b>Invoice</b>
            </h2>
            <form>
              <div className="row" style={{ marginTop: "2%" }}>
                <div className="col">
                  <center>
                    <b>PO ID - {invoice.pOrderId}</b>
                  </center>
                </div>
                <div className="col">
                  <center>
                    <b>Item Name - {invoice.itemName}</b>
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
                      <b>Invoice Details</b>
                    </h5>
                  </center>
                  <center>
                    <table style={{ marginTop: "15%", marginBottom: "10%" }}>
                      <tr>
                        <th>Invoice No</th>
                        <td>- #{invoiceId}</td>
                      </tr>
                      <tr>
                        <th>Unit Price</th>
                        <td>
                          - Rs.{" "}
                          {Number.parseFloat(invoice.unitPrice).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>Quantity</th>
                        <td>
                          - {invoice.qty} {invoice.uom}
                        </td>
                      </tr>

                      <tr>
                        <th>Total Amount</th>
                        <td>
                          - Rs. {Number.parseFloat(invoice.cost).toFixed(2)}
                        </td>
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
