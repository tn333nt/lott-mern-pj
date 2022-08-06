import { Button, Form, FormText, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { isEmail, length } from '../../util/validators'

const Login = () => {

    const [text, setText] = useState('')
    const [validated, setValidated] = useState('')

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

        setText(e.target.value)

        if (name === 'email') {
            const isValidated = isEmail(value)
            !isValidated && setValidated('incorrect email')
            isValidated && setValidated('')
        }

        if (name === 'password') {
            const isValidated = length({ min: 6, max: 30 })(value)
            !isValidated && setValidated("6 characters minimum")
            isValidated && setValidated("")
        }
    }

    const HandleLogin = () => {
        const isValid = isEmail(text)
        // !isValid && setValidated(false)
    }

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>Login</h1>
                    {validated !== '' && <Alert color="danger">{validated}</Alert>}
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
                        disabled={validated !== '' ? true : false}
                        onClick={HandleLogin}
                    >
                        login
                    </Button>
                    <div className="text-center mt-3">
                        <FormText>forgot password ?</FormText>
                        <span> <Link to="/ResetPassword">reset password</Link></span>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default Login