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
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    // why does it toggle twice ?

    const { isAuth, user } = useSelector(state => state.auth)

    const handleLogOut = () => {
        dispatch(handleLogout())
        navigate('/login')
    }


    return (
        <div >
            <Navbar color="light" expand="md" className="py-3" inverse="true" toggleable="true" >
                {!user?.isAdmin && (
                    <NavbarBrand href="/" className="mx-md-5 fs-1">
                        <SiRiotgames />
                    </NavbarBrand>
                )}
                <NavbarToggler right onClick={toggle} />
                <Collapse
                    isOpen={isOpen}
                    navbar
                    className="d-flex justify-content-between flex-wrap-sm flex-wrap"
                >
                    {isAuth ? (
                        <NavbarText className="nav-link fs-3 px-md-5">
                            Welcome <i className="text-dark fs-1 mx-1"> {user?.username} </i>
                        </NavbarText>
                    ) : (
                        <div></div>
                    )}

                    <Nav navbar>
                        {!user?.isAdmin ? (
                            <>
                                {!isAuth ? (
                                    <>
                                        <NavItem>
                                            <Link className="nav-link fs-3 px-md-5" to="/signup">Signup</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="nav-link fs-3 px-md-5" to="/login">Login</Link>
                                        </NavItem>
                                    </>
                                ) : (
                                    <>
                                        <NavItem>
                                            <Link className="nav-link fs-3 px-md-5" to="/account">Account</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Button className="nav-link fs-3 px-md-5 btn-light" onClick={handleLogOut}>Logout</Button>
                                        </NavItem>
                                    </>
                                )}
                            </>
                        ) : (

                            <UncontrolledDropdown nav inNavbar direction="down" >
                                <DropdownToggle nav caret className="fs-3 px-md-5 mx-md-3">
                                    Management
                                </DropdownToggle>
                                <DropdownMenu >
                                    {/* vi htai co them case !isAuth && user */}
                                    {((isAuth && user && !user.isAdmin) || !isAuth) && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/">Check the ticket</Link>
                                        </DropdownItem>
                                    )}
                                    {isAuth && user && user.isAdmin && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/results">Results</Link>
                                        </DropdownItem>
                                    )}
                                    {isAuth && user && user.isAdmin && (
                                        <DropdownItem>
                                            <Link className="nav-link fs-3" to="/users">Users</Link>
                                        </DropdownItem>
                                    )}
                                    {isAuth && user && user.isAdmin && (
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