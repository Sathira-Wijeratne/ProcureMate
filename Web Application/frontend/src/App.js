import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Test from './components/Test';

function App() {
  return (
    <Router>
      <Route path="/test" exact component={Test} />
    </Router>
  );
}

export default App;
