import { Button, Form, FormText, FormFeedback, FormGroup, Input, Label, Alert, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { isEmail, length, isMatch } from '../../util/validators'
import { handleSingup, setError } from '../../flux/slices/authSlice';

const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const error = useSelector(state => state.auth.error)
    useEffect(() => {
        dispatch(setError(error))
    }, [error, dispatch])

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
            //     const isValidated = isEmail(value) && length({ min: 6, max: 30 })(value)
            //     if (isValidated) {
            //         setEmailErr("")
            //         setValidated('')
            //     } else {
            //         setEmailErr('Incorrect email')
            //     }
            setEmail(value)
        }

        if (name === 'password') {
            //     const isValidated = length({ min: 6, max: 30 })(value)
            //     if (isValidated) {
            //         setPasswordErr("")
            //         setValidated('')
            //     } else {
            //         setPasswordErr("6 characters minimum")
            //     }
            setPassword(value)
        }

        if (name === 'confirmPassword') {
            //     const isValidated = isMatch(password)(value) && length({ min: 6, max: 30 })(value)
            //     if (isValidated) {
            //         setConfirmErr("")
            //         setValidated('')
            //     } else {
            //         setConfirmErr("Passwords did not match")
            //     }
            setConfirmPassword(value)
        }
    }



    const HandleSubmit = async () => {
        const authData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        // const filledAll = email !== '' && password !== '' && confirmPassword !== ''
        // if (filledAll) {
        //     setValidated('')
        // } else {
        //     return setValidated('Fill all input')
        // }

        // const validatedAll = emailErr === '' && passwordErr === '' && confirmErr === ''
        // if (validatedAll) {
        //     setValidated('')
        // } else if (emailErr !== '') {
        //     return setValidated(emailErr)
        // } else if (passwordErr !== '') {
        //     return setValidated(passwordErr)
        // } else if (confirmErr !== '') {
        //     return setValidated(confirmErr)
        // }

        // const test = await dispatch(handleSingup(authData))
        // console.log(test)
        // console.log(error === '', 14214)

        dispatch(handleSingup(authData)).then((data) => {
            console.log(data, 'data 1')
            console.log(data.error?.message, 'data.error.message')
            // return dispatch(setError(data.error.message))
            // console.log(error, 'later 1')
            if (!data.error?.message) {
                dispatch(setError())
                navigate('/login')
            }
        })
            .then((data) => {
                console.log(data, 'data 2')
                console.log(error, 'later 2')
            })

        // dispatch(handleSingup(authData))
        // dispatch(setError(error))
        console.log(error, 'later 3')
        // if (error === '') {
        //     navigate('/login')
        // }
        // else {
        //     navigate(-1)
        // }

    }
    console.log(error, 'out')

    return (
        <div className="container pt-5 mw-100 d-flex justify-content-center">
            <Col xs="12" sm="11" md="9" lg="4">
                <Form>
                    <h1>Sign Up</h1>
                    {/* {emailErr !== '' && <Alert color="danger">{emailErr}</Alert>}
                    {passwordErr !== '' && <Alert color="danger">{passwordErr}</Alert>}
                    {confirmErr !== '' && <Alert color="danger">{confirmErr}</Alert>}
                    {validated !== '' && <Alert color="danger">{validated}</Alert>} */}
                    {error !== '' && <Alert color="danger">{error}</Alert>}
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