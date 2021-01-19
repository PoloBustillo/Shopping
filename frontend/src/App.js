import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import MouseParticles from "react-mouse-particles";
import AnimatedCursor from "react-animated-cursor";
import ScrollToTop from "./components/ScrollToTop";
import { useIdleTimer } from "react-idle-timer";

const App = () => {
  const [showModal, setShowModal] = useState();
  const [isTimedOut, setIsTimedOut] = useState();

  const handleOnIdle = (e) => {
    console.log("user is idle", e);
    if (isTimedOut) {
      console.log("LOGOUT");
    } else {
      console.log("MODAL");
      setShowModal(true);
      reset();
      setIsTimedOut(true);
    }
  };

  const handleOnActive = (event) => {
    setIsTimedOut(false);
  };

  const handleOnAction = (e) => {
    setIsTimedOut(false);
  };

  const { getRemainingTime, getLastActiveTime, reset } = useIdleTimer({
    timeout: 5000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });
  return (
    <Router>
      <ScrollToTop>
        <MouseParticles
          g={2.3}
          num={1}
          radius={8}
          life={0.5}
          v={1.2}
          color={"random"}
          alpha={0.16}
          level={6}
          cull="navbar,pagination,col,fb-customerchat,alert,link,table,hamburger-react,navbar-toggler,navbar-collapse,navbar-brand,list-group-item,navbar-nav,form-control,form-group,btn,card,card-body,carousel"
        />
        <AnimatedCursor
          innerSize={12}
          outerSize={12}
          color="182,95,207"
          outerAlpha={0.2}
          innerScale={2}
          outerScale={5}
        />

        <Header />
        <main className="py-3">
          <Container>
            <Route path="/orden/:id" component={OrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/pago" component={PaymentScreen} />
            <Route path="/ordenes" component={PlaceOrderScreen} />
            <Route path="/acceder" component={LoginScreen} />
            <Route path="/registro" component={RegisterScreen} />
            <Route path="/perfil" component={ProfileScreen} />
            <Route path="/producto/:id" component={ProductScreen} />
            <Route path="/compras/:id?" component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/producto/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/busqueda/:keyword" component={HomeScreen} exact />
            <Route path="/pagina/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/busqueda/:keyword/pagina/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/" component={HomeScreen} exact />
          </Container>
        </main>

        <Footer />
      </ScrollToTop>
    </Router>
  );
};

export default App;
