
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { toggleUsersMessage, setUsersMessage } from '../../flux/slices/usersSlice';
import { closeResultsMessage } from '../../flux/slices/resultsSlice';


const MessageHandler = props => {

    const dispatch = useDispatch()

    const isOpen = useSelector(state => state.users.isOpen.messageModal)

    // const userMsg = useSelector(state => state.users.message)
    // const resultMsg = useSelector(state => state.results.message)
    // const ticketMsg = useSelector(state => state.tickets.message)
    // // tamj
    // const authMsg = useSelector(state => state.auth.message)

    const toggle = () => {
        dispatch(closeResultsMessage())
        dispatch(toggleUsersMessage())

        dispatch(setUsersMessage())
    }

    console.log(props.message !== '', 'props.message !== ')

    return (
        <>
            {/* {(userMsg !== '' || resultMsg !== '' || ticketMsg !== '') && ( */}
            {(props.message !== '') && (
                <Modal isOpen={isOpen} toggle={toggle}>

                    <ModalBody>
                        {/* {userMsg && userMsg}
                        {resultMsg && resultMsg}
                        {ticketMsg && ticketMsg}
                        {authMsg && authMsg} */}
                        {props.message}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="dark"
                            outline
                            className="mx-3 py-1 px-3"
                            onClick={toggle}
                        > OK </Button>
                    </ModalFooter>

                </Modal>
            )}
        </>
    )
}

export default MessageHandler

