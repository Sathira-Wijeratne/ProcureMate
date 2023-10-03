import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Test from "./components/Test";
import LoginSupplier from "./components/Logins/LoginSupplier";

function App() {
  return (
    <Router>
      <Route path="/test" exact component={Test} />
      <Route path="/loginsupplier" exact component={LoginSupplier} />
    </Router>
  );
}

export default App;
