import Header from "./components/Header";
import Home from "./pages/Home";
import Allproducts from "./pages/Allproducts";
import ProductDetail from "./components/ProductDetail.js";
import { Route, Switch, Redirect } from "react-router-dom";
import CartProvider from "./store/CartProvider";
import Cart from "./components/Cart";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import OrderPage from "./pages/OrderPage";

function App() {
  const authctx = useContext(AuthContext);
  return (
    <CartProvider>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/products" exact>
          <Allproducts />
        </Route>
        <Route path="/products/:id">
          <ProductDetail />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        {!authctx.loggedIn && (
          <Route path="/signup">
            <Signup />
          </Route>
        )}
        <Route path="/dashboard">
          {authctx.loggedIn && <Dashboard />}
          {!authctx.loggedIn && <Redirect to="/signup"></Redirect>}
        </Route>
        <Route path="/orderPage">
          {authctx.loggedIn && <OrderPage />}
          {!authctx.loggedIn && <Redirect to="/signup"></Redirect>}
        </Route>

        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </CartProvider>
  );
}

export default App;
