import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Test from "./components/Test";
import LoginSupplier from "./components/login_components/LoginSupplier";
import LoginStaffMember from "./components/login_components/LoginStaffMember";

function App() {
  return (
    <Router>
      <Route path="/test" exact component={Test} />
      <Route path="/" exact component={LoginStaffMember} />
      <Route path="/loginsupplier" exact component={LoginSupplier} />
    </Router>
  );
}

export default App;
