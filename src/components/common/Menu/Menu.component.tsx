import React from 'react';
import { connect } from "react-redux";
import store from '../../../store/configureStore';
import UserApi from "../../../apis/user-api/UserApi";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import logo from '../../../assets/images/icons8-gift-100.png';

const userApi = new UserApi(store);


class MenuComponent extends React.Component {
    render() {
        return (
            <>
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>
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
            return userApi.logout()
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);