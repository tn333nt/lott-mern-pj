
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setResult, toggleModalAdd, toggleModalUpdate } from '../../flux/resultsSlice';
import { prizesArr, titles } from '../../util/data'
import { useEffect } from 'react';
import { useState } from 'react';
import { updateResult } from './../../flux/resultsSlice';

export const ResultForm = props => {

    // useEffect(() => {
    //     testF()
    // }, []);

    const dispatch = useDispatch()

    // const prizesAmount = useSelector(state => state.results.results.prizesAmount)
    const isUpdating = useSelector(state => state.results.isUpdating)
    const error = useSelector(state => state.results.error)

    const isOpenAddModal = useSelector(state => state.results.isOpen.addModal)
    const isOpenUpdateModal = useSelector(state => state.results.isOpen.updateModal)

    const toggleModal = () => {
        isOpenAddModal && dispatch(toggleModalAdd())
        isOpenUpdateModal && dispatch(toggleModalUpdate())

        // isOpenUpdateModal && dispatch(toggleModalUpdate())
    }


    // wtf ? le ra phai co data r chu ??
    const pickedResult = useSelector(state => state.results.pickedResult)

    // hardcoded here
    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value.trim()

        console.log(name, 'name');
        console.log(value, 'value');
        
        dispatch(setResult({
            ...pickedResult,
            [name]: {
                winningValues: value
            }
        }))

        // console.log(pickedResult, 123) 
        // validate: tao f validate pickedResult.winningNumbers -> return <FormFeedback>

        // (e) => setJackpot(e.target.value.trim())
    }


    const submitForm = () => {
        if (isOpenAddModal) {
            dispatch(toggleModalAdd())
            // dispatch(addResult())
        }
        if (isOpenUpdateModal) {
            dispatch(toggleModalUpdate())
            // dispatch(updateResult())
        }

    }

    return (
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
                                * pattern : xxxxxx xxxxxx xxxxxx
                            </p>
                        </FormText>

                        {/* {prizesArr.map((item, index) => (
                            <FormGroup
                                floating
                            // ${(item[index] <= prizesAmount) ? '' : 'disabled'}
                            // or check xem neu rong thi ko lay (_.isEqual ...)
                            >
                                {console.log(item === 'jackpot', 123)}
                                {console.log(results[index]['jackpot'],  'jackpot')}

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
                                value={isUpdating || error ? `${pickedResult.jackpot.winningValues}` : ''}
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
                                value={isUpdating || error ? `${pickedResult.firstPrizes.winningValues}` : ''}
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
                                value={isUpdating || error ? `${pickedResult.secondPrizes.winningValues}` : ''}
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
                                value={isUpdating || error ? `${pickedResult.thirdPrizes.winningValues}` : ''}
                                onChange={handleChange}
                            />
                            <Label for='thirdPrizes'>
                                thirdPrizes
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
    )
}