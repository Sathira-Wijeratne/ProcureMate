import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Test from "./components/Test";
import LoginSupplier from "./components/login_components/LoginSupplier";
import LoginStaffMember from "./components/login_components/LoginStaffMember";
import SupplierPendingOrders from "./components/supplier_components/PendingOrders";

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
    </Router>
  );
}

export default App;
