
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { setMessage, toggleModal } from '../../flux/slices/sharedSlice';


const MessageHandler = props => {

    const dispatch = useDispatch()

    const { isOpenModal } = useSelector(state => state.shared)

    const toggle = () => {
        dispatch(toggleModal())
        dispatch(setMessage()) // clear msg
    }

    return (
        <>
            {(props.message !== '') && (
                <Modal isOpen={isOpenModal} toggle={toggle}>

                    <ModalBody>
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

