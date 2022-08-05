import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody,
    Collapse
} from 'reactstrap';

export const Header = props => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div >
            <Navbar color="light" expand="md" className="py-3" >
                <NavbarToggler  onClick={toggle} />
                {/* <Offcanvas toggle={isOpen} navbar > */}
                <Collapse isOpen={isOpen} navbar>
                    {/* <OffcanvasHeader toggle={toggle}>
                        header
                    </OffcanvasHeader> */}
                    {/* <OffcanvasBody> */}
                        <Nav navbar>
                            <NavItem>
                                <Link className="nav-link fs-3 px-5" to="/results">results</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link fs-3 px-5" to="/users">users</Link>
                            </NavItem>
                        </Nav>
                    {/* </OffcanvasBody> */}
                {/* </Offcanvas> */}
                </Collapse>
            </Navbar>
        </div>
    )

}