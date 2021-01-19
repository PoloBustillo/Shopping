import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const [show, setShow] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/acceder");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = () => {
    dispatch(deleteUser(userToBeDeleted._id));
    setShow(false);
    setUserToBeDeleted(null);
  };

  return (
    <>
      {userToBeDeleted && (
        <Alert
          show={show}
          onClose={() => {
            setShow(false);
            setUserToBeDeleted(null);
          }}
          dismissible
          variant="light"
        >
          <Alert.Heading>
            Seguro que quiere eliminar usuario {userToBeDeleted.name}?
          </Alert.Heading>
          <p>Los cambios que realize no eliminaran sus ordenes!!</p>{" "}
          <p>No podra recuperar el usuario!!</p>
          <p> Realize esta accion solo si esta SEGURO!!!</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              style={{ marginRight: "10%" }}
              onClick={() => deleteHandler()}
              variant="outline-success"
            >
              Confirmar
            </Button>
            <Button onClick={() => setShow(false)} variant="outline-danger">
              Cancelar
            </Button>
          </div>
        </Alert>
      )}
      <h1>Usuarios</h1>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>USUARIO</th>
              <th>EMAIL</th>
              <th>TELEFONO</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {users.map((user) => {
              const tdAdmin =
                user._id !== userInfo._id ? (
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        setUserToBeDeleted(user);
                        setShow(true);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                ) : (
                  <td>
                    {" "}
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                  </td>
                );
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.userName}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.phone}</td>
                  <td style={{ textAlign: "center" }}>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  {tdAdmin}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
