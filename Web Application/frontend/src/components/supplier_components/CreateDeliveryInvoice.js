import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function CreateDeliveryInvoice() {
  if (sessionStorage.getItem("prMateReilppus") === null) {
    window.location.replace("/");
  }

  const { pOrderId } = useParams();

  const supplierId = sessionStorage.getItem("supplierId");
  const supplierName = sessionStorage.getItem("supplierName");
  const [currTime, setCurrTime] = useState(new Date());
  const dateFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const [order, setOrder] = useState({});
  const [item, setItem] = useState({});
  const [deliveredQty, setDeliveredQty] = useState(0);

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);

    axios
      .get(`http://localhost:8070/supplier/getorder/${supplierId}/${pOrderId}`)
      .then((res) => {
        console.log(res.data[0]);
        setOrder(res.data[0]);
        setDeliveredQty(res.data[0].qty);
        axios
          .get(
            `http://localhost:8070/supplier/getitem/${supplierId}/${res.data[0].itemName}`
          )
          .then((res) => {
            setItem(res.data[0]);
            console.log(res.data[0]);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [supplierId, pOrderId]);

  function proceed(e) {
    e.preventDefault();
    var response = window.confirm(
      "Are you sure you want to proceed?\nThis process will create the invoice and send the delivery note."
    );
    if (response) {
      const deliveryNote = {
        deliveryId: "#D" + pOrderId.substring(1),
        pOrderId: "#" + pOrderId,
        supplierId: supplierId,
        date: new Date(),
        status: "Sent",
        itemName: order.itemName,
        qty: deliveredQty,
        uom: order.uom,
        siteMngId: order.siteMngId,
        siteId: order.siteId,
        location: order.location,
      };

      const invoice = {
        invoiceId: "#IN-" + pOrderId.substring(2),
        deliveryId: "#D" + pOrderId.substring(1),
        pOrderId: "#" + pOrderId,
        supplierId: supplierId,
        itemName: order.itemName,
        qty: deliveredQty,
        uom: order.uom,
        unitPrice: item.unitPrice,
        cost: deliveredQty * item.unitPrice,
        date: new Date(),
        paymentStatus: "Pending",
      };

      const purchaseOrder = {
        pOrderId: order.pOrderId,
        itemName: order.itemName,
        qty: order.qty,
        uom: order.uom,
        amount: order.amount,
        date: order.date,
        dueDate: order.dueDate,
        supplierId: order.supplierId,
        siteMngId: order.siteMngId,
        siteId: order.siteId,
        location: order.location,
        status: "Completed",
      };

      axios
        .post(
          `http://localhost:8070/supplier/createdeliverynote/`,
          deliveryNote
        )
        .then((res) => {
          axios
            .post(`http://localhost:8070/supplier/createinvoice/`, invoice)
            .then((res) => {
              axios
                .put(
                  `http://localhost:8070/supplier/updatepurchaseorder/${pOrderId}`,
                  purchaseOrder
                )
                .then(() => {
                  alert("Purchase Order Completed!");
                  window.location.replace(`/supplierhome/pendingorders`);
                })
                .catch((err) => {
                  alert("Error in updating purchase order.");
                  alert(err);
                });
            })
            .catch((err) => {
              alert("Error in creating invoice.");
              console.log(err.message);
            });
        })
        .catch((err) => {
          alert("Error in creating delivery note.");
          console.log(err.message);
        });
    }
  }
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
            <b>Pending Orders</b>
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
              <BsFillStarFill
                style={{ marginBottom: "2%", marginRight: "5%" }}
              />
              <b style={{ color: "#3a7ae0" }}>Pending Orders</b>
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
              <b>Pending Order</b>
            </h2>
            <form onSubmit={proceed}>
              <div className="row" style={{ marginTop: "2%" }}>
                <div className="col">
                  <center>
                    <b>PO ID - #{pOrderId}</b>
                  </center>
                  <div
                    style={{
                      marginTop: "10%",
                      width: "100%",
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
                      <table style={{ marginTop: "15%" }}>
                        <tr>
                          <th>DO ID</th>
                          <td>- #D-{pOrderId.substring(2)}</td>
                        </tr>
                        <tr>
                          <th>Requested Quantity</th>
                          <td>
                            - {order.qty} {order.uom}
                          </td>
                        </tr>
                        <tr>
                          <th>Delivered Quantity</th>
                          <td>
                            -{" "}
                            {order.uom !== "" && (
                              <input
                                type="number"
                                value={deliveredQty}
                                min="0"
                                step="0.001"
                                onChange={(e) => {
                                  setDeliveredQty(e.target.value);
                                }}
                                required
                              />
                            )}
                            {order.uom === "" && (
                              <input
                                type="number"
                                value={deliveredQty}
                                min="0"
                                onChange={(e) => {
                                  setDeliveredQty(e.target.value);
                                }}
                                required
                              />
                            )}{" "}
                            {order.uom}
                          </td>
                        </tr>
                        <tr>
                          <th>Site ID</th>
                          <td>- {order.siteId}</td>
                        </tr>
                        <tr>
                          <th>Location</th>
                          <td>- {order.location}</td>
                        </tr>
                      </table>
                    </center>
                  </div>
                </div>
                <div className="col">
                  <center>
                    <b>Item Name - {order.itemName}</b>
                  </center>
                  <div
                    style={{
                      marginTop: "10%",
                      width: "100%",
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
                      <table style={{ marginTop: "15%" }}>
                        <tr>
                          <th>Invoice No</th>
                          <td>- #IN-{pOrderId.substring(2)}</td>
                        </tr>
                        <tr>
                          <th>Unit Price</th>
                          <td>
                            - Rs. {Number.parseFloat(item.unitPrice).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <th>Quantity</th>
                          <td>
                            - {deliveredQty} {order.uom}
                          </td>
                        </tr>

                        <tr>
                          <th>Total Amount</th>
                          <td>
                            - Rs.{" "}
                            {Number.parseFloat(
                              deliveredQty * item.unitPrice
                            ).toFixed(2)}
                          </td>
                        </tr>
                      </table>
                    </center>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                style={{ float: "right", marginTop: "10%" }}
                variant="btn btn-success"
              >
                <b>Proceed</b>
              </Button>
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
