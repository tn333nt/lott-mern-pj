
import { useState } from 'react';
import { Input, Button, Form, Alert, FormGroup, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { isNumber, length } from '../../util/validators';
import {
    setIndexes, postTicket, setTicket,
    setCheckingSuccess, setCheckingMessage, setCheckingFail,
    setCheckingError
} from '../../flux/slices/ticketsSlice';
import { setPickedResult } from '../../flux/slices/resultsSlice';
import { setUser } from '../../flux/slices/authSlice';

const CheckTicket = () => {

    const dispatch = useDispatch()

    const [validated, setValidated] = useState('')

    const results = useSelector(state => state.results.results)
    const { checkingTicket, indexes, error } = useSelector(state => state.tickets)
    const { isAuth, token } = useSelector(state => state.auth)

    const handleChange = e => {
        const { name, value } = e.target

        if (name === 'value') {
            const isValidated = length({ exact: 6 })(value) && isNumber(value)
            !isValidated && setValidated('Validation failed')
            isValidated && setValidated('')

            dispatch(setTicket({
                ...checkingTicket,
                value,
            }))
        }

        if (name === 'date' && value !== '') {
            const newDate = new Date(value)
            const updatedDate = newDate.toLocaleDateString("vi-VN")
            if (updatedDate === 'Invalid Date') {
                return setValidated('test')
            }

            dispatch(setTicket({
                ...checkingTicket,
                date: updatedDate,
            }))
        }

    }

    // vi checking !isAuth ko luu data => fe validation is enough
    const handleCheck = async () => {

        // // test be val
        // if (isAuth) {
        //     dispatch(postTicket({
        //         ticket: checkingTicket,
        //         token
        //     }))
        // }
        // dispatch(setCheckingError())


        if (checkingTicket.date === 'Invalid Date' || // loi xac nhan gia tri sau khi bam ?
            checkingTicket.value === '' ||
            checkingTicket.date === ''
        ) {
            return setValidated('Fill all input')
        }


        // 1. find result that have the checking date
        const checkingResult = results.find(result => result.date === checkingTicket.date)

        // not found 
        if (!checkingResult) {
            // still pass date to Checked
            dispatch(setPickedResult({
                ...checkingResult,
                date: checkingTicket.date,
            }))

            dispatch(setCheckingMessage('Not found result'))
            dispatch(setCheckingSuccess())
            dispatch(setCheckingFail())
            setValidated('')
        }

        // 2. if having result -> compare checking val with winning val -> find index
        const indexChecking1P = checkingResult.firstPrizes.winningValues.findIndex(value => checkingTicket.value === value)
        const indexCheckingJP = checkingResult.jackpot.winningValues.findIndex(value => checkingTicket.value === value)

        const indexChecking2P = checkingResult.secondPrizes.winningValues.findIndex(value => {
            // get x last num of cV
            const comparedNumbers = checkingTicket.value.substring(1)
            // check if x last number of checking value === winning value
            const isCompared = comparedNumbers === value
            return isCompared
        })

        const indexChecking3P = checkingResult.thirdPrizes.winningValues
            .findIndex(value => checkingTicket.value.substring(2) === value)

        const indexChecking4P = checkingResult.fourthPrizes.winningValues
            .findIndex(value => checkingTicket.value.substring(3) === value)

        const indexChecking5P = checkingResult.fifthPrizes.winningValues
            .findIndex(value => checkingTicket.value.substring(4) === value)


        // 2. save indexes to highlight in Checked
        dispatch(setIndexes({
            ...indexes,
            JP: indexCheckingJP,
            P1: indexChecking1P,
            P2: indexChecking2P,
            P3: indexChecking3P,
            P4: indexChecking4P,
            P5: indexChecking5P
        }))

        // 4. pass found result to render in Checked
        dispatch(setPickedResult(checkingResult))

        // 5. check if found index (return !== -1) 
        const wonPrizes = []
        let totalReward = 0

        if (indexCheckingJP !== -1) {
            wonPrizes.push('Jackpot')
            totalReward += +checkingResult.jackpot.reward
        }
        if (indexChecking1P !== -1) {
            wonPrizes.push('1st Prize')
            totalReward += +checkingResult.firstPrizes.reward
        }
        if (indexChecking2P !== -1) {
            wonPrizes.push('2nd Prize')
            totalReward += +checkingResult.secondPrizes.reward
        }
        if (indexChecking3P !== -1) {
            wonPrizes.push('3rd Prize')
            totalReward += +checkingResult.thirdPrizes.reward
        }
        if (indexChecking4P !== -1) {
            wonPrizes.push('4th Prize')
            totalReward += +checkingResult.fourthPrizes.reward
        }
        if (indexChecking5P !== -1) {
            wonPrizes.push('5th Prize')
            totalReward += +checkingResult.fifthPrizes.reward
        }


        const postData = {
            ticket: {
                ...checkingTicket,
                wonPrizes,
            },
            token: token
        }

        // 6. check if be user -> add check (post to be)
        if (isAuth) {
            const data = await dispatch(postTicket(postData))

            if (data.payload) {
                // if won -> msg success
                if (wonPrizes.length > 0) {
                    dispatch(setCheckingSuccess([
                        "You have won the ",
                        <>{wonPrizes.join(' and the ')}</>,
                        " and ",
                        <strong>{totalReward}$</strong>
                    ])) // https://stackoverflow.com/questions/33381029/react-how-to-pass-html-tags-in-props

                    // clear old state
                    dispatch(setCheckingFail())
                    dispatch(setCheckingError())
                    dispatch(setCheckingMessage())
                    setValidated('')

                } else { // if not won -> msg fail
                    dispatch(setCheckingFail('Not won any prize'))

                    dispatch(setCheckingSuccess())
                    dispatch(setCheckingMessage())
                    dispatch(setCheckingError())
                    setValidated('')
                }

                dispatch(setUser(data.payload.user))

                return
            }

            // if having validation err -> msg err
            if (data.error) {
                dispatch(setCheckingSuccess())
                dispatch(setCheckingFail())
                dispatch(setCheckingMessage())
                setValidated('')
            }

        } else {
            if (wonPrizes.length > 0) {
                dispatch(setCheckingSuccess([
                    "You have won the ",
                    <>{wonPrizes.join(' and the ')}</>,
                    " and ",
                    <strong>{totalReward}$</strong>
                ]))
                dispatch(setCheckingFail())
                dispatch(setCheckingMessage())
                dispatch(setCheckingError())
                setValidated('')

            } else {
                dispatch(setCheckingFail('Not won any prize'))
                dispatch(setCheckingSuccess())
                dispatch(setCheckingMessage())
                dispatch(setCheckingError())
                setValidated('')
            }
        }
    }


    return (
        <Form inline className="w-50">
            <div className="text-center text-success fs-1 fw-bolder">
                Check the ticket
            </div>

            {validated !== '' && <Alert color="warning">{validated}</Alert>}
            {error !== '' && <Alert color="danger">{error}</Alert>}

            <FormGroup floating className="mt-3">
                <Input
                    name="value"
                    type="text"
                    bsSize="lg"
                    value={checkingTicket.value}
                    onChange={handleChange}
                />
                <Label>Ticket</Label>
            </FormGroup>
            <FormGroup floating className="mt-3">
                <Input
                    name="date"
                    type="date"
                    bsSize="lg"
                    onChange={handleChange}
                />
                <Label>Date</Label>
            </FormGroup>
            <Button block
                color="success"
                size="lg"
                className="mt-3 mb-5"
                onClick={handleCheck}
            >
                Check
            </Button>
        </Form>
    )

}

export default CheckTicket