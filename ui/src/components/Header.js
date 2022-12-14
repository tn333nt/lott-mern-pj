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

import { handleLogout, toggleIsAdmin, toggleSwitching } from '../flux/slices/authSlice';

export const Header = props => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    // why does it toggle twice ?

    const { isAuth, user, isSwitched } = useSelector(state => state.auth)

    const handleLogOut = () => {
        dispatch(handleLogout())

        dispatch(toggleIsAdmin(false))
        dispatch(toggleSwitching(false))

        navigate('/login')
    }

    const handleSwitchRole = () => {
        dispatch(toggleIsAdmin())
        dispatch(toggleSwitching())
    }

    return (
        <div >
            <Navbar color="light" expand="md" className="py-3" inverse="true" toggleable="true" >
                {(!user?.isAdmin || isSwitched) && (
                    <NavbarBrand href="/" className="mx-md-5 fs-1 d-flex align-items-center gap-1">
                        <SiRiotgames />
                        {!isAuth && (
                            <Nav navbar>
                                <Link className="nav-link fs-3" to="/">Check the ticket</Link>
                            </Nav>
                        )}
                    </NavbarBrand>
                )}
                <NavbarToggler right="true" onClick={toggle} />
                <Collapse
                    isOpen={isOpen}
                    navbar
                    className="d-flex justify-content-between flex-wrap-sm flex-wrap"
                >
                    {isAuth ? (
                        <NavbarText className="nav-link fs-3 px-md-3">
                            Welcome <i className="text-dark fs-1 mx-1"> {user?.username} </i>
                        </NavbarText>
                    ) : (
                        <div></div>
                    )}

                    <Nav navbar>
                        {!isAuth && (
                            <>
                                <NavItem>
                                    <Link className="nav-link fs-3 px-md-5" to="/signup">Signup</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link fs-3 px-md-5" to="/login">Login</Link>
                                </NavItem>
                            </>
                        )}

                        {isAuth && (
                            <>
                                {!isSwitched && user.isAdmin && (
                                    <UncontrolledDropdown nav inNavbar direction="down" >
                                        <DropdownToggle nav caret className="fs-3 px-md-5 mx-md-3">
                                            Management
                                        </DropdownToggle>
                                        <DropdownMenu >
                                            <DropdownItem>
                                                <Link className="nav-link fs-3" to="/results">Results</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link className="nav-link fs-3" to="/users">Users</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Button
                                                    className="nav-link fs-3"
                                                    style={{ background: 'transparent', border: 'none' }}
                                                    onClick={handleSwitchRole}
                                                >
                                                    Switch User
                                                </Button>
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                <Link className="nav-link fs-3" to="/account">Account</Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Button
                                                    className="nav-link fs-3"
                                                    style={{ background: 'transparent', border: 'none' }}
                                                    onClick={handleLogOut}
                                                >
                                                    Logout
                                                </Button>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )}

                                {(!user.isAdmin) && (
                                    <>
                                        <NavItem>
                                            <Link className="nav-link fs-3 px-md-5" to="/account">Account</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Button
                                                className="nav-link fs-3 px-md-5 btn-light"
                                                onClick={handleLogOut}
                                            >
                                                Logout</Button>
                                        </NavItem>
                                    </>
                                )}

                                {user.isAdmin && isSwitched && (
                                    <NavItem>
                                        <Button
                                            className="nav-link fs-3 px-md-5 btn-light"
                                            onClick={handleSwitchRole}
                                        >
                                            Switch Admin
                                        </Button>
                                    </NavItem>
                                )}
                            </>
                        )}

                    </Nav>

                </Collapse>
            </Navbar>
        </div >
    )

}