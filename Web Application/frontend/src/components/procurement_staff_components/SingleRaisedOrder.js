import ProcurementConstants from "../../common/ProcurementStaffCommonConstants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillStarFill, BsMenuButtonWideFill, BsTriangle } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

export default function SingleRaisedOrder() {
    // check whether the user is logged in
    if (sessionStorage.getItem("prMateTnemerucorp") === null) {
        window.location.replace('/');
    }

    const [currTime, setCurrTime] = useState(new Date());
    const dateFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    const employeeEmail = sessionStorage.getItem("staffEmail");
    const [employeeName, setEmployeeName] = useState("");
    const [siteManagerName, setSiteManagerName] = useState();
    const [rejectReason, setRejectReason] = useState("");

    const [raisedOrder, setRaisedOrder] = useState({});
    const { pOrderId, location } = useParams();
    const orderLimit = ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_ORDER_LIMIT_VALUE;

    // get the name of the logged in employee
    function getEmployeeName() {
        axios.get(`http://localhost:8070/procurement/get/staff/member/name/${employeeEmail}`)
            .then((res) => {
                console.log(res.data.name);
                setEmployeeName(res.data.name);
            })
            .catch((err) => {
                alert('Employee name could not be retrieved!');
                console.log(err.message);
            });
    }

    function getSiteManagerName(siteMngId) {
        axios.get(`http://localhost:8070/procurement/get/staff/member/name/empId/${siteMngId}`)
            .then((res) => {
                console.log(res.data.name);
                setSiteManagerName(res.data.name);
            })
            .catch((err) => {
                alert('Site manager name could not be retrieved!');
                console.log(err.message);
            });
    }

    function getRaisedOrder() {
        axios.get(`http://localhost:8070/procurement/get/${pOrderId}`)
            .then((res) => {
                console.log(res.data);
                setRaisedOrder(res.data);
                getSiteManagerName(res.data.siteMngId);
            })
            .catch((err) => {
                alert('Raised order could not be retrieved!');
                console.log(err.message);
            });
    }

    function approveOrder() {
        var response = window.confirm("Are you sure you want to approve this order?");

        if (response) {
            axios.patch(`http://localhost:8070/procurement/handle/approve/${pOrderId}`, {
                status: "Approved"
            })
                .then((res) => {
                    window.location.replace('/procurementstaffhome/raisedorders/');
                })
                .catch((err) => {
                    alert('Order could not be approved!');
                    console.log(err.message);
                });
        }
    }

    function rejectOrder() {
        var response = window.confirm("Are you sure you want to reject this order?");

        if (response) {
            axios.patch(`http://localhost:8070/procurement/handle/approve/${pOrderId}`, {
                status: "Rejected", rejectReason: rejectReason
            })
                .then((res) => {
                    window.location.replace('/procurementstaffhome/raisedorders/');
                })
                .catch((err) => {
                    alert('Order could not be rejected!');
                    console.log(err.message);
                });
        }
    }

    useEffect(() => {
        // set the current time
        setInterval(() => setCurrTime(new Date()), 1000);

        console.log(pOrderId);

        console.log(orderLimit);
        getEmployeeName();
        getRaisedOrder();
    }, []);

    return (
        <div>
            <div className="row" style={{ height: "100%" }}>
                {/* Left tab pane */}
                <div id="procurement-raised-orders-tab-pane" className="col-3" style={{ backgroundColor: "#b9bdba", height: "100vh" }}>
                    <div
                        id="procurement-raised-orders-label"
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
                        <b>{ProcurementConstants.RAISED_ORDERS_PAGE_TITLE}</b>
                    </div>
                    <div id="procurement-raised-orders-profile-details" style={{ textAlign: "center", marginTop: "3%" }}>
                        <b>{employeeName}</b>
                        <br />
                        {ProcurementConstants.PROCUREMENT_STAFF_USER_ROLE}
                    </div>
                    <div id="procurement-raised-orders-tabs" style={{ marginTop: "8%", fontSize: "150%", marginLeft: "10%" }}>
                        <div id="procurement-raised-orders-tabs-1" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/raisedorders/" style={{ textDecoration: "none" }}>
                                <BsFillStarFill
                                    style={{ marginBottom: "2%", marginRight: "5%", color: "#3a7ae0" }}
                                />
                                <b style={{ color: "#3a7ae0" }}>{ProcurementConstants.NAVIGATION_TAB1_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-raised-orders-tabs-2" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/approvedorders/" style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black",
                                    }}
                                />
                                <b style={{ color: "black" }}>{ProcurementConstants.NAVIGATION_TAB2_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-raised-orders-tabs-3" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/rejectedorders/" style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black",
                                    }}
                                />
                                <b style={{ color: "black" }}>{ProcurementConstants.NAVIGATION_TAB3_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-raised-orders-tabs-4" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/directorders/" style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black",
                                    }}
                                />
                                <b style={{ color: "black" }}>{ProcurementConstants.NAVIGATION_TAB4_NAME}</b>
                            </a>
                        </div>
                    </div>
                </div>

                <div id="procurement-raised-orders-content" className="col" style={{ marginTop: "2%" }}>
                    <div id="procurement-raised-orders-top">
                        <div id="procurement-raised-orders-logout-button">
                            <a
                                href="/"
                                style={{ float: "right" }}
                                onClick={() => {
                                    sessionStorage.removeItem("staffEmail");
                                }}
                            >
                                <Button variant="btn btn-light">
                                    <b>{ProcurementConstants.LOGOUT_BUTTON_TEXT}</b>
                                </Button>
                            </a>
                        </div>
                        <div id="procurement-raised-orders-date-and-time"><b style={{ marginLeft: "10%" }}>{currTime.toLocaleTimeString()}</b>
                            <span style={{ marginLeft: "5%" }}>
                                {currTime.toLocaleDateString("en-US", dateFormatOptions)}
                            </span>
                        </div>
                    </div>
                    <div id="procurement-raised-orders-content-body" style={{ marginTop: "3%" }}>
                        <h4><b>{ProcurementConstants.SINGLE_RAISED_ORDER_PAGE_PAGE_BODY_HEADING} {raisedOrder.pOrderId}</b></h4>

                        <div style={{ marginTop: '10px', border: '1px solid', paddingLeft: '20px', paddingTop: '20px', width: '30%' }}>
                            <div style={{ paddingBottom: '20px' }}>
                                <b>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_ORDER_PLACED_BY} : </b> {raisedOrder.siteMngId} - {siteManagerName}
                            </div>
                            <div style={{ paddingBottom: '20px' }}>
                                <b>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_ORDER_PLACED_BY_NAME} : </b> {raisedOrder.siteId} - {location}
                            </div>
                            <div style={{ paddingBottom: '20px' }}>
                                <b>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_ORDER_PLACED_BY_DATE} : </b> {new Date(raisedOrder.date).toLocaleDateString()}
                            </div>
                        </div>
                        <div id="single-raised-order-details" style={{ marginTop: '20px' }}>
                            <h4><b>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_BODY_HEADING}</b></h4>

                            <div id="single-raised-order-details-table">
                                <table className="table" style={{ width: '70%' }}>
                                    <thead>
                                        <tr>
                                            <th>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_TABLE_HEADER_NAME}</th>
                                            <th>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_TABLE_HEADER_QUANTITY}</th>
                                            <th>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_TABLE_HEADER_UNIT_PRICE}</th>
                                            <th>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_TABLE_HEADER_TOTAL}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{raisedOrder.itemName}</td>
                                            <td>{raisedOrder.qty} {raisedOrder.uom}</td>
                                            <td>{ProcurementConstants.CURRENCY} {parseFloat(raisedOrder.unitPrice).toFixed(2)}</td>
                                            <td>{ProcurementConstants.CURRENCY} {parseFloat(raisedOrder.amount).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td><b>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_TABLE_GROSS_TOTAL}</b></td>
                                            <td style={{ color: (raisedOrder.amount > orderLimit) ? 'red' : 'black' }}><b>{ProcurementConstants.CURRENCY} {parseFloat(raisedOrder.amount).toFixed(2)}</b><br></br><p style={{ border: '1px solid', borderRadius: '2px', padding: '5px', background: '#ffc2c2', color: '#733030', display: (raisedOrder.amount > orderLimit) ? 'inline-block' : 'none' }}>
                                                {[ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_WARNING_MESSAGE]}
                                            </p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '68%' }}>
                                <b>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_ORDER_LIMIT}<b style={{ color: (raisedOrder.amount > orderLimit) ? 'red' : 'black' }}>{ProcurementConstants.CURRENCY} {parseFloat(ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_ORDER_LIMIT_VALUE).toFixed(2)}</b></b>
                            </div>
                            <div style={{ marginTop: '25px', marginBottom: '25px' }}>
                                <div>
                                    <b>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_REJECT_REASON}</b><input className="reject-reason-input" type="text" placeholder={ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_REJECT_REASON_HINT} onChange={(e) => { setRejectReason(e.target.value); }} />
                                </div>
                            </div>

                            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', width: '30%' }}>
                                <button className={`approve-button ${rejectReason.trim() !== '' ? 'disabled' : ''}`} disabled={rejectReason.trim() !== ''} onClick={approveOrder} style={{ display: (raisedOrder.amount > orderLimit) ? 'none' : '' }}>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_APPROVE_BUTTON}</button>
                                <button className={`reject-button ${rejectReason.trim() === '' ? 'disabled' : ''}`} disabled={rejectReason.trim() === ''} onClick={rejectOrder}>{ProcurementConstants.SINGLE_RAISED_ORDERS_PAGE_REJECT_BUTTON}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
