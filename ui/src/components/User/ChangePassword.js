
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { useState } from 'react';
import { changePassword, setAuthError } from '../../flux/slices/authSlice';


const ChangePassword = () => {

    const dispatch = useDispatch()

    const { token, error } = useSelector(state => state.auth)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [successText, setSuccessText] = useState('')

    const handleChange = e => {
        const { name, value } = e.target

        if (name === 'oldPassword') {
            return setOldPassword(value)
        }

        if (name === 'newPassword') {
            return setNewPassword(value)
        }

        if (name === 'confirmPassword') {
            return setConfirmPassword(value)
        }
    }


    const HandleSubmit = async () => {
        const authData = {
            oldPassword,
            newPassword,
            confirmPassword,
            token
        }

        const data = await dispatch(changePassword(authData))
        if (data.payload) {
            dispatch(setAuthError())

            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setSuccessText('Password changed successfully')
        }
        if (data.error) {
            setSuccessText('')
        }
    }


    return (
        <Form inline>
            <h1 className="mb-5 text-danger text-center">Change Password</h1>

            {error !== '' && <Alert color="danger">{error}</Alert>}
            {error === '' && successText !== '' && <Alert color="success">{successText}</Alert>}

            <FormGroup floating className="mt-3">
                <Input
                    name="oldPassword"
                    type="password"
                    bsSize="lg"
                    value={oldPassword}
                    onChange={handleChange}
                />
                <Label>Old password</Label>
            </FormGroup>
            <FormGroup floating className="mt-3">
                <Input
                    name="newPassword"
                    type="password"
                    bsSize="lg"
                    value={newPassword}
                    onChange={handleChange}
                />
                <Label>New password</Label>
            </FormGroup>
            <FormGroup floating className="mt-3">
                <Input
                    name="confirmPassword"
                    type="password"
                    bsSize="lg"
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <Label>Confirm new password</Label>
            </FormGroup>

            <Button block
                color="dark"
                size="lg"
                className="mt-3 mb-5"
                onClick={HandleSubmit}
            >
                Change
            </Button>
        </Form>
    )

}

export default ChangePassword