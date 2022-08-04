
import { useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setValues, toggleModalAdd, toggleModalUpdate, addResult, updateResult } from '../../flux/resultsSlice';
import Messenger from '../Messenger'

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

    const pickedResult = useSelector(state => state.results.pickedResult)

    const currentPage = useSelector(state => state.results.currentPage)

    // const winningValues = useSelector(state => state.results.winningValues)

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value.trim()

        // de ko gui nguyen chuoi ['...,...']
        // const values = e.target.value.trim().split(',')
        
        // vi trim() value ko remove space khoi tung phan tu
        
        const test = value.split(',')
        const arr = []
        test.forEach((t, i) => {
            arr.push(t.trim())
        })
        console.log(test, 'test')
        console.log(arr.toString(), 'arr')

        const result = {
            ...pickedResult,
            [name]: {
                ...pickedResult[name],
                winningValues: arr
            }
        }


        console.log(result[name].winningValues, 'name');
        console.log(typeof result[name].winningValues, 'values');

        // values.map(value => {
        //     console.log(value, 'value');
        //     test.push(value)
        // })
        // tại value cũng lấy ở đó ra nên onChange thì cũng change ở đó

        dispatch(setValues(result))

        // console.log(pickedResult, 123) 
        // validate: tao f validate pickedResult.winningNumbers -> return <FormFeedback>

        // (e) => setJackpot(e.target.value.trim())
    }

    console.log(pickedResult, 'winningValues.firstPrizes')

    const submitForm = () => {
        // const date = new Date()

        const result = {
            ...pickedResult,
            _id: pickedResult._id, // in add case : auto gen follow mgs mechanism (ignore if we've set custom _id)
            // date: date.toISOString(),
            jackpot: {
                ...pickedResult.jackpot, // sao ben tren save dc ma o day ko save reward ?
                // lol case do data cu empty
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

        console.log(result, 'abcabcabcabc')

        if (isOpenAddModal) {
            dispatch(toggleModalAdd())
            dispatch(addResult({
                newResult: result,
                currentPage: currentPage
            }))
        }
        if (isOpenUpdateModal) {
            dispatch(toggleModalUpdate())
            // dispatch(setValues(result))
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