import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import constants from "../../common/SupplierCommonConstants";

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
            <b>{constants.MY_DELIVERY_LOG}</b>
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
              <BsFillStarFill
                style={{ marginBottom: "2%", marginRight: "5%" }}
              />
              <b style={{ color: "#3a7ae0" }}>{constants.MY_DELIVERY_LOG}</b>
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
              <b>{constants.DELIVERY_NOTE}</b>
            </h2>
            <form>
              <div className="row" style={{ marginTop: "2%" }}>
                <div className="col">
                  <center>
                    <b>
                      {constants.PO_ID} - {deliveryNote.pOrderId}
                    </b>
                  </center>
                </div>
                <div className="col">
                  <center>
                    <b>
                      {constants.ITEM_NAME} - {deliveryNote.itemName}
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
                      <b>{constants.DELIVERY_INFORMATION}</b>
                    </h5>
                  </center>
                  <center>
                    <table style={{ marginTop: "15%", marginBottom: "10%" }}>
                      <tr>
                        <th>{constants.DO_ID}</th>
                        <td>- {deliveryNote.deliveryId}</td>
                      </tr>
                      <tr>
                        <th>{constants.REQUESTED_QUANTITY}</th>
                        <td>
                          - {order.qty} {deliveryNote.uom}
                        </td>
                      </tr>
                      <tr>
                        <th>{constants.DELIVERED_QUANTITY}</th>
                        <td>
                          -{deliveryNote.qty} {deliveryNote.uom}
                        </td>
                      </tr>
                      <tr>
                        <th>{constants.SITE_ID}</th>
                        <td>- {deliveryNote.siteId}</td>
                      </tr>
                      <tr>
                        <th>{constants.LOCATION}</th>
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
          <p style={{ color: "white" }}>{constants.INVISIBLE}</p>
        </div>
      </div>
    </div>
  );
}
