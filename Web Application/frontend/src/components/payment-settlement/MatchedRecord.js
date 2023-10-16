import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import constants from "../../common/AccountantCommonConstants";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  BsFillStarFill,
  BsMenuButtonWideFill,
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
export default function MatchedRecords({ purchaseOrder, deliveryOrder }) {
  // if (sessionStorage.getItem(constants.SESSION_KEY_ACCOUNTANT) === null) {
  //       window.location.replace("/");
  //     }

  const history = useHistory();
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
  const [showModal, setShowModal] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [pendingPOrderIds, setPendingPOrderIds] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [selectedDeliveryNote, setSelectedDeliveryNote] = useState([]);

  const { pOrderId } = useParams();
  const { deliveryId } = useParams();

  const canConfirmPayment = purchaseOrders.qty === deliveryNotes.qty;

  const quantitiesMatch = purchaseOrders.qty === deliveryNotes.qty;

  const handlePaymentConfirmation = () => {
    if (canConfirmPayment) {
      setShowModal(true);
    } else {
      window.alert("Quantities don't match. Payment cannot be confirmed.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = () => {
    handleConfirmPayment();
    window.alert("Payment Confirmed");
    setShowModal(false);
  };

  const handleConfirmPayment = () => {
    axios
      .put(`${constants.BASE_URL}/invoice/invoices/pending/${pOrderId}`, {
        paymentStatus: "Paid",
      })
      .then(() => {
        window.location.replace(`/accountinghome/compareOrders`);
      })
      .catch((error) => {
        console.error("Error updating payment status:", error);
      });
  };

  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);
    axios
      .get(
        `${constants.BASE_URL}/purchaseOrderPayment/purchaseOrder/getPurchaseOrder/${pOrderId}`
      )
      .then((response) => {
        console.log("Purchase Orders");
        console.log(response.data);

        setPurchaseOrders(response.data.purchaseOrder);
      })
      .catch((error) =>
        console.error("Error fetching purchase orders:", error)
      );
    axios
      .get(
        `${constants.BASE_URL}/deliveryOrderPayment/deliveryNote/getDeliveryNote/${deliveryId}`
      )
      .then((response) => {
        console.log("Delivery Logs");
        console.log(response.data);
        setDeliveryNotes(response.data.deliveryNote);
      })
      .catch((error) => console.error("Error fetching delivery notes:", error));
  }, [pOrderId, deliveryId]);

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
          <b>{constants.PROCUREMENT_STAFF}</b>
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
            <b>{constants.COMPARE_PO_AND_DO}</b>
          </h2>
          <div className="row">
            <div className="col-6">
              <label>
                Select Purchase Order ID:
                <input
                  value={"#" + pOrderId}
                  disabled
                  style={{
                    width: "100%", // Increase the width of the select
                    border: "4px solid lightblue", // Add a light blue border
                    fontWeight: "bold", // Make the text bold
                  }}
                ></input>
              </label>
            </div>
            <br />
            <div className="col-6">
              <label>
                Delivery Note:
                <input
                  type="text"
                  value={"#" + deliveryId}
                  style={{
                    width: "100%", // Increase the width of the select
                    border: "4px solid lightblue", // Add a light blue border
                    fontWeight: "bold", // Make the text bold
                  }}
                  readOnly
                />
              </label>
            </div>
          </div>
          {purchaseOrders.length === 0 && (
            <center style={{ marginTop: "5%" }}>
              <h2>No Orders To Compare</h2>
            </center>
          )}
          <table class="table">
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
                <tr>
                  <td> PO </td>
                  <td>{purchaseOrders.itemCode}</td>
                  <td>{purchaseOrders.itemName}</td>
                  <td>{purchaseOrders.qty}</td>
                  <td>{purchaseOrders.unitPrice}</td>
                  <td>
                    {quantitiesMatch ? (
                      <button className="btn btn-success">
                        <BsFillHandThumbsUpFill />
                      </button>
                    ) : (
                      <button className="btn btn-danger">
                        <BsFillHandThumbsDownFill />
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td> DO </td>
                  <td>{deliveryNotes.itemCode}</td>
                  <td>{deliveryNotes.itemName}</td>
                  <td>{deliveryNotes.qty}</td>
                  <td>{deliveryNotes.unitPrice}</td>
                  <td>
                    {quantitiesMatch ? (
                      <button className="btn btn-success">
                        <BsFillHandThumbsUpFill />
                      </button>
                    ) : (
                      <button className="btn btn-danger">
                        <BsFillHandThumbsDownFill />
                      </button>
                    )}
                  </td>
                </tr>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    handlePaymentConfirmation();
                  }}
                  disabled={!canConfirmPayment}
                  style={{
                    textAlign: "right", // Increase the width of the select
                    float: "right", // Add a light blue border
                    fontWeight: "bold", // Make the text bold
                    marginRight: "-850px",
                  }}
                >
                  Payment
                </button>
                <Modal show={showModal} onHide={handleModalClose}>
                  {/* <Modal.Header closeButton> */}
                  {/* <Modal.Title>Confirmation</Modal.Title> */}
                  {/* </Modal.Header> */}
                  <Modal.Body>Confirm Payment?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="success" onClick={handleModalConfirm}>
                      YES
                    </Button>
                    <Button variant="danger" onClick={handleModalClose}>
                      NO
                    </Button>
                  </Modal.Footer>
                </Modal>
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
