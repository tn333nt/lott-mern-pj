import { Button, Form, FormText, FormFeedback, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { isEmail, length, isNonAlphabetic } from '../../util/validators'

const SignUp = () => {

    const [text, setText] = useState('')
    const [validated, setValidated] = useState('')

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

        setText(e.target.value)

        if (name === 'email') {
            const isValidated = isEmail(value) && length({ min: 6, max: 30 })(value)
            !isValidated && setValidated('incorrect email')
            isValidated && setValidated('')
        }

        if (name === 'password') {
            const isValidated = length({ min: 6, max: 30 })(value)
            !isValidated && setValidated("6 characters minimum")
            isValidated && setValidated("")
        }

        if (name === 'mobile') {
            const isValidated = isNonAlphabetic(value) && length({ min: 6, max: 15 })(value)
            !isValidated && setValidated('incorrect mobile')
            isValidated && setValidated("")
        }
    }

    const HandleSignup = () => { }

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>SignUp</h1>
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
                    <FormGroup className="mt-3">
                        <Label>mobile</Label>
                        <Input
                            name="mobile"
                            type="mobile"
                            placeholder="mobile"
                            bsSize="lg"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button block
                        color="dark"
                        size="lg"
                        className="mt-4"
                        disabled={validated !== '' ? true : false}
                        onClick={HandleSignup}
                    >
                        SignUp
                    </Button>
                    <div className="text-center mt-4">
                        <FormText>already have an account ?</FormText>
                        <span> <Link to="/Login"> login</Link></span>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default SignUp