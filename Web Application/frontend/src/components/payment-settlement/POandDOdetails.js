import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import constants from "../../common/AccountantCommonConstants";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";
export default function PurchaseOrderDeliveryForm() {
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
  let history = useHistory;
  const [selectedPOrderId, setSelectedPOrderId] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [pendingPOrderIds, setPendingPOrderIds] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [deliveryNotes, setDeliveryNotes] = useState([]);
  const [selectedDeliveryNote, setSelectedDeliveryNote] = useState([]);
  const { pOrderId, deliveryId } = useParams();
  // const { deliveryId } = useParams();
  useEffect(() => {
    setInterval(() => setCurrTime(new Date()), 1000);
    axios
      .get(`${constants.BASE_URL}/invoice/invoices/pending`) // Replace with the actual API endpoint
      .then((response) => {
        console.log(response.data);
        setPendingInvoices(response.data);
        setPendingPOrderIds(response.data.map((invoice) => invoice.pOrderId));
        axios
          .get(`${constants.BASE_URL}/purchaseOrderPayment/`)
          .then((response) => {
            setPurchaseOrders(response.data);
          })
          .catch((error) =>
            console.error("Error fetching purchase orders:", error)
          );
        axios
          .get(`${constants.BASE_URL}/deliveryOrderPayment/`)
          .then((response) => {
            console.log("Delivery Logs");
            console.log(response.data);
            setDeliveryNotes(response.data);
          })
          .catch((error) =>
            console.error("Error fetching delivery notes:", error)
          );
      })
      .catch((error) => {
        console.error("Error fetching pending purchase order IDs", error);
      });
  }, []);

  const handlePOrderIdChange = (event) => {
    const selectedId = event.target.value;
    console.log(selectedId);
    setSelectedPOrderId(selectedId);
    console.log(pendingInvoices);
    const selectedInvoice = pendingInvoices.find(
      (invoice) => invoice.pOrderId === selectedId
    );
    const selectedDeliveryNote = deliveryNotes.find(
      (invoice) => invoice.deliveryId === selectedInvoice.deliveryId
    );
    const selectedPurchaseOrder = purchaseOrders.find(
      (invoice) => invoice.pOrderId === selectedInvoice.pOrderId
    );
    console.log("Selected delivery logs");

    console.log(selectedInvoice);
    if (selectedInvoice) {
      setPurchaseOrders([selectedPurchaseOrder]);
      setDeliveryNotes([selectedDeliveryNote]);
      setDeliveryNote(selectedInvoice.deliveryId);
      console.log([selectedDeliveryNote]);
    } else {
      setDeliveryNote(""); // Clear the delivery note if not found
    }
  };

  const handleViewClick = () => {
    // Navigate to the MatchedRecords page
    history.push("/matchedRecords");
  };
  const handleNavigate = () => {
    // Change the URL to the desired page
    window.location.replace = "/accountinghome/matchedRecords";
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
            <b style={{ color: "black" }}>{constants.RAISED_ORDERS}</b>
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
                <div>Select Purchase Order ID</div>
                <select
                  value={selectedPOrderId}
                  onChange={(event) => {
                    handlePOrderIdChange(event);
                  }}
                  style={{
                    width: "150%", // Increase the width of the select
                    border: "4px solid lightblue", // Add a light blue border
                    fontWeight: "bold", // Make the text bold
                  }}
                >
                  <option value=""> Select Purchase Order ID </option>
                  {pendingPOrderIds.map((pOrderId) => (
                    <option key={pOrderId} value={pOrderId}>
                      {pOrderId}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <br />
            <div className="col-6">
              <label>
                <div>Delivery Note:</div>
                <input
                  type="text"
                  value={deliveryNote}
                  readOnly
                  style={{
                    width: "150%", // Increase the width of the input field
                    border: "4px solid lightblue", // Add a light blue border
                    fontWeight: "bold", // Make the text bold
                  }}
                />
              </label>
            </div>
          </div>
          {purchaseOrders.length === 0 && (
            <center style={{ marginTop: "5%" }}>
              <h2>No Pending Invoices</h2>
            </center>
          )}
          {purchaseOrders.length !== 0 && selectedPOrderId && (
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
                {purchaseOrders.map((purchaseOrder) => (
                  <>
                    <tr key={purchaseOrder._id}>
                      <td> PO </td>
                      <td>{purchaseOrder.itemCode}</td>
                      <td>{purchaseOrder.itemName}</td>
                      <td>{purchaseOrder.qty}</td>
                      <td>{purchaseOrder.unitPrice}</td>
                      <button
                        style={{ backgroundColor: "black", color: "white" }}
                        onClick={() => {
                          window.location.replace(
                            `/accountinghome/matchedRecords/${selectedPOrderId.substring(
                              1
                            )}/${deliveryNote.substring(1)}`
                          );
                        }}
                      >
                        VIEW
                      </button>
                      {/* <Button as={Link} to={`/accountinghome/matchedRecords/${selectedPOrderId.substring(1)}`}>VIEW</Button> */}
                    </tr>

                    {deliveryNotes.map((deliveryNote) => (
                      <tr key={deliveryNote.id}>
                        {/* <td key={deliveryNote.id}> */}
                        <td> DO </td>
                        <td>{deliveryNote.itemCode}</td>
                        <td>{deliveryNote.itemName}</td>
                        <td>{deliveryNote.qty}</td>
                        <td>{deliveryNote.unitPrice}</td>
                        {/* </td> */}
                      </tr>
                    ))}
                  </>
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
