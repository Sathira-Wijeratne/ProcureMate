import React, { useState, useEffect } from "react";
import axios from "axios";
import constants from "../../common/AccountantCommonConstants";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom';
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
export default function MatchedRecords({ purchaseOrder, deliveryOrder }) {
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
  const [selectedPOrderId, setSelectedPOrderId] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [pendingPOrderIds, setPendingPOrderIds] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [selectedDeliveryNote, setSelectedDeliveryNote] = useState([]);

  const { pOrderId } = useParams();
  const { deliveryId } = useParams();
  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);
        axios
          .get(`${constants.BASE_URL}/purchaseOrderPayment/purchaseOrder/getPurchaseOrder/${pOrderId}`)
          .then((response) => {
            console.log('Purchase Orders');
            console.log(response.data);
            
            setPurchaseOrders(response.data.purchaseOrder);
          })
          .catch((error) =>
            console.error("Error fetching purchase orders:", error)
          );
        axios
          .get(`${constants.BASE_URL}/deliveryOrderPayment/deliveryNote/getDeliveryNote/${deliveryId}`)
          .then((response) => {
            console.log("Delivery Logs");
            console.log(response.data);
            setDeliveryNotes(response.data.deliveryNote);
          })
          .catch((error) =>
            console.error("Error fetching delivery notes:", error)
          );
      },[pOrderId,deliveryId])

    const areQuantitiesMatching = () => {
        if (purchaseOrders.length === 1 && deliveryNotes.length === 1) {
          return purchaseOrders[0].qty === deliveryNotes[0].qty;
        }
        return false;
      };
  
  const handlePaymentConfirmation = () => {
    const confirmPayment = window.confirm("Confirm Payment?");
    if (confirmPayment) {
      window.alert("Confirmed Payment");
    } else {
      window.alert("Payment Declined");
    }
  };

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
            {/* <BsFillStarFill style={{ marginBottom: "2%", marginRight: "5%" }} /> */}
            <BsMenuButtonWideFill
              style={{
                marginBottom: "1%",
                marginRight: "5%",
                color: "black",
              }}
            />
            <b style={{ color: "lack" }}>{constants.RAISED_ORDERS}</b>
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
            <BsFillStarFill style={{ marginBottom: "2%", marginRight: "5%" }} />
            <b style={{ color: "#3a7ae0" }}>{constants.COMPARE_ORDERS}</b>
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
            <b>Compare Orders</b>
          </h2>
          <label>
            Select Purchase Order ID:
            <input
              value= {pOrderId}
              disabled
          
            > 
            </input>
          </label>
          <br />
          <label>
            Delivery Note:
            <input type="text" value={ deliveryId } readOnly />
          </label>
          {purchaseOrders.length === 0 && (
            <center style={{ marginTop: "5%" }}>
              <h2>No Orders To Compare</h2>
            </center>
          )}
          {/* {purchaseOrders.length !== 0 ( */}
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                  <>
                    <tr >
                      <td> PO </td>
                      <td>{purchaseOrders.itemCode}</td>
                      <td>{purchaseOrders.itemName}</td>
                      <td>{purchaseOrders.qty}</td>
                      <td>{purchaseOrders.unitPrice}</td>
                    </tr>
                      <tr >
                        <td> DO </td>
                        <td>{deliveryNotes.itemCode}</td>
                        <td>{deliveryNotes.itemName}</td>
                        <td>{deliveryNotes.qty}</td>
                        <td>{deliveryNotes.unitPrice}</td>
                      </tr>
                    {areQuantitiesMatching() ? (
            <button className="btn btn-warning"  onClick={handlePaymentConfirmation}>Payment</button>
          ) : (
            <button className="btn btn-warning"  disabled>
              Payment
            </button>
          )}
                  </>
              </tbody>
            </table>

        </div>
      </div>
      <div style={{ width: "1px" }}>
        <p style={{ color: "white" }}>{constants.INVISIBLE}</p>
      </div>
    </div>
  );
}
