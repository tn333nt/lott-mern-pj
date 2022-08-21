
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { deleteUser, setPickedUser, setUsersConfirm, setUsersMessage, toggleUsersMessage } from '../../flux/slices/usersSlice';
import { setPickedResult, closeResultsMessage, setResultsConfirm } from '../../flux/slices/resultsSlice';
import { setTicketsConfirm, deleteAllTickets } from '../../flux/slices/ticketsSlice';
import { setUser } from '../../flux/slices/authSlice';


const ConfirmHandler = props => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const isOpen = useSelector(state => state.users.isOpen.messageModal)

    const { pickedUser, currentUsersPage } = useSelector(state => state.users)

    // const message = useSelector(state => state.auth.message)

    const confirm = props.confirm

    const passingValues = {
        currentPage: currentUsersPage,
        deletingUser: pickedUser,
        token
    }

    // later : dung chung modal
    const toggle = () => {
        // close modal
        dispatch(toggleUsersMessage())
        dispatch(closeResultsMessage())

        // clear data
        dispatch(setPickedResult())
        dispatch(setPickedUser())
        dispatch(setUsersConfirm())
        dispatch(setResultsConfirm())
    }

    const handleAccept = async () => {
        // cuz of ~sync outside
        dispatch(setTicketsConfirm())
        dispatch(setUsersMessage())
        if (confirm === "Delete all checking history ?") {
            const data = await dispatch(deleteAllTickets(token))
            const closedModal = await dispatch(toggleUsersMessage())
            if (data.error) {
                // action.error from rejected case
                console.log(data.error, 41587215)
                dispatch(toggleUsersMessage())
                dispatch(setUsersMessage(data.error.message))
                return
            }

            if (!closedModal.error) {
                dispatch(toggleUsersMessage())
                dispatch(setUsersMessage('Deleted all'))
            }

            // action.payload from fulfilled case
            // set user to update ui immediately
            dispatch(setUser(data.payload.user))

        }


        if (confirm === `delete user ${pickedUser.email} ?`) {
            const data = await dispatch(deleteUser(passingValues))
            if (data.error) {
                return
            }

            dispatch(setUsersConfirm())
            // close confirm modal first
            const test = await dispatch(toggleUsersMessage())
            if (!test.error) {
                // open new modal with a msg
                dispatch(toggleUsersMessage())
                dispatch(setUsersMessage(`Deleted ${pickedUser.email}`))
                dispatch(setPickedUser())
            }
        }
    }


    return (
        <Modal isOpen={isOpen} toggle={toggle}>

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

