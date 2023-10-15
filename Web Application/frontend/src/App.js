import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Test from './components/Test';
import DeliveryDetailsTable from './components/payment-settlement/POandDOdetails';
import PendingInvoices from './components/payment-settlement/PendingInvoices';
import DeliveryLogs from './components/payment-settlement/Deliver_LogsFile';
function App() {
  return (
    <Router>
      <Route path="/test" exact component={Test} />
      <Route path="/purchaseOrderPayment" exact component={ DeliveryDetailsTable }/>
      <Route path="/accountinghome/pendingInvoices" exact component={ PendingInvoices }/>
      <Route path="/accountinghome/deliveryLogs" exact component={ DeliveryLogs }/>
      
          </Router>
  );
}

export default App;
