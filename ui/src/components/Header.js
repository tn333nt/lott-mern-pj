import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Collapse,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarBrand,
    NavbarText
} from 'reactstrap';
import { SiRiotgames } from 'react-icons/si';

import { handleLogout } from '../flux/slices/authSlice';

export const Header = props => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const isAuth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.auth.user)

    const handleLogOut = () => {
        dispatch(handleLogout())
        navigate('/Login')
    }


    return (
        <div >
            <Navbar color="light" expand="md" className="py-3" >
                {!user?.isAdmin && <NavbarBrand href="/" className="mx-5 fs-1"><SiRiotgames /></NavbarBrand>}
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="d-flex justify-content-between">
                    {isAuth ? <NavbarText className="nav-link fs-3 mx-5"> Welcome <i className="text-dark fs-1 mx-1"> {user?.username} </i></NavbarText> : <div></div>}
                    <Nav navbar>
                        {!user?.isAdmin ? (
                            <>
                                {!isAuth ? (
                                    <>
                                        <NavItem>
                                            <Link className="nav-link fs-3 px-5" to="/signup">Signup</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="nav-link fs-3 px-5" to="/login">Login</Link>
                                        </NavItem>
                                    </>
                                ) : (
                                    <>
                                        <NavItem>
                                            <Link className="nav-link fs-3 px-5" to="/account">Account</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Button className="nav-link fs-3 btn-light" onClick={handleLogOut}>Logout</Button>
                                        </NavItem>
                                    </>
                                )}
                            </>
                        ) : (

                            <UncontrolledDropdown nav inNavbar direction="down">
                                <DropdownToggle nav caret className="fs-3 px-5 mx-3">
                                    Management
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {((user && !user.isAdmin) || !isAuth) && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/">Check the ticket</Link>
                                        </DropdownItem>
                                    )}
                                    {user && user.isAdmin && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/results">Results</Link>
                                        </DropdownItem>
                                    )}
                                    {user && user.isAdmin && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/users">Users</Link>
                                        </DropdownItem>
                                    )}
                                    {user && user.isAdmin && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/switch">Switch</Link>
                                        </DropdownItem>
                                    )}

                                    <DropdownItem divider />
                                    {!isAuth && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/signup">Signup</Link>
                                        </DropdownItem>
                                    )}
                                    {!isAuth && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/login">Login</Link>
                                        </DropdownItem>
                                    )}
                                    {isAuth && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/account">Account</Link>
                                        </DropdownItem>
                                    )}
                                    {isAuth && (
                                        <DropdownItem>
                                            <Button className="nav-link fs-3" style={{ background: 'transparent', border: 'none' }} onClick={handleLogOut}>Logout</Button>
                                        </DropdownItem>
                                    )}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    )

}