
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';

import {
    deleteAllUsers, deleteUser, setUser,
    toggleModalMessage as toggleUserMessage
} from '../flux/slices/usersSlice';

import {
    setResult,
    toggleModalMessage as toggleResultMessage
} from '../flux/slices/resultsSlice';


const Messenger = props => {

    const dispatch = useDispatch()

    const isOpen = useSelector(state => state.users.isOpen.messageModal)
    const confirm = useSelector(state => state.users.confirm)

    const userMsg = useSelector(state => state.users.message)
    const resultMsg = useSelector(state => state.results.message)

    const user = useSelector(state => state.users.user)

    const currentPage = useSelector(state => state.users.currentPage)

    const passingValues = {
        currentPage: currentPage,
        deletingUser: user
    }

    const toggle = () => {
        dispatch(toggleResultMessage())
        dispatch(toggleUserMessage())
    }

    const handleAccept = () => {

        if (confirm === "delete all users ?") {
            dispatch(deleteAllUsers())
        }

        if (confirm === `delete user ${user.username} ?`) {
            dispatch(deleteUser(passingValues))
        }

        dispatch(toggleUserMessage())
        dispatch(setUser())

    }

    const handleCancel = () => {
        dispatch(toggleUserMessage())
        dispatch(setUser())
        dispatch(toggleResultMessage())
        dispatch(setResult())
    }

    return (
        <>
            {(userMsg !== '' || resultMsg !== '') && (
                <Modal isOpen={isOpen} toggle={toggle}>

                    <ModalBody>
                        {userMsg && userMsg}
                        {resultMsg && resultMsg}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="dark"
                            outline
                            className="mx-3 py-1 px-3"
                            onClick={toggle}
                        > ok </Button>
                    </ModalFooter>

                </Modal>
            )}

            {confirm !== '' && (
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
                        > accept
                        </Button>
                        <Button
                            color="dark"
                            outline
                            className="mx-3 py-1 px-3"
                            onClick={handleCancel}
                        > cancel
                        </Button>
                    </ModalFooter>

                </Modal>
            )}

        </>
    )
}

export default Messenger


// later : separate msg, err vs confirm