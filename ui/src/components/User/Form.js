
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Input, Label, Alert, ModalBody, ModalFooter, ModalHeader, Modal } from 'reactstrap';
import { setAuthError, updateUser } from '../../flux/slices/authSlice';
import { setPickedUser, toggleUserUpdate } from '../../flux/slices/usersSlice';


const UserForm = () => {

    const dispatch = useDispatch()

    const { token, updateError } = useSelector(state => state.auth)
    const { pickedUser, isOpenUpdateModal } = useSelector(state => state.users)

    const toggleModal = () => {
        dispatch(toggleUserUpdate())
        dispatch(setAuthError())
    }

    const handleChange = e => {
        const { name, value } = e.target
        dispatch(setPickedUser({
            ...pickedUser,
            [name]: value
        }))
    }

    const HandleSubmit = async () => {
        const data = await dispatch(updateUser({ user: pickedUser, token }))
        if (data.payload) {
            dispatch(toggleUserUpdate())
        }
    }


    return (
        <>
            <Modal isOpen={isOpenUpdateModal} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal}>
                    Update
                </ModalHeader>

                <ModalBody>
                    <Form className='px-2' inline="true">
                        {updateError !== '' && <Alert color="danger">{updateError}</Alert>}

                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="username"
                                value={pickedUser.username}
                                onChange={handleChange}
                            />
                            <Label>Username</Label>
                        </FormGroup>

                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="fullName"
                                value={pickedUser.fullName}
                                onChange={handleChange}
                            />
                            <Label>Fullname</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="number"
                                bsSize="lg"
                                name="age"
                                value={pickedUser.age}
                                onChange={handleChange}
                            />
                            <Label>Age</Label>
                        </FormGroup>

                        <FormGroup floating className="mt-3">
                            <Input
                                type="tel"
                                bsSize="lg"
                                name="mobile"
                                value={pickedUser.mobile}
                                onChange={handleChange}
                            />
                            <Label>Mobile</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="country"
                                value={pickedUser.country}
                                onChange={handleChange}
                            />
                            <Label>Country</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="city"
                                value={pickedUser.city}
                                onChange={handleChange}
                            />
                            <Label>City</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="address"
                                value={pickedUser.address}
                                onChange={handleChange}
                            />
                            <Label>Address</Label>
                        </FormGroup>
                        <FormGroup floating className="mt-3">
                            <Input
                                type="text"
                                bsSize="lg"
                                name="postalCode"
                                value={pickedUser.postalCode}
                                onChange={handleChange}
                            />
                            <Label>Postal Code</Label>
                        </FormGroup>

                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button block
                        color="dark"
                        size="lg"
                        className="mt-4"
                        onClick={HandleSubmit}
                    >
                        Update
                    </Button>
                </ModalFooter>

            </Modal>
        </>
    )
}

export default UserForm