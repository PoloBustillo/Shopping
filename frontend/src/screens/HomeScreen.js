import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import Banner from "../components/Banner";
import ReactScrollDetect, { DetectSection } from "react-scroll-detect";
import MessengerCustomerChat from "react-messenger-customer-chat";

const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword;

  const [cur, handlePageChange] = React.useState(0);
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 1000);
    dispatch(listProducts());
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <MessengerCustomerChat
        pageId="103465814715253"
        appId="166707128047049"
        htmlRef="messengerRef"
        minimized={true}
        themeColor="#000000"
        loggedInGreeting="Hola, Bienvenido a Leolandia, estamos atento a cualquier duda, responderemos lo mas pronto posible"
        greetingDialogDisplay="fade"
        language="es_LA"
        shouldShowDialog={false}
        onCustomerChatDialogShow={(data) => {
          console.log("FB CHAT", data);
        }}
      />
      {!keyword ? (
        <ReactScrollDetect
          offset={-400}
          triggerPoint="center"
          onChange={handlePageChange}
        >
          <DetectSection>
            <section>
              <Banner></Banner>
            </section>
          </DetectSection>
          <DetectSection>
            <section>
              <ProductCarousel />
            </section>
          </DetectSection>
        </ReactScrollDetect>
      ) : (
        <Link to="/" className="btn btn-light">
          Atras
        </Link>
      )}
      {keyword ? (
        <h1 id="productTitle">{keyword}</h1>
      ) : (
        <h1 id="productTitle">Productos</h1>
      )}
      {loading ? (
        <Loader param={2} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col
                className="product"
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product history={history} product={product} />
              </Col>
            ))}
          </Row>

          <Paginate pages={1} page={1} keyword={keyword ? keyword : ""} />
        </>
      )}
      <div id="instagram-feed" className="instagram_feed"></div>
    </>
  );
};

export default HomeScreen;
