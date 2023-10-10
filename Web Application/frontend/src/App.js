import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Test from "./components/Test";
import LoginSupplier from "./components/login_components/LoginSupplier";
import LoginStaffMember from "./components/login_components/LoginStaffMember";
import SupplierPendingOrders from "./components/supplier_components/PendingOrders";
import Invoices from "./components/supplier_components/Invoices";
import SupplierMyDeliveryLog from "./components/supplier_components/MyDeliveryLog";
import CreateDeliveryInvoice from "./components/supplier_components/CreateDeliveryInvoice";
import SupplierSingleInvoice from "./components/supplier_components/SingleInvoice";
import SupplierSingleDeliveryNote from "./components/supplier_components/SingleDeliveryNote";

function App() {
  return (
    <Router>
      <Route path="/test" exact component={Test} />
      <Route path="/" exact component={LoginStaffMember} />
      <Route path="/loginsupplier" exact component={LoginSupplier} />
      <Route
        path="/supplierhome/pendingorders"
        exact
        component={SupplierPendingOrders}
      />
      <Route
        path="/supplierhome/pendingorders/:pOrderId"
        exact
        component={CreateDeliveryInvoice}
      />
      <Route path="/supplierhome/invoices" exact component={Invoices} />
      <Route
        path="/supplierhome/invoices/:invoiceId"
        exact
        component={SupplierSingleInvoice}
      />
      <Route
        path="/supplierhome/mydeliverylog"
        exact
        component={SupplierMyDeliveryLog}
      />
      <Route
        path="/supplierhome/mydeliverylog/:deliveryId"
        exact
        component={SupplierSingleDeliveryNote}
      />
    </Router>
  );
}

export default App;
