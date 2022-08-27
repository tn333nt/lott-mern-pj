import { Button, Form, FormText, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { resetPassword, setAuthError } from '../../flux/slices/authSlice';

const ResetPassword = () => {

    const dispatch = useDispatch()

    const { error } = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [successText, setSuccessText] = useState('')

    const handleChange = e => {
        const value = e.target.value
        setEmail(value)
    }

    const HandleSubmit = async () => {
        const data = await dispatch(resetPassword(email))
        if (data.payload) {
            dispatch(setAuthError())
            setSuccessText('Reset password was sent successfully to your e-mail')
        }
        if (data.error) {
            setSuccessText('')
        }
    }

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>Reset Password</h1>
                    <FormText>We'll email you the new password to login</FormText>
                    {error !== '' && <Alert color="danger">{error}</Alert>}
                    {successText !== '' && <Alert color="success">{successText}</Alert>}
                    <FormGroup className="mt-3">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            bsSize="lg"
                            name="email"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button block color="dark" size="lg" onClick={HandleSubmit} className="mt-4">Reset</Button>
                    <div className="text-center mt-3">
                        <Link to="/login">Back to login</Link>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default ResetPassword