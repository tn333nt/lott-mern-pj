
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormFeedback, FormGroup, Input, Label, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setResult, toggleModalAdd, toggleModalUpdate, addResult, updateResult, setValidation } from '../../flux/slices/resultsSlice';
import Messenger from '../Messenger'

export const ResultForm = props => {

    const dispatch = useDispatch()

    const isOpenAddModal = useSelector(state => state.results.isOpen.addModal)
    const isOpenUpdateModal = useSelector(state => state.results.isOpen.updateModal)

    const validation = useSelector(state => state.results.validation)
    const isFormValid = useSelector(state => state.results.isFormValid)

    const results = useSelector(state => state.results.results)
    const pickedResult = useSelector(state => state.results.pickedResult)

    const currentPage = useSelector(state => state.results.currentPage)

    const date = new Date()
    const today = date.toLocaleDateString("vi-VN")
    const todayResult = results.find(result => result.date === today)

    const isUpdating = useSelector(state => state.results.isUpdating)

    const toggleModal = () => {
        isOpenAddModal && dispatch(toggleModalAdd())
        isOpenUpdateModal && dispatch(toggleModalUpdate())
    }

    const handleChange = e => {
        const name = e.target.name
        const strValue = e.target.value.trim()

        // trigger all validators -> compare with input
        let isValid = true;
        for (const validator of validation[name].validators) {
            isValid = isValid && validator(strValue);
        }

        // remove space from each item
        const values = strValue.split(',')
        const arrValues = []
        values.forEach((item, index) => {
            const value = item.trim()
            arrValues.push(value)
        })

        // check amount of items
        if (name !== 'jackpot' && arrValues.length >= 0) {
            isValid = isValid && arrValues.length === 3
        }

        // customize feedback later

        const updatedValidation = {
            ...validation,
            [name]: {
                ...validation[name],
                isValid: isValid
            }
        }

        // check xem valid all chua
        let isFormValid = true;
        for (const name in updatedValidation) {
            isFormValid = isFormValid && updatedValidation[name].isValid;
        }

        const result = {
            ...pickedResult,
            [name]: {
                ...pickedResult[name],
                winningValues: arrValues
            }
        }

        dispatch(setValidation({
            validation: updatedValidation,
            isFormValid: isFormValid
        }))
        dispatch(setResult(result))
    }

    const submitForm = () => {

        const result = {
            ...pickedResult,
            _id: pickedResult._id,
            jackpot: {
                ...pickedResult.jackpot,
                winningValues: pickedResult.jackpot.winningValues,
            },
            firstPrizes: {
                ...pickedResult.firstPrizes,
                winningValues: pickedResult.firstPrizes.winningValues,
            },
            secondPrizes: {
                ...pickedResult.secondPrizes,
                winningValues: pickedResult.secondPrizes.winningValues,
            },
            thirdPrizes: {
                ...pickedResult.thirdPrizes,
                winningValues: pickedResult.thirdPrizes.winningValues,
            },
            fourthPrizes: {
                ...pickedResult.fourthPrizes,
                winningValues: pickedResult.fourthPrizes.winningValues,
            },
            fifthPrizes: {
                ...pickedResult.fifthPrizes,
                winningValues: pickedResult.fifthPrizes.winningValues,
            }
        }

        if (isOpenAddModal) {
            dispatch(toggleModalAdd())
            dispatch(addResult({
                newResult: result,
                currentPage: currentPage
            }))
        }

        if (isOpenUpdateModal) {
            dispatch(toggleModalUpdate())
            dispatch(updateResult({
                updatedResult: result,
                currentPage: currentPage
            }))
        }
    }

    return (
        <>
            <Messenger />
            <Modal isOpen={isOpenAddModal ? isOpenAddModal : isOpenUpdateModal} toggle={toggleModal} >

                <ModalHeader toggle={toggleModal}>
                    {isOpenAddModal && 'Add Result'}
                    {isOpenUpdateModal && 'Update Result'}
                </ModalHeader>

                {(todayResult && !isUpdating) ? (
                    <Alert color="danger">
                        ! already have report for today
                    </Alert>
                ) : (
                    <>
                        <ModalBody>
                            <Form className='px-2' inline>

                                <FormText>
                                    <p className="mb-3">
                                        {/* hardcoded here */}
                                        * each prize has <strong>x</strong> ticket(s) <br />
                                        * each ticket has <strong>y</strong> NUMBERS and be seperated by a COMMA
                                    </p>
                                </FormText>

                                {/* later : input for gening date & game & prizesAmount*/}
                                {/* {prizesArr.map((item, index) => (
                                    <FormGroup
                                        floating
                                        disabled={(item[index] <= prizesAmount)}
                                    >
                                        <Input
                                            name={item}
                                            type="text"
                                            id={item}
                                            placeholder={titles[index]}
                                            value={isUpdating || error ? results[index][`${item}`] : ''}
                                        />
                                        <Label for={item}>
                                            {titles[index]}
                                        </Label>
                                    </FormGroup>
                                ))} */}


                                {/* hardcoded here */}
                                <FormGroup floating >
                                    <Input
                                        name='jackpot'
                                        type="text"
                                        id='jackpot'
                                        placeholder='jackpot'
                                        value={pickedResult.jackpot.winningValues.length > 0 ? pickedResult.jackpot.winningValues : ''}
                                        // later : if err -> keep value
                                        onChange={handleChange}
                                        valid={validation.jackpot.isValid}
                                        invalid={!validation.jackpot.isValid}
                                    />
                                    <Label for='jackpot'>
                                        jackpot
                                    </Label>
                                    <FormFeedback invalid className="mx-3" >
                                        x=1,y=6
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup floating >
                                    <Input
                                        name='firstPrizes'
                                        type="text"
                                        id='firstPrizes'
                                        placeholder='firstPrizes'
                                        value={pickedResult.firstPrizes.winningValues.length > 0 ? pickedResult.firstPrizes.winningValues : ''}
                                        onChange={handleChange}
                                        valid={validation.firstPrizes.isValid}
                                        invalid={!validation.firstPrizes.isValid}
                                    />
                                    <Label for='firstPrizes'>
                                        firstPrizes
                                    </Label>
                                    <FormFeedback invalid className="mx-3" >
                                        x=3,y=6
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup floating >
                                    <Input
                                        name='secondPrizes'
                                        type="text"
                                        id='secondPrizes'
                                        placeholder='secondPrizes'
                                        value={pickedResult.secondPrizes.winningValues.length > 0 ? pickedResult.secondPrizes.winningValues : ''}
                                        onChange={handleChange}
                                        valid={validation.secondPrizes.isValid}
                                        invalid={!validation.secondPrizes.isValid}
                                    />
                                    <Label for='secondPrizes'>
                                        secondPrizes
                                    </Label>
                                    <FormFeedback invalid className="mx-3" >
                                        x=3,y=5
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup floating >
                                    <Input
                                        name='thirdPrizes'
                                        type="text"
                                        id='thirdPrizes'
                                        placeholder='thirdPrizes'
                                        value={pickedResult.thirdPrizes.winningValues.length > 0 ? pickedResult.thirdPrizes.winningValues : ''}
                                        onChange={handleChange}
                                        valid={validation.thirdPrizes.isValid}
                                        invalid={!validation.thirdPrizes.isValid}
                                    />
                                    <Label for='thirdPrizes'>
                                        thirdPrizes
                                    </Label>
                                    <FormFeedback invalid className="mx-3" >
                                        x=3,y=4
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup floating >
                                    <Input
                                        name='fourthPrizes'
                                        type="text"
                                        id='fourthPrizes'
                                        placeholder='fourthPrizes'
                                        value={pickedResult.fourthPrizes.winningValues.length > 0 ? pickedResult.fourthPrizes.winningValues : ''}
                                        onChange={handleChange}
                                        valid={validation.fourthPrizes.isValid}
                                        invalid={!validation.fourthPrizes.isValid}
                                    />
                                    <Label for='fourthPrizes'>
                                        fourthPrizes
                                    </Label>
                                    <FormFeedback invalid className="mx-3" >
                                        x=3,y=3
                                    </FormFeedback>
                                </FormGroup>

                                <FormGroup floating >
                                    <Input
                                        name='fifthPrizes'
                                        type="text"
                                        id='fifthPrizes'
                                        placeholder='fifthPrizes'
                                        value={pickedResult.fifthPrizes.winningValues.length > 0 ? pickedResult.fifthPrizes.winningValues : ''}
                                        onChange={handleChange}
                                        valid={validation.fifthPrizes.isValid}
                                        invalid={!validation.fifthPrizes.isValid}
                                    />
                                    <Label for='fifthPrizes'>
                                        fifthPrizes
                                    </Label>
                                    <FormFeedback invalid className="mx-3" >
                                        x=3,y=2
                                    </FormFeedback>
                                </FormGroup>

                            </Form >
                        </ModalBody>

                        <ModalFooter>

                            <Button
                                className="me-5 px-3 "
                                color="primary"
                                onClick={submitForm}
                                disabled={!isFormValid}
                            >
                                Submit
                            </Button>
                        </ModalFooter>
                    </>
                )}

            </Modal>
        </>
    )
}