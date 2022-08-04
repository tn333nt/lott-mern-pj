
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import dateFormat from 'dateformat'

import { deleteAllResults, toggleModalMessage, deleteResult, setValues } from '../flux/resultsSlice';

const Messenger = props => {

    const dispatch = useDispatch()

    const isOpen = useSelector(state => state.results.isOpen.messageModal)
    const confirm = useSelector(state => state.results.confirm)
    const message = useSelector(state => state.results.message)

    const pickedResult = useSelector(state => state.results.pickedResult)
    const currentPage = useSelector(state => state.results.currentPage)
    const date = dateFormat(pickedResult.date, "yyyy-mm-dd")
    const passingValues = {
        currentPage: currentPage,
        deletingResult: pickedResult
    }

    const handleAccept = () => {

        if (confirm === "delete all results ?") {
            dispatch(deleteAllResults())
        }

        if (confirm === `delete result of ${date} ?`) {
            dispatch(deleteResult(passingValues))
        }

        dispatch(toggleModalMessage())
        dispatch(setValues())

    }

    const handleCancel = () => {
        dispatch(toggleModalMessage())
        dispatch(setValues())

    }

    return (
        <>
            {message !== '' && (
                <Modal isOpen={isOpen} toggle={() => dispatch(toggleModalMessage())}>

                    <ModalBody>
                        {message && message}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="dark"
                            outline
                            className="mx-3 py-1 px-3"
                            onClick={handleCancel}
                        > ok </Button>
                    </ModalFooter>

                </Modal>
            )}

            {confirm !== '' && (
                <Modal isOpen={isOpen} toggle={() => dispatch(toggleModalMessage())}>

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