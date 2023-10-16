import ProcurementConstants from "../../common/ProcurementStaffCommonConstants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillStarFill, BsMenuButtonWideFill, BsTriangle } from "react-icons/bs";
import Button from "react-bootstrap/Button";

export default function RaisedOrders() {
    // check whether the user is logged in
    if (sessionStorage.getItem("prMateTnemerucorp") === null) {
        window.location.replace('/');
    }

    const employeeEmail = sessionStorage.getItem("staffEmail");
    const [employeeName, setEmployeeName] = useState();

    const [currTime, setCurrTime] = useState(new Date());
    const dateFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    const [raisedOrders, setRaisedOrders] = useState([]);
    const [raisedOrdersForSearch, setRaisedOrdersForSearch] = useState([]);

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

    function fetchSpecificRaisedOrder(pOrderId, location) {
        pOrderId = pOrderId.substring(1); // remove the first character (#) from the order id
        window.location.replace(`/procurementstaffhome/raisedorders/get/${pOrderId}/${location}`);
    }

    function searchApprovedOrders(orderId) {
        orderId = orderId.toUpperCase();
        setRaisedOrders(raisedOrdersForSearch);

        if (orderId !== '') {
            const filteredOrders = raisedOrdersForSearch.filter(order => order.pOrderId.includes(orderId));
            setRaisedOrders(filteredOrders);
        }
    }

    useEffect(() => {
        // set the current time
        setInterval(() => setCurrTime(new Date()), 1000);

        getEmployeeName();

        axios.get('http://localhost:8070/procurement/')
            .then((res) => {
                console.log(res.data);
                setRaisedOrders(res.data);
                setRaisedOrdersForSearch(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
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
                        {ProcurementConstants.RAISED_ORDERS_USER_ROLE}
                    </div>
                    <div id="procurement-raised-orders-tabs" style={{ marginTop: "8%", fontSize: "150%", marginLeft: "10%" }}>
                        <div id="procurement-raised-orders-tabs-1" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/raisedorders/" style={{ textDecoration: "none" }}>
                                <BsFillStarFill
                                    style={{ marginBottom: "2%", marginRight: "5%", color: "#3a7ae0" }}
                                />
                                <b style={{ color: "#3a7ae0" }}>{ProcurementConstants.RAISED_ORDERS_TAB1_NAME}</b>
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
                                <b style={{ color: "black" }}>{ProcurementConstants.RAISED_ORDERS_TAB2_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-raised-orders-tabs-3" style={{ marginBottom: "30px" }}>
                            <a href="#" style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black",
                                    }}
                                />
                                <b style={{ color: "black" }}>{ProcurementConstants.RAISED_ORDERS_TAB3_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-raised-orders-tabs-4" style={{ marginBottom: "30px" }}>
                            <a href="#" style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black",
                                    }}
                                />
                                <b style={{ color: "black" }}>{ProcurementConstants.RAISED_ORDERS_TAB4_NAME}</b>
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
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h2><b>{ProcurementConstants.RAISED_ORDERS_PAGE_PAGE_BODY_HEADING}</b></h2>
                            <div className="form-outline" style={{ marginRight: '65px', position: 'relative', display: 'flex' }}>
                                <button type="submit" className="search-button">
                                    <i className="fa fa-search"></i>
                                </button><input type="search" id="form1" className="form-control" placeholder="Search via PO ID" maxLength={7} onChange={(e) => { searchApprovedOrders(e.target.value) }} />
                            </div>
                        </div>
                        {raisedOrders.length === 0 && (
                            <center style={{ marginTop: "5%" }}>
                                <h2>{ProcurementConstants.RAISED_ORDERS_PAGE_PAGE_BODY_NO_ORDERS_MESSAGE}</h2>
                            </center>
                        )}

                        {raisedOrders.length !== 0 && (
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
                                        <th>{ProcurementConstants.RAISED_ORDERS_TABLE_HEADER_PO_ID}</th>
                                        <th>{ProcurementConstants.RAISED_ORDERS_TABLE_HEADER_ITEM_CODE}</th>
                                        <th>{ProcurementConstants.RAISED_ORDERS_TABLE_HEADER_ITEM_NAME}</th>
                                        <th>{ProcurementConstants.RAISED_ORDERS_TABLE_HEADER_QUANTITY}</th>
                                        <th>{ProcurementConstants.RAISED_ORDERS_TABLE_HEADER_UNIT_PRICE}</th>
                                        <th>{ProcurementConstants.RAISED_ORDERS_TABLE_HEADER_DATE}</th>
                                        <th>{ProcurementConstants.RAISED_ORDERS_TABLE_HEADER_SITE}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {raisedOrders.map((order) => (
                                        <tr className="raised-orders-table-row-hover" key={order.pOrderId} onClick={() => fetchSpecificRaisedOrder(order.pOrderId, order.location)}>
                                            <td>{order.pOrderId}</td>
                                            <td>{order.itemCode}</td>
                                            <td>{order.itemName}</td>
                                            <td>{order.qty} {order.uom}</td>
                                            <td>{ProcurementConstants.CURRENCY} {parseFloat(order.unitPrice).toFixed(2)}</td>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>{order.siteId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}