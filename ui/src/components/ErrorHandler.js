
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModalError } from '../flux/resultsSlice';

const ErrorHandler = props => {

    const dispatch = useDispatch()

    const isOpen = useSelector(state => state.results.isOpen.errorModal)
    const error = useSelector(state => state.results.error)

    return (
        <>
            {error && (
                <Modal isOpen={isOpen} toggle={() => dispatch(toggleModalError())}>
                    <ModalHeader toggle={() => dispatch(toggleModalError())}>
                        an error occured
                    </ModalHeader>

                    <ModalBody>
                        {error.message}
                    </ModalBody>

                </Modal>
            )}
        </>
    )
}

export default ErrorHandler