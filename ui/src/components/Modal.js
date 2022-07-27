
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { FormResult } from './Form';
import { toggleModalAdd, toggleModalUpdate } from './../flux/resultsSlice';
import { BtnComponent } from './Button';


export const ModalForm = props => {

    const dispatch = useDispatch()

    const isOpenModalAdd = useSelector(state => state.results.isOpen.modalAdd)
    const isOpenModalUpdate = useSelector(state => state.results.isOpen.modalUpdate)
    
    const toggleModal = () => {
        isOpenModalAdd && dispatch(toggleModalAdd())
        isOpenModalUpdate && dispatch(toggleModalUpdate())
    }

    const submitForm = () => {
        if (isOpenModalAdd) {
            dispatch(toggleModalAdd())
            // dispatch(addResult())
        }
        if (isOpenModalUpdate) {
            dispatch(toggleModalUpdate())
            // dispatch(updateResult())
        }

    }

    return (
        <div>
            {console.log(isOpenModalAdd, 123455)}
            <Modal isOpen={isOpenModalAdd ? isOpenModalAdd : isOpenModalUpdate} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal}>
                    {isOpenModalAdd && 'Add Result'}
                    {isOpenModalUpdate && 'Update Result'}
                </ModalHeader>
                <ModalBody>
                    <FormResult />
                </ModalBody>
                <ModalFooter>
                    
                    <Button
                        color="primary"
                        onClick={submitForm}
                    >
                        Submit
                    </Button>

                </ModalFooter>
            </Modal>
        </div>
    )
}