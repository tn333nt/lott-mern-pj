
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormText, FormGroup, Input, Label, Alert, Col, Row, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import { fetchAllUsers } from '../flux/slices/usersSlice';


const Account = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    const users = useSelector(state => state.users.users)


    return (
        <div className="container pt-5 my-5 mw-100">
            <Row>
                <Col xs="12" md="6" className="d-flex justify-content-center">
                    <Form inline className="w-75">
                        <h1 className="mb-5 text-dark text-center"><mark>personal information</mark></h1>
                        <h3 className="mb-5 text-danger text-center">{users[0].email}</h3>

                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="username"
                                value={users[0].fullName}
                                disabled
                            />
                            <Label>username</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="mobile"
                                value={users[0].mobile}
                                disabled
                            />
                            <Label>mobile</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="country"
                                value={users[0].country}
                                disabled
                            />
                            <Label>country</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="city"
                                value={users[0].city}
                                disabled
                            />
                            <Label>city</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="address"
                                value={users[0].address}
                                disabled
                            />
                            <Label>address</Label>
                        </FormGroup>
                        <Button block
                            color="danger"
                            size="lg"
                            className="mt-4"
                            disabled
                        >update</Button>

                    </Form>
                </Col>
                <Col xs="12" md="6" className="d-flex justify-content-center">
                    <Form inline>
                        <h1 className="mb-5 text-danger text-center">change password</h1>

                        {/* {validated !== '' && <Alert color="danger">{validated}</Alert>} */}
                        <FormGroup floating className="mt-3">
                            <Input
                                name="password"
                                type="text"
                                bsSize="lg"
                            // onChange={handleChange}
                            />
                            <Label> old password</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                name="newPassword"
                                type="newPassword"
                                bsSize="lg"
                            // onChange={handleChange}
                            />
                            <Label>new password</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                name="confirmPassword"
                                type="confirmPassword"
                                bsSize="lg"
                            // onChange={handleChange}
                            />
                            <Label>confirm new password</Label>
                        </FormGroup>
                        <Button block
                            color="dark"
                            size="lg"
                            className="mt-3 mb-5"
                        // disabled={validated !== '' ? true : false}
                        // onClick={handleCheck}
                        >
                            change
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )

}

export default Account