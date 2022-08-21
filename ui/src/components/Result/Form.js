
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormFeedback, FormGroup, Input, Label, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setPickedResult, toggleModalAdd, toggleModalUpdate, addResult, updateResult, setValidation, setResultError } from '../../flux/slices/resultsSlice';
import { prizesArr, titles } from '../../util/data';

export const ResultForm = props => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const isOpenAddModal = useSelector(state => state.results.isOpen.addModal)
    const isOpenUpdateModal = useSelector(state => state.results.isOpen.updateModal)

    const { validation, isUpdating, error,
        results, pickedResult
    } = useSelector(state => state.results)

    const {currentPage} = useSelector(state => state.shared)

    const date = new Date()
    const today = date.toLocaleDateString("vi-VN")
    const todayResult = results.find(result => result.date === today)

    const toggleModal = () => {
        isOpenAddModal && dispatch(toggleModalAdd())
        isOpenUpdateModal && dispatch(toggleModalUpdate())

        dispatch(setValidation())
        dispatch(setPickedResult())
        dispatch(setResultError())
    }

    
    const handleChange = e => {
        const { name } = e.target
        const strValue = e.target.value.trim()

        // fe validation for input's color

        // remove space from each item
        const values = strValue.split(',')
        const arrValues = []
        values.forEach((item, index) => {
            const value = item.trim()
            arrValues.push(value)
        })

        // trigger all validators -> compare with input
        let isValid = true;
        for (const validator of validation[name].validators) {
            isValid = isValid && validator(strValue);
        }
        // check amount of items
        if (name !== 'jackpot' && arrValues.length >= 0) {
            isValid = isValid && arrValues.length === 3
        }

        const updatedValidation = {
            ...validation,
            [name]: {
                ...validation[name],
                isValid: isValid
            }
        }

        const result = {
            ...pickedResult,
            [name]: {
                ...pickedResult[name],
                winningValues: arrValues
            }
        }

        dispatch(setValidation(updatedValidation))
        dispatch(setPickedResult(result))

    }

    const submitForm = async () => {
        // later : bo het vao pickedResult => only need to pass to dispatch
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
            const data = await dispatch(addResult({
                newResult: result,
                currentPage,
                token
            }))
            if (!data.error) {
                dispatch(toggleModalAdd())
                dispatch(setResultError())
                dispatch(setValidation())
                dispatch(setPickedResult())
            }
        }

        if (isOpenUpdateModal) {
            const data = await dispatch(updateResult({
                updatedResult: result,
                currentPage,
                token
            }))
            if (!data.error) {
                dispatch(toggleModalUpdate())
                dispatch(setResultError())
                dispatch(setValidation())
                dispatch(setPickedResult())
            }
        }


    }

    return (
        <>
            <Modal isOpen={isOpenAddModal ? isOpenAddModal : isOpenUpdateModal} toggle={toggleModal} >

                <ModalHeader toggle={toggleModal}>
                    {isOpenAddModal && 'Add Result'}
                    {isOpenUpdateModal && 'Update Result'}
                </ModalHeader>

                {(todayResult && !isUpdating) ? (
                    <Alert color="danger">
                        ! Already have report for today
                    </Alert>
                ) : (
                    <>
                        <ModalBody>
                            <Form className='px-2' inline>

                                <FormText>
                                    <p className="mb-3">
                                        * Fill in the right amount of winning values for each prize of <strong>{pickedResult.game}</strong> game
                                    </p>
                                </FormText>
                                {/* later : add dropdown => "pick the game" => custom prize amount */}

                                {error && (
                                    <Alert color="danger">
                                        {error}
                                    </Alert>
                                )}

                                {prizesArr.map((item, index) => (
                                    <FormGroup
                                        floating
                                        key={index}
                                    >
                                        <Input
                                            name={item}
                                            type="text"
                                            id={item}
                                            placeholder={titles[index]}
                                            value={pickedResult[item]?.winningValues?.length > 0 ? pickedResult[item].winningValues : ''}
                                            onChange={handleChange}
                                            valid={validation[item]?.isValid}
                                            invalid={validation[item]?.isValid === false}
                                            disabled={index >= pickedResult.prizesAmount}
                                        />
                                        <Label for={item}>
                                            {titles[index]}
                                        </Label>
                                        <FormFeedback invalid className="mx-3" >
                                            Validation failed
                                        </FormFeedback>
                                    </FormGroup>
                                ))}



                            </Form >
                        </ModalBody>

                        <ModalFooter>

                            <Button
                                className="me-5 px-3 "
                                color="primary"
                                onClick={submitForm}
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