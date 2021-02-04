import logo from './logo.svg';
import './App.css';
import ProductList from'./Components/ProductList/ProductList.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <ProductList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
