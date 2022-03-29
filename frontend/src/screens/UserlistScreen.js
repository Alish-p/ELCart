import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Container,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { fetchUsers, deleteUser } from '../redux/Slices/UserList';
import { LinkContainer } from 'react-router-bootstrap';

const UserlistScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isAdmin } = useSelector((state) => state.user.userInfo);

  const users = useSelector((state) => state.userList.users);
  const loading = useSelector((state) => state.userList.loading);
  const error = useSelector((state) => state.userList.error);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (!isAdmin) {
    Navigate('/');
  }

  return (
    <>
      <Container>
        <h2>Users</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fa fa-check" style={{ color: 'green' }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => {
                        deleteHandler(user._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default UserlistScreen;
