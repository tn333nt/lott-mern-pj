
import { Card, CardBody, CardTitle, Col, ListGroup, ListGroupItem, Row, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import UserForm from '../components/User/Form';
import ChangePassword from '../components/User/ChangePassword';
import Loader from '../components/Loader';
import { setPickedUser, toggleUserUpdate } from '../flux/slices/usersSlice';
import { setAuthError } from '../flux/slices/authSlice';

const Account = () => {
    const dispatch = useDispatch()
    const { user, isAuthLoading } = useSelector(state => state.auth)
    const { isOpenUpdateModal } = useSelector(state => state.users)

    console.log(isOpenUpdateModal, 999000, user)
    const HandleSubmit = () => {
        console.log(isOpenUpdateModal, 999000)
        dispatch(setAuthError())
        dispatch(toggleUserUpdate())
        dispatch(setPickedUser(user))
    }

    return (
        <div className="container pt-5 mw-100">
            {isAuthLoading && <Loader color="danger" />}
            <UserForm />
            <Row>
                <Col xs="12" md="6" className="my-5 d-flex justify-content-center">

                    <Card inline className="w-75">
                        <CardBody>
                            <CardTitle tag="h1" className="mb-3 text-dark text-center mt-3"><mark>Personal Information</mark></CardTitle>
                            <CardTitle tag="h3" className="text-danger text-center">{user.email}</CardTitle>
                        </CardBody>

                        <ListGroup flush>
                            <ListGroupItem >
                                Username : {user.username}
                            </ListGroupItem>
                            <ListGroupItem >
                                Fullname : {user.fullName}
                            </ListGroupItem>
                            <ListGroupItem >
                                Age : {user.age}
                            </ListGroupItem>
                            <ListGroupItem >
                                Mobile : {user.mobile}
                            </ListGroupItem>
                            <ListGroupItem >
                                Country : {user.country}
                            </ListGroupItem>
                            <ListGroupItem >
                                City : {user.city}
                            </ListGroupItem>
                            <ListGroupItem >
                                Address : {user.address}
                            </ListGroupItem>
                            <ListGroupItem >
                                Postal Code : {user.postalCode}
                            </ListGroupItem>
                        </ListGroup>

                        <CardBody>
                            <Button block
                                color="danger"
                                size="lg"
                                className="mt-4"
                                onClick={HandleSubmit}
                            >
                                Update
                            </Button>
                        </CardBody>

                    </Card>
                </Col>

                <Col xs="12" md="6" className="my-5 d-flex justify-content-center">
                    <ChangePassword />
                </Col>
            </Row>
        </div>
    )

}

export default Account