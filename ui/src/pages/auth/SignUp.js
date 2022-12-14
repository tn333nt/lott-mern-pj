import { Button, Form, FormText, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { handleSingup, setAuthError } from '../../flux/slices/authSlice';

const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const error = useSelector(state => state.auth.error)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUserName] = useState('')

    const handleChange = e => {
        e.preventDefault()
        const { name, value } = e.target

        if (name === 'email') {
            setEmail(value)
        }

        if (name === 'password') {
            setPassword(value)
        }

        if (name === 'confirmPassword') {
            setConfirmPassword(value)
        }

        if (name === 'username') {
            setUserName(value)
        }
    }


    const HandleSubmit = async () => {
        const authData = {
            email,
            password,
            confirmPassword,
            username
        }

        const data = await dispatch(handleSingup(authData))
        if (!data.error) {
            dispatch(setAuthError())
            navigate('/login')
        }

    }

    return (
        <div className="container py-5 mw-100 d-flex justify-content-center mb-5">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form >
                    <h1>Sign Up</h1>
                    {error !== '' && <Alert color="danger">{error}</Alert>}
                    <FormGroup className="mt-3">
                        <Label>Username</Label>
                        <Input
                            name="username"
                            type="text"
                            placeholder="username"
                            bsSize="lg"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label>Email</Label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="email"
                            bsSize="lg"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    {/* later : option 'use email as username */}

                    <FormGroup className="mt-3">
                        <Label>Password</Label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                            bsSize="lg"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <Label>Confirm password</Label>
                        <Input
                            name="confirmPassword"
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
                        onClick={HandleSubmit}
                    >
                        Sign Up
                    </Button>
                    <div className="text-center mt-4">
                        <FormText>Already have an account ?</FormText>
                        <span> <Link to="/login"> Login</Link></span>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default SignUp