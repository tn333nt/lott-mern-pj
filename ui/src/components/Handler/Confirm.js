
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { deleteUser, setPickedUser, setUsersConfirm } from '../../flux/slices/usersSlice';
import { setPickedResult } from '../../flux/slices/resultsSlice';
import { deleteAllTickets } from '../../flux/slices/ticketsSlice';
import { setUser } from '../../flux/slices/authSlice';
import { setConfirm, setMessage, toggleModal } from '../../flux/slices/sharedSlice';


const ConfirmHandler = props => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const { isOpenModal } = useSelector(state => state.shared)
    const { pickedUser, currentUsersPage } = useSelector(state => state.users)

    const confirm = props.confirm

    const passingValues = {
        currentPage: currentUsersPage,
        deletingUser: pickedUser,
        token
    }

    const toggle = () => {
        dispatch(toggleModal())

        // clear data
        dispatch(setPickedResult())
        dispatch(setPickedUser())
        dispatch(setConfirm())
    }

    const handleAccept = async () => {
        if (confirm === "Delete all checking history ?") {
            const data = await dispatch(deleteAllTickets(token))
            const closedModalConfirm = await dispatch(toggleModal())

            if (data.error) {
                // action.error from rejected case
                console.log(data.error, 999)
                dispatch(setMessage(data.error.message))
                toggle()
                return
            }

            if (!closedModalConfirm.error) {
                dispatch(setMessage('Deleted all'))
                toggle()
                // action.payload from fulfilled case
                dispatch(setUser(data.payload.user)) // to update ui immediately
            }
        }


        if (confirm === `delete user ${pickedUser.email} ?`) {
            const data = await dispatch(deleteUser(passingValues))
            if (data.error) {
                dispatch(setMessage(data.error.message))
                toggle()
                return
            }

            // close confirm modal first
            const test = await dispatch(toggleModal())
            if (!test.error) {
                // open new modal with a msg
                dispatch(setMessage(`Deleted ${pickedUser.email}`))
                toggle()
            }
        }
    }


    return (
        <Modal isOpen={isOpenModal} toggle={toggle}>

            <ModalBody className="text-danger">
                {confirm && confirm}
            </ModalBody>

            <ModalFooter>
                <Button
                    color="danger"
                    outline
                    className="mx-3 py-1 px-3"
                    onClick={handleAccept}
                > Accept
                </Button>
                <Button
                    color="dark"
                    outline
                    className="mx-3 py-1 px-3"
                    onClick={toggle}
                > Cancel
                </Button>
            </ModalFooter>

        </Modal>
    )
}

export default ConfirmHandler

