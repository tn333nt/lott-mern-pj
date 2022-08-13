import { Button, Form, FormText, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { isEmail, length } from '../../util/validators'
import { handleLogin } from '../../flux/slices/authSlice';
import { setError, setMessage, setSuccess } from '../../flux/slices/ticketsSlice';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = useSelector(state => state.auth.token)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const [validated, setValidated] = useState('')

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

        if (name === 'email') {
            const isValidated = isEmail(value) && length({ min: 6, max: 30 })(value)
            if (isValidated) {
                setEmailErr("")
                setValidated('')
            } else {
                setEmailErr('incorrect email')
            }
            setEmail(value)
        }

        if (name === 'password') {
            const isValidated = length({ min: 6, max: 30 })(value)
            if (isValidated) {
                setPasswordErr("")
                setValidated('')
            } else {
                setPasswordErr("6 characters minimum")
            }
            setPassword(value)
        }
    }

    const HandleLogin = () => {
        const authData = {
            email: email,
            password: password,
            token: token
        }

        const filledAll = email !== '' && password !== ''
        if (filledAll) {
            setValidated('')
        } else {
            return setValidated('fill all input')
        }

        const validatedAll = emailErr === '' && passwordErr === ''
        if (validatedAll) {
            setValidated('')
        } else if (emailErr !== '') {
            return setValidated(emailErr)
        } else if (passwordErr !== '') {
            return setValidated(passwordErr)
        }


        if (validated === '') {
            dispatch(handleLogin(authData))
            // dispatch(setError())
            // dispatch(setSuccess())
            // dispatch(setMessage())
            navigate('/')
        }
    }

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>Login</h1>
                    {emailErr !== '' && <Alert color="danger">{emailErr}</Alert>}
                    {passwordErr !== '' && <Alert color="danger">{passwordErr}</Alert>}
                    <FormGroup className="mt-3">
                        <Label>email</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="email"
                            bsSize="lg"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label>password</Label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                            bsSize="lg"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button block
                        color="dark"
                        size="lg"
                        className="mt-4"
                        disabled={validated !== ''}
                        onClick={HandleLogin}
                    >
                        login
                    </Button>
                    <div className="text-center mt-3">
                        <FormText>forgot password ?</FormText>
                        <span> <Link to="/resetPassword">reset password</Link></span>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default Login