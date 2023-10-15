import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Test from './components/Test';
import DeliveryDetailsTable from './components/payment-settlement/POandDOdetails';
import PendingInvoices from './components/payment-settlement/PendingInvoices';
function App() {
  return (
    <Router>
      <Route path="/test" exact component={Test} />
      <Route path="/purchaseOrderPayment" exact component={ DeliveryDetailsTable }/>
      <Route path="/pendingInvoices" exact component={ PendingInvoices }/>
          </Router>
  );
}

export default App;
