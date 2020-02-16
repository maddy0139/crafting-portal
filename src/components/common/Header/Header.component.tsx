import React from 'react';
import { connect } from 'react-redux';
import store from '../../../store/configureStore';
import UserApi from '../../../apis/user-api/UserApi';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import logo from '../../../assets/images/icons8-gift-100.png';

const userApi = new UserApi(store);

interface IHeaderProps {
  userInformation: any;
  logout: any;
}

class HeaderComponent extends React.Component<IHeaderProps, {}> {
  constructor(props: IHeaderProps) {
    super(props);
    this.logoutClickHandler = this.logoutClickHandler.bind(this);
  }
  logoutClickHandler(e: React.MouseEvent) {
    this.props.logout();
  }
  onNavDropDownSelect() {}
  render() {
    const { userInformation } = this.props;
    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="primary"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand as={Link} to="/home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Feelings Throught Crafting
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            {userInformation && (
              <Nav className="mr-auto">
                <NavDropdown
                  title={`${userInformation.firstName} ${
                    userInformation.lastName
                  }`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/home">
                    Home
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    onClick={(e: any) => this.logoutClickHandler(e)}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link />
              </Nav>
            )}
            {!userInformation && (
              <Nav>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} eventKey={2} to="/signup">
                  Signup
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    userInformation: userApi.getUserDetails()
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    logout: () => {
      return userApi.logout();
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);
