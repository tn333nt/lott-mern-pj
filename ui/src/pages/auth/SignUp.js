import { Button, Form, FormText, FormFeedback, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { isEmail, length, isMatch } from '../../util/validators'
import { handleSingup } from '../../flux/slices/authSlice';
import { fetchAllUsers } from '../../flux/slices/usersSlice';

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = useSelector(state => state.auth.token)
    const users = useSelector(state => state.users.users)

    // later : sap xep vao store
    const [email, setEmail] = useState('') // use to get value to validate and change input
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [emailErr, setEmailErr] = useState('') // use to show error message
    const [passwordErr, setPasswordErr] = useState('')
    const [confirmErr, setConfirmErr] = useState('')
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

        if (name === 'confirmPassword') {
            const isValidated = isMatch(password)(value) && length({ min: 6, max: 30 })(value)
            if (isValidated) {
                setConfirmErr("")
                setValidated('')
            } else {
                setConfirmErr("passwords did not match")
            }
            setConfirmPassword(value)
        }
    }



    const HandleSubmit = () => {
        const authData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        const filledAll = email !== '' && password !== '' && confirmPassword !== ''
        if (filledAll) {
            setValidated('')
        } else {
            return setValidated('fill all input')
        }

        const validatedAll = emailErr === '' && passwordErr === '' && confirmErr === ''
        if (validatedAll) {
            setValidated('')
        } else if (emailErr !== '') {
            return setValidated(emailErr)
        } else if (passwordErr !== '') {
            return setValidated(passwordErr)
        } else if (confirmErr !== '') {
            return setValidated(confirmErr)
        }

        // const isValidEmail = users.find(user => user.email === email)
        // if (isValidEmail) {
        //     setValidated('')
        // } else {
        //     return setValidated('valid email')
        // }
        // console.log(isValidEmail) // dang loi fetch


        // if (filledAll && validated === '' && !isValidEmail) {
        dispatch(handleSingup(authData))
        navigate('/Login')
        // } else {
        // navigate(-1)
        // }

    }

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>SignUp</h1>
                    {emailErr !== '' && <Alert color="danger">{emailErr}</Alert>}
                    {passwordErr !== '' && <Alert color="danger">{passwordErr}</Alert>}
                    {confirmErr !== '' && <Alert color="danger">{confirmErr}</Alert>}
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
                        <Label>confirm password</Label>
                        <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="confirmPassword"
                            bsSize="lg"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button block
                        color="dark"
                        size="lg"
                        className="mt-4"
                        disabled={validated !== ''}
                        onClick={HandleSubmit}
                    >
                        SignUp
                    </Button>
                    <div className="text-center mt-4">
                        <FormText>already have an account ?</FormText>
                        <span> <Link to="/login"> login</Link></span>
                    </div>
                </Form>
            </Col>
        </div>
    )
}

export default SignUp