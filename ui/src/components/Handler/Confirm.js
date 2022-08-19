
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';

import { deleteAllUsers, deleteUser, setPickedUser, setUsersConfirm, setUsersMessage, toggleUsersMessage } from '../../flux/slices/usersSlice';
import { setPickedResult, closeResultsMessage, setResultsConfirm } from '../../flux/slices/resultsSlice';
import { deleteAllTickets } from './../../flux/slices/authSlice';
import { setTicketsConfirm } from '../../flux/slices/ticketsSlice';


const ConfirmHandler = props => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const isOpen = useSelector(state => state.users.isOpen.messageModal)

    const { message, pickedUser, currentPage } = useSelector(state => state.users)

    // const message = useSelector(state => state.auth.message)

    const confirm = props.confirm
    console.log(confirm, 198273921)

    const passingValues = {
        currentPage: currentPage,
        deletingUser: pickedUser,
        token: token
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
            if (data.error) {
                return
            }

            // dispatch(setTicketsConfirm())
            // dispatch(setUsersMessage())
            const test = await dispatch(toggleUsersMessage())
            if (!test.error) {
                dispatch(setUsersMessage('Deleted all'))
                dispatch(toggleUsersMessage())
            }
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

        console.log(message, 'message')
        console.log(isOpen, 'isOpen')

        // // close modal
        // dispatch(toggleUsersMessage())
        // dispatch(closeResultsMessage())

        // // clear data
        // dispatch(setPickedResult())
        // await dispatch(setUsersMessage())
        // dispatch(setPickedUser())
        // dispatch(setResultsConfirm())

    }

    console.log(message, 'message')


    // const handleCancel = () => {
    //     // close modal
    //     dispatch(toggleUsersMessage())
    //     dispatch(closeResultsMessage())

    //     // clear data
    //     dispatch(setPickedResult())
    //     dispatch(setPickedUser())
    //     dispatch(setUsersConfirm())
    //     dispatch(setResultsConfirm())
    // }

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

