import { Button, Form, FormText, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { setLoginInput, handleLogin, setAuthError, toggleIsAdmin } from '../../flux/slices/authSlice';
import { setCheckingError, setCheckingFail, setCheckingMessage, setCheckingSuccess, setIndexes, setTicket } from '../../flux/slices/ticketsSlice';
import { setPickedResult } from '../../flux/slices/resultsSlice';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { token, loginInput, error } = useSelector(state => state.auth)

    // set valid input's value without changing text
    const [email, setEmail] = useState(loginInput.email)
    const [password, setPassword] = useState(loginInput.password)

    const handleChange = e => {
        const { name, value } = e.target

        if (name === 'email') {
            setEmail(value)
        }

        if (name === 'password') {
            setPassword(value)
        }

        dispatch(setLoginInput({
            [name]: value
        }))
    }


    const HandleSubmit = async () => {
        const authData = {
            email: email,
            password: password,
            token: token
        }

        const data = await dispatch(handleLogin(authData))
        if (!data.error) {
            dispatch(setAuthError())
            dispatch(setLoginInput())
            
            navigate('/')
        }
    }

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>Login</h1>
                    {error !== '' && <Alert color="danger">{error}</Alert>}
                    <FormGroup className="mt-3">
                        <Label>Email</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="email"
                            bsSize="lg"
                            value={loginInput.email} // keep user after signup
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label>Password</Label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                            bsSize="lg"
                            value={loginInput.password}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button block
                        color="dark"
                        size="lg"
                        className="mt-4"
                        onClick={HandleSubmit}
                    >
                        Login
                    </Button>
                    <div className="text-center mt-3">
                        <FormText>Forgot password ?</FormText>
                        <span> <Link to="/resetPassword">Reset password</Link></span>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default Login