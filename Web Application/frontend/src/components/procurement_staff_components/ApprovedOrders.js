import ProcurementConstants from "../../common/ProcurementStaffCommonConstants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillStarFill, BsMenuButtonWideFill, BsTriangle } from "react-icons/bs";
import Button from "react-bootstrap/Button";

export default function ApprovedOrders() {

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

    const [approvedOrders, setApprovedOrders] = useState([]);

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

    useEffect(() => {
        // set the current time
        setInterval(() => setCurrTime(new Date()), 1000);

        getEmployeeName();

        axios.get('http://localhost:8070/procurement/approved')
            .then((res) => {
                console.log(res.data);
                setApprovedOrders(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    return (
        <div>
            <div className="row" style={{ height: "100%" }}>
                {/* Left tab pane */}
                <div id="procurement-approved-orders-tab-pane" className="col-3" style={{ backgroundColor: "#b9bdba", height: "100vh" }}>
                    <div
                        id="procurement-approved-orders-label"
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
                        <b>{ProcurementConstants.APPROVED_ORDERS_PAGE_TITLE}</b>
                    </div>
                    <div id="procurement-approved-orders-profile-details" style={{ textAlign: "center", marginTop: "3%" }}>
                        <b>{employeeName}</b>
                        <br />
                        {ProcurementConstants.RAISED_ORDERS_USER_ROLE}
                    </div>
                    <div id="procurement-approved-orders-tabs" style={{ marginTop: "8%", fontSize: "150%", marginLeft: "10%" }}>
                        <div id="procurement-approved-orders-tabs-1" style={{ marginBottom: "30px" }}>
                            <a href="/procurementstaffhome/raisedorders/" style={{ textDecoration: "none" }}>
                                <BsFillStarFill
                                    style={{ marginBottom: "2%", marginRight: "5%", color: 'black' }}
                                />
                                <b style={{ color: "black" }}>{ProcurementConstants.RAISED_ORDERS_TAB1_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-approved-orders-tabs-2" style={{ marginBottom: "30px" }}>
                            <a href="#" style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "#3a7ae0"
                                    }}
                                />
                                <b style={{ color: "#3a7ae0" }}>{ProcurementConstants.RAISED_ORDERS_TAB2_NAME}</b>
                            </a>
                        </div>
                        <div id="procurement-approved-orders-tabs-3" style={{ marginBottom: "30px" }}>
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
                        <div id="procurement-approved-orders-tabs-4" style={{ marginBottom: "30px" }}>
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
                <div id="procurement-approved-orders-content" className="col" style={{ marginTop: "2%" }}>
                    <div id="procurement-approved-orders-top">
                        <div id="procurement-approved-orders-logout-button">
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
                        <div id="procurement-approved-orders-date-and-time"><b style={{ marginLeft: "10%" }}>{currTime.toLocaleTimeString()}</b>
                            <span style={{ marginLeft: "5%" }}>
                                {currTime.toLocaleDateString("en-US", dateFormatOptions)}
                            </span>
                        </div>
                    </div>
                    <div id="procurement-approved-orders-content-body" style={{ marginTop: "3%" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h2 style={{ margin: 0 }}>
                                <b>{ProcurementConstants.APPROVED_ORDERS_PAGE_PAGE_BODY_HEADING}</b>
                            </h2>
                            <form class="example" action="/action_page.php">
                                <input type="text" placeholder="Search.." name="search2" />
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div>

                        {approvedOrders.length === 0 && (
                            <center style={{ marginTop: "5%" }}>
                                <h2>{ProcurementConstants.RAISED_ORDERS_PAGE_PAGE_BODY_NO_ORDERS_MESSAGE}</h2>
                            </center>
                        )}

                        {approvedOrders.length !== 0 && (
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
                                    {approvedOrders.map((order) => (
                                        <tr key={order.pOrderId}>
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
