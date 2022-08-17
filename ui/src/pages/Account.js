
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Col, Row, Alert } from 'reactstrap';
import { useState } from 'react';
import { isMatch, length } from '../util/validators';
import { changePassword } from '../flux/slices/authSlice';


const Account = () => {

    const dispatch = useDispatch()

    const { user, token } = useSelector(state => state.auth)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [oldErr, setOldErr] = useState('')
    const [newErr, setNewErr] = useState('')
    const [confirmErr, setConfirmErr] = useState('')

    const [validated, setValidated] = useState('')
    const [successText, setSuccessText] = useState('')


    const handleChange = e => {
        const { name, value } = e.target

        if (name === 'oldPassword') {
            const isValidated = length({ min: 6, max: 30 })(value)
            if (isValidated) {
                setOldErr("")
                setValidated('')
            } else {
                setOldErr("6 characters minimum")
                setSuccessText('')
            }
            setOldPassword(value)
        }

        if (name === 'newPassword') {
            const isValidated = length({ min: 6, max: 30 })(value)
            if (isValidated) {
                setNewErr("")
                setValidated('')
            } else {
                setNewErr("6 characters minimum")
                setSuccessText('')
            }
            setNewPassword(value)
        }

        if (name === 'confirmPassword') {
            const isValidated = isMatch(newPassword)(value) && length({ min: 6, max: 30 })(value)
            if (isValidated) {
                setConfirmErr("")
                setValidated('')
            } else {
                setConfirmErr("Passwords did not match")
                setSuccessText('')
            }
            setConfirmPassword(value)
        }
    }


    const HandleSubmit = () => {
        const authData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            token: token
        }

        const filledAll = oldPassword !== '' && newPassword !== '' && confirmPassword !== ''
        if (filledAll) {
            setValidated('')
        } else {
            return setValidated('Fill all input')
        }

        const validatedAll = oldErr === '' && newErr === '' && confirmErr === ''
        if (validatedAll) {
            setValidated('')
        } else if (oldErr !== '') {
            return setValidated(oldErr)
        } else if (newErr !== '') {
            return setValidated(newErr)
        } else if (confirmErr !== '') {
            return setValidated(confirmErr)
        }

        dispatch(changePassword(authData))
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setSuccessText('Password changed successfully')

    }

    return (
        <div className="container pt-5 my-5 mw-100">
            <Row>
                <Col xs="12" md="6" className="d-flex justify-content-center">
                    <Form inline className="w-75">
                        <h1 className="mb-5 text-dark text-center"><mark>Personal Information</mark></h1>
                        <h3 className="mb-5 text-danger text-center">{user.email}</h3>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="username"
                                value={user.fullName}
                                disabled
                            />
                            <Label>Username</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="mobile"
                                value={user.mobile}
                                disabled
                            />
                            <Label>Mobile</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="country"
                                value={user.country}
                                disabled
                            />
                            <Label>Country</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="city"
                                value={user.city}
                                disabled
                            />
                            <Label>City</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="address"
                                value={user.address}
                                disabled
                            />
                            <Label>Address</Label>
                        </FormGroup>
                        <Button block
                            color="danger"
                            size="lg"
                            className="mt-4"
                            disabled
                        >Update</Button>
                    </Form>
                </Col>
                <Col xs="12" md="6" className="d-flex justify-content-center">
                    <Form inline>
                        <h1 className="mb-5 text-danger text-center">Change Password</h1>

                        {oldErr !== '' && <Alert color="danger">{oldErr}</Alert>}
                        {newErr !== '' && <Alert color="danger">{newErr}</Alert>}
                        {confirmErr !== '' && <Alert color="danger">{confirmErr}</Alert>}
                        {validated !== '' && <Alert color="danger">{validated}</Alert>}
                        {validated === '' && successText !== '' && <Alert color="success">{successText}</Alert>}

                        <FormGroup floating className="mt-3">
                            <Input
                                name="oldPassword"
                                type="password"
                                bsSize="lg"
                                onChange={handleChange}
                            />
                            <Label>Old password</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                name="newPassword"
                                type="password"
                                bsSize="lg"
                                onChange={handleChange}
                            />
                            <Label>New password</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                name="confirmPassword"
                                type="password"
                                bsSize="lg"
                                onChange={handleChange}
                            />
                            <Label>Confirm new password</Label>
                        </FormGroup>
                        <Button block
                            color="dark"
                            size="lg"
                            className="mt-3 mb-5"
                            disabled={validated !== ''}
                            onClick={HandleSubmit}
                        >
                            Change
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )

}

export default Account