import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import constants from "../../common/SupplierCommonConstants";

export default function CreateDeliveryInvoice() {
  if (sessionStorage.getItem(constants.SESSION_KEY_SUPPLIER) === null) {
    window.location.replace("/");
  }

  const { pOrderId } = useParams();

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
  const [order, setOrder] = useState({});
  const [item, setItem] = useState({});
  const [deliveredQty, setDeliveredQty] = useState(0);

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);

    axios
      .get(
        `${constants.BASE_URL}/${constants.SUPPLIER_URL}/${constants.GET_ORDER_URL}/${supplierId}/${pOrderId}`
      )
      .then((res) => {
        console.log(res.data[0]);
        setOrder(res.data[0]);
        setDeliveredQty(res.data[0].qty);
        axios
          .get(
            `${constants.BASE_URL}/${constants.SUPPLIER_URL}/${constants.GET_ITEM_URL}/${supplierId}/${res.data[0].itemName}`
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
      constants.CONFIRM_MESSAGE_CREATING_DELIVERY_NOTE_AND_INVOICE
    );
    if (response) {
      const deliveryNote = {
        deliveryId: constants.HASH_D + pOrderId.substring(1),
        pOrderId: constants.HASH + pOrderId,
        supplierId: supplierId,
        date: new Date(),
        status: constants.SENT,
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
              <b>{constants.PENDING_ORDER}</b>
            </h2>
            <form onSubmit={proceed}>
              <div className="row" style={{ marginTop: "2%" }}>
                <div className="col">
                  <center>
                    <b>
                      {constants.PO_ID_DASH_HASH}
                      {pOrderId}
                    </b>
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
                        <b>{constants.DELIVERY_INFORMATION}</b>
                      </h5>
                    </center>
                    <center>
                      <table style={{ marginTop: "15%" }}>
                        <tr>
                          <th>{constants.DO_ID}</th>
                          <td>
                            {constants.DASH_HASH_D_DASH}
                            {pOrderId.substring(2)}
                          </td>
                        </tr>
                        <tr>
                          <th>{constants.REQUESTED_QUANTITY}</th>
                          <td>
                            - {order.qty} {order.uom}
                          </td>
                        </tr>
                        <tr>
                          <th>{constants.DELIVERED_QUANTITY}</th>
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
                          <th>{constants.SITE_ID}</th>
                          <td>- {order.siteId}</td>
                        </tr>
                        <tr>
                          <th>{constants.LOCATION}</th>
                          <td>- {order.location}</td>
                        </tr>
                      </table>
                    </center>
                  </div>
                </div>
                <div className="col">
                  <center>
                    <b>
                      {constants.ITEM_NAME} - {order.itemName}
                    </b>
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
                        <b>{constants.INVOICE_DETAILS}</b>
                      </h5>
                    </center>
                    <center>
                      <table style={{ marginTop: "15%" }}>
                        <tr>
                          <th>{constants.INVOICE_NO}</th>
                          <td>
                            {constants.DASH_HASH_IN_DASH}
                            {pOrderId.substring(2)}
                          </td>
                        </tr>
                        <tr>
                          <th>{constants.UNIT_PRICE}</th>
                          <td>
                            - {constants.RS_DOT}{" "}
                            {Number.parseFloat(item.unitPrice).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <th>{constants.QUANTITY}</th>
                          <td>
                            - {deliveredQty} {order.uom}
                          </td>
                        </tr>

                        <tr>
                          <th>{constants.TOTAL_AMOUNT}</th>
                          <td>
                            - {constants.RS_DOT}{" "}
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
                <b>{constants.PROCEED}</b>
              </Button>
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
