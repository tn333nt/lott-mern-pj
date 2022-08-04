
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setValues, toggleModalAdd, toggleModalUpdate, addResult, updateResult } from '../../flux/resultsSlice';
import Messenger from '../Messenger'

export const ResultForm = props => {

    const dispatch = useDispatch()

    const isOpenAddModal = useSelector(state => state.results.isOpen.addModal)
    const isOpenUpdateModal = useSelector(state => state.results.isOpen.updateModal)

    const pickedResult = useSelector(state => state.results.pickedResult)

    const currentPage = useSelector(state => state.results.currentPage)

    const toggleModal = () => {
        isOpenAddModal && dispatch(toggleModalAdd())
        isOpenUpdateModal && dispatch(toggleModalUpdate())
    }

    const handleChange = e => {
        const name = e.target.name
        const strValue = e.target.value.trim()

        // vi trim() strValue chua remove dc space khoi tung phan tu
        const values = strValue.split(',')
        const arrValues = []
        values.forEach(value => {
            arrValues.push(value.trim())
        })

        const result = {
            ...pickedResult,
            [name]: {
                ...pickedResult[name],
                winningValues: arrValues
            }
        }

        dispatch(setValues(result))

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
            <div>
                <Modal isOpen={isOpenAddModal ? isOpenAddModal : isOpenUpdateModal} toggle={toggleModal} >

                    <ModalHeader toggle={toggleModal}>
                        {isOpenAddModal && 'Add Result'}
                        {isOpenUpdateModal && 'Update Result'}
                    </ModalHeader>

                    <ModalBody>
                        <Form className='px-2' inline>
                            <FormText>
                                <p className="mb-3">
                                    {/* hardcoded here */}
                                    * note : each prize's ticket / value has 6 numbers and be seperated by a comma
                                </p>
                            </FormText>

                            {/* later : input for gening date & game & prizesAmount*/}

                            {/* {prizesArr.map((item, index) => (
                                <FormGroup
                                    floating
                                // ${(item[index] <= prizesAmount) ? '' : 'disabled'}
                                // or check xem neu rong thi ko lay (_.isEqual ...)
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
                                />
                                <Label for='jackpot'>
                                    jackpot
                                </Label>
                            </FormGroup>

                            <FormGroup floating >
                                <Input
                                    name='firstPrizes'
                                    type="text"
                                    id='firstPrizes'
                                    placeholder='firstPrizes'
                                    value={pickedResult.firstPrizes.winningValues.length > 0 ? pickedResult.firstPrizes.winningValues : ''}
                                    onChange={handleChange}
                                />
                                <Label for='firstPrizes'>
                                    firstPrizes
                                </Label>
                            </FormGroup>

                            <FormGroup floating >
                                <Input
                                    name='secondPrizes'
                                    type="text"
                                    id='secondPrizes'
                                    placeholder='secondPrizes'
                                    value={pickedResult.secondPrizes.winningValues.length > 0 ? pickedResult.secondPrizes.winningValues : ''}
                                    onChange={handleChange}
                                />
                                <Label for='secondPrizes'>
                                    secondPrizes
                                </Label>
                            </FormGroup>

                            <FormGroup floating >
                                <Input
                                    name='thirdPrizes'
                                    type="text"
                                    id='thirdPrizes'
                                    placeholder='thirdPrizes'
                                    value={pickedResult.thirdPrizes.winningValues.length > 0 ? pickedResult.thirdPrizes.winningValues : ''}
                                    onChange={handleChange}
                                />
                                <Label for='thirdPrizes'>
                                    thirdPrizes
                                </Label>
                            </FormGroup>

                            <FormGroup floating >
                                <Input
                                    name='fourthPrizes'
                                    type="text"
                                    id='fourthPrizes'
                                    placeholder='fourthPrizes'
                                    value={pickedResult.fourthPrizes.winningValues.length > 0 ? pickedResult.fourthPrizes.winningValues : ''}
                                    onChange={handleChange}
                                />
                                <Label for='fourthPrizes'>
                                    fourthPrizes
                                </Label>
                            </FormGroup>

                            <FormGroup floating >
                                <Input
                                    name='fifthPrizes'
                                    type="text"
                                    id='fifthPrizes'
                                    placeholder='fifthPrizes'
                                    value={pickedResult.fifthPrizes.winningValues.length > 0 ? pickedResult.fifthPrizes.winningValues : ''}
                                    onChange={handleChange}
                                />
                                <Label for='fifthPrizes'>
                                    fifthPrizes
                                </Label>
                            </FormGroup>

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

                </Modal>
            </div>
        </>
    )
}