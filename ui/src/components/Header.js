import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Collapse,
    NavLink
} from 'reactstrap';

export const Header = props => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <div >
            <Navbar color="light" expand="md" className="py-3" >
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="d-flex justify-content-between">
                    <Nav navbar>
                        <NavItem>
                            <Link className="nav-link fs-3 px-5" to="/">home</Link>
                        </NavItem>
                        {/* <NavItem>
                            <Link className="nav-link fs-3 px-5" to="/results">results</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link fs-3 px-5" to="/users">users</Link>
                        </NavItem> */}
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <Link className="nav-link fs-3 px-5" to="/signup">signup</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link fs-3 px-5" to="/login">login</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link fs-3 px-5" to="/account">account</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link fs-3 px-5" to="/logout">logout</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )

}