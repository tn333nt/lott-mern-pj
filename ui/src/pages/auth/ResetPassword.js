import { Button, Form, FormText, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { isEmail, length } from '../../util/validators'
import { resetPassword } from '../../flux/slices/authSlice';

const ResetPassword = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')

    const [validated, setValidated] = useState('')
    const [successText, setSuccessText] = useState('')

    const handleChange = e => {
        const value = e.target.value
        setEmail(value)

        const isValidated = isEmail(value) && length({ min: 6, max: 30 })(value)
        !isValidated && setValidated('incorrect email')
        isValidated && setValidated('')
    }

    const HandleResetPassword = () => {
        if (email === '') {
            return setValidated('fill your email')
        }

        // const isValid = users.find(user => user.email === email)
        // if (!isValid) {
        //     return setValidated('not found email')
        // }

        dispatch(resetPassword(email))
        setSuccessText('sent')

    }

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>ResetPassword</h1>
                    <FormText>we'll email you the new password to login</FormText>
                    {validated !== '' && <Alert color="danger">{validated}</Alert>}
                    {validated === '' && successText !== '' && <Alert color="success">{successText}</Alert>}
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
                        <Link to="/login">back to login</Link>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default ResetPassword