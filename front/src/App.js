import React, { useState } from 'react';
import ProductList from'./Components/ProductList/ProductList.js';
import ProductDetail from './Components/ProductDetail/ProductDetail.js'
import { ProductProvider } from '../../front/src/Components/Contexts/ProductContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [productId, setProductId] = useState({})
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <ProductProvider value={{ productId, setProductId }}>
              <ProductList />
            </ProductProvider>
          </Route>
          <Route exact path="/productDetail">
              <ProductProvider value={{ ...productId, setProductId }}>
                <ProductDetail />
              </ProductProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
