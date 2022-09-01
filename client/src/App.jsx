import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pay from "./reactStripe/Pay";
import Success from "./reactStripe/Success";

const App = () => {
  return (
    <Routes>
      <Route path="/pay" element={<Pay />} />
      <Route path="/success" element={<Success />} />
      {/* <Home /> */}
      {/* <ProductList /> */}
      {/* <Product /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Cart /> */}
    </Routes>
  );
};

export default App;
