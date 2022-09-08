import { Routes, Route, Navigate } from "react-router-dom";
import "./app.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

const App = () => {
  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser.isAdmin;

  return (
    <>
      {admin && <Topbar />}
      <div className="container">
        {admin && <Sidebar />}
        <Routes>
          {!admin ? (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={admin ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/users"
                element={admin ? <UserList /> : <Navigate to="/login" />}
              />
              <Route
                path="/user/:userId"
                element={admin ? <User /> : <Navigate to="/login" />}
              />
              <Route
                path="/newUser"
                element={admin ? <NewUser /> : <Navigate to="/login" />}
              />
              <Route
                path="/products"
                element={admin ? <ProductList /> : <Navigate to="/login" />}
              />
              <Route
                path="/product/:productId"
                element={admin ? <Product /> : <Navigate to="/login" />}
              />
              <Route
                path="/newproduct"
                element={admin ? <NewProduct /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;
