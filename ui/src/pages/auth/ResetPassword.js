import { Button, Form, FormText, FormFeedback, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { isEmail } from '../../util/validators'

const ResetPassword = () => {

    const [text, setText] = useState('')
    const [valid, setValid] = useState(true)

    const handleChange = e => {
        setText(e.target.value)
    }

    const HandleResetPassword = () => {
        const isValid = isEmail(text)
        !isValid && setValid(false)
    }

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>ResetPassword</h1>
                    <FormText>we'll email you the new password to login</FormText>
                    {!valid && <Alert color="danger">incorrect email</Alert>}
                    <FormGroup className="mt-3">
                        <Label>email</Label>
                        <Input
                            type="email"
                            placeholder="email"
                            bsSize="lg"
                            name="email"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button block color="dark" size="lg" onClick={HandleResetPassword} className="mt-4">reset</Button>
                    <div className="text-center mt-3">
                        <Link to="/Login">back to login</Link>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default ResetPassword