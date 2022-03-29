import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/Slices/User';

const Header = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { _id, name, isAdmin } = useSelector((state) => state.user.userInfo);

  const handleLogut = () => {
    dispatch(logoutUser());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>EL-Cart</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to={'/cart'}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>

              {_id && isAdmin && (
                <>
                  <NavDropdown title="Admin" id="Admin-dropdown">
                    <LinkContainer to={'/admin/userList'}>
                      <NavDropdown.Item>View Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/admin/productList'}>
                      <NavDropdown.Item>View Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/admin/orderList'}>
                      <NavDropdown.Item>View Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              )}
              {_id ? (
                <>
                  <NavDropdown title={name} id="profile-dropdown">
                    <LinkContainer to={'/profile'}>
                      <NavDropdown.Item>View Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogut}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to={'/login'}>
                  <Nav.Link>
                    <i className="fas fa-user" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
