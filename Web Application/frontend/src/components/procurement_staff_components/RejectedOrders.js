import ProcurementConstants from "../../common/ProcurementStaffCommonConstants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillStarFill, BsMenuButtonWideFill, BsTriangle } from "react-icons/bs";
import Button from "react-bootstrap/Button";


export default function RejectedOrders() {
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

    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [rejectedOrdersForSearch, setRejectedOrdersForSearch] = useState([]);

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

    function searchRejectedOrders(orderId) {
        orderId = orderId.toUpperCase();
        setRejectedOrders(rejectedOrdersForSearch);

        if (orderId !== '') {
            const filteredOrders = rejectedOrdersForSearch.filter(order => order.pOrderId.includes(orderId));
            setRejectedOrders(filteredOrders);
        }
    }

    useEffect(() => {
        // set the current time
        setInterval(() => setCurrTime(new Date()), 1000);

        getEmployeeName();

        axios.get('http://localhost:8070/procurement/rejected')
            .then((res) => {
                console.log(res.data);
                setRejectedOrders(res.data);
                setRejectedOrdersForSearch(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    return (
        <div>
            <div className="row" style={{ height: "100%" }}>
                {/* Left tab pane */}
                <div id="procurement-rejected-orders-tab-pane" className="col-3" style={{ backgroundColor: "#b9bdba", height: "100vh" }}>
                    <div
                        id="procurement-rejected-orders-label"
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
                        <b>{ProcurementConstants.REJECTED_ORDERS_PAGE_TITLE}</b>
                    </div>
                    <div id="procurement-rejected-orders-profile-details" style={{ textAlign: "center", marginTop: "3%" }}>
                        <b>{employeeName}</b>
                        <br />
                        {ProcurementConstants.PROCUREMENT_STAFF_USER_ROLE}
                    </div>
                    <div id="procurement-rejected-orders-tabs" style={{ marginTop: "8%", fontSize: "150%", marginLeft: "10%" }}>
                        <div id="procurement-rejected-orders-tabs-1" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/raisedorders/" style={{ textDecoration: "none" }}>
                                <BsFillStarFill
                                    style={{ marginBottom: "2%", marginRight: "5%", color: 'black' }}
                                />
                                <b style={{ color: "black" }}>{ProcurementConstants.NAVIGATION_TAB1_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-rejected-orders-tabs-2" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/approvedorders/" style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black"
                                    }}
                                />
                                <b style={{ color: "black" }}>{ProcurementConstants.NAVIGATION_TAB2_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-rejected-orders-tabs-3" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/rejectedorders/" style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "#3a7ae0",
                                    }}
                                />
                                <b style={{ color: "#3a7ae0" }}>{ProcurementConstants.NAVIGATION_TAB3_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-rejected-orders-tabs-4" style={{ marginBottom: "30px" }}>
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
                <div id="procurement-rejected-orders-content" className="col" style={{ marginTop: "2%" }}>
                    <div id="procurement-rejected-orders-top">
                        <div id="procurement-rejected-orders-logout-button">
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
                        <div id="procurement-rejected-orders-date-and-time"><b style={{ marginLeft: "10%" }}>{currTime.toLocaleTimeString()}</b>
                            <span style={{ marginLeft: "5%" }}>
                                {currTime.toLocaleDateString("en-US", dateFormatOptions)}
                            </span>
                        </div>
                    </div>
                    <div id="procurement-rejected-orders-content-body" style={{ marginTop: "3%" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h2 style={{ margin: 0 }}>
                                <b>{ProcurementConstants.REJECTED_ORDERS_PAGE_PAGE_BODY_HEADING}</b>
                            </h2>
                            <div className="form-outline" style={{ marginRight: '65px', position: 'relative', display: 'flex' }}>
                                <button type="submit" className="search-button">
                                    <i className="fa fa-search"></i>
                                </button><input type="search" id="form1" className="form-control" placeholder="Search via PO ID" maxLength={7} onChange={(e) => { searchRejectedOrders(e.target.value) }} />
                            </div>
                        </div>


                        {rejectedOrders.length === 0 && (
                            <center style={{ marginTop: "5%" }}>
                                <h2>{ProcurementConstants.RAISED_ORDERS_PAGE_PAGE_BODY_NO_ORDERS_MESSAGE}</h2>
                            </center>
                        )}

                        {rejectedOrders.length !== 0 && (
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
                                        <th>{ProcurementConstants.TABLE_HEADER_PO_ID}</th>
                                        <th>{ProcurementConstants.TABLE_HEADER_ITEM_CODE}</th>
                                        <th>{ProcurementConstants.TABLE_HEADER_ITEM_NAME}</th>
                                        <th>{ProcurementConstants.TABLE_HEADER_QUANTITY}</th>
                                        <th>{ProcurementConstants.TABLE_HEADER_UNIT_PRICE}</th>
                                        <th>{ProcurementConstants.TABLE_HEADER_REJECT_REASON}</th>
                                        <th>{ProcurementConstants.TABLE_HEADER_DATE}</th>
                                        <th>{ProcurementConstants.TABLE_HEADER_SITE}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rejectedOrders.map((order) => (
                                        <tr key={order.pOrderId}>
                                            <td>{order.pOrderId}</td>
                                            <td>{order.itemCode}</td>
                                            <td>{order.itemName}</td>
                                            <td>{order.qty} {order.uom}</td>
                                            <td>{ProcurementConstants.CURRENCY} {parseFloat(order.unitPrice).toFixed(2)}</td>
                                            <td style={{ wordWrap: 'break-word', maxWidth: '210px' }}>{order.rejectReason}</td>
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
