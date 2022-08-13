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
    Button
} from 'reactstrap';
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
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="d-flex justify-content-between">
                    <Nav navbar>
                        {((user && !user.isAdmin) || !isAuth) && (
                            <NavItem>
                                <Link className="nav-link fs-3 px-5" to="/">home</Link>
                            </NavItem>
                        )}

                        {user && user.isAdmin && (
                            <>
                                <NavItem>
                                    <Link className="nav-link fs-3 px-5" to="/results">results</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link fs-3 px-5" to="/users">users</Link>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                    <Nav navbar>
                        {!isAuth ? (
                            <>
                                <NavItem>
                                    <Link className="nav-link fs-3 px-5" to="/signup">signup</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link fs-3 px-5" to="/login">login</Link>
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem>
                                    <Link className="nav-link fs-3 px-5" to="/account">account</Link>
                                </NavItem>
                                <NavItem>
                                    <Button className="nav-link fs-3 px-5 btn-light" onClick={handleLogOut}>logout</Button>
                                </NavItem>
                            </>
                        )}

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )

}