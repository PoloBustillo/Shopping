import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showMessageProfile, setShowMessageProfile] = useState(true);
  const [showMessageOrders, setShowMessageOrders] = useState(true);
  const [showMessageSuccess, setShowMessageSuccess] = useState(true);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, errorProfile } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const handleShowMessageProfileParent = (value) => {
    setShowMessageProfile(value);
  };
  const handleShowMessageOrdersParent = (value) => {
    setShowMessageOrders(value);
  };
  const handleShowMessageSuccessParent = (value) => {
    setShowMessageSuccess(value);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/acceder");
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPhone(userInfo.phone);
        setUserName(userInfo.userName);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      handleShowMessageProfileParent(true);
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          userName,
          email,
          phone,
          password,
        })
      );
      handleShowMessageSuccessParent(true);
    }
  };

  return (
    <Row>
      <Col md={3}>
        {message && (
          <Message
            showDefault={showMessageProfile}
            handleShow={handleShowMessageProfileParent}
            dismissible={true}
            variant="danger"
          >
            {message}
          </Message>
        )}
        {errorProfile && (
          <Message showDefault={true} variant="danger">
            {errorProfile}
          </Message>
        )}
        {success && (
          <Message
            showDefault={showMessageSuccess}
            handleShow={handleShowMessageSuccessParent}
            dismissible={true}
            variant="success"
          >
            Perfil Actualizado
          </Message>
        )}
        {loading ? (
          <Loader loading={loading} />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <h2>{`Bienvenido ${success ? userInfo.name : user.name}!!!`}</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Introduzca nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="userName">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="userName"
                  placeholder="Introduzca usuario"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Introduzca telefono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <EmailInput email={email} setEmailParent={setEmail}></EmailInput>
              <PasswordInput
                password={password}
                setPasswordParent={setPassword}
                label="Nueva Contraseña"
                autoComplete="new-password"
              ></PasswordInput>
              <PasswordInput
                password={confirmPassword}
                setPasswordParent={setConfirmPassword}
                placeholder="Confirma contraseña"
                label="Confirma Contraseña"
                autoComplete="new-password"
              ></PasswordInput>

              <Button type="submit" variant="primary">
                Actualizar Info
              </Button>
            </Form>{" "}
          </>
        )}
      </Col>
      <Col md={9}>
        <h2>Mis Pedidos</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message
            showDefault={showMessageOrders}
            handleShow={handleShowMessageOrdersParent}
            dismissible={true}
            variant="danger"
          >
            {errorOrders}
          </Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>FECHA</th>
                <th>TOTAL</th>
                <th>PAGADA</th>
                <th>ENTREGADA</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td style={{ textAlign: "center" }}>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orden/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Detalles
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
