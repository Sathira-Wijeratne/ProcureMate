import ProcurementConstants from "../../common/ProcurementStaffCommonConstants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillStarFill, BsMenuButtonWideFill } from "react-icons/bs";

export default function RaisedOrders() {
    if (sessionStorage.getItem("prMateTnemerucorp") === null) {
        window.location.replace('/');
    }

    const employeeEmail = sessionStorage.getItem("staffEmail");
    const [employeeName, setEmployeeName] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8070/procurement/get/staff/member/name/${employeeEmail}`)
            .then((res) => {
                console.log(res.data[0].name);
                setEmployeeName(res.data[0].name);
            })
    }, []);

    return (
        <div>
            <div className="row" style={{ height: "100%" }}>
                <div className="col-3" style={{ backgroundColor: "#b9bdba", height: "100vh" }}>
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
                        <div id="procurement-raised-orders-tabs-1" style={{marginBottom: "30px"}}>
                            <a style={{ textDecoration: "none" }}>
                                <BsFillStarFill
                                    style={{ marginBottom: "2%", marginRight: "5%", color: "#3a7ae0" }}
                                />
                            </a>
                            <b style={{ color: "#3a7ae0" }}>{ProcurementConstants.RAISED_ORDERS_TAB1_NAME}</b>
                        </div>
                        <div id="procurement-raised-orders-tabs-2" style={{marginBottom: "30px"}}>
                            <a style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black",
                                    }}
                                />
                            </a>
                            <b>{ProcurementConstants.RAISED_ORDERS_TAB2_NAME}</b>
                        </div>
                        <div id="procurement-raised-orders-tabs-2" style={{marginBottom: "30px"}}>
                            <a style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black",
                                    }}
                                />
                            </a>
                            <b>{ProcurementConstants.RAISED_ORDERS_TAB3_NAME}</b>
                        </div>
                        <div id="procurement-raised-orders-tabs-2" style={{marginBottom: "30px"}}>
                            <a style={{ textDecoration: "none" }}>
                                <BsMenuButtonWideFill
                                    style={{
                                        marginBottom: "1%",
                                        marginRight: "5%",
                                        color: "black",
                                    }}
                                />
                            </a>
                            <b>{ProcurementConstants.RAISED_ORDERS_TAB4_NAME}</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}