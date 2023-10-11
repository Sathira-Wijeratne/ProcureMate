import ProcurementConstants from "../../common/ProcurementStaffCommonConstants";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    },[]);

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
                        <b>{ProcurementConstants.RAISED_ORDERS_TITLE}</b>
                    </div>
                    <div id="procurement-raised-orders-profile-details" style={{ textAlign: "center", marginTop: "3%" }}>
                        <b>{employeeName}</b>
                        <br />
                        {ProcurementConstants.RAISED_ORDERS_USER_ROLE}
                    </div>
                </div>
            </div>
        </div>
    )
}