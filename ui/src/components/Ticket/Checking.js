
import { useState } from 'react';
import { Input, Button, Form, Alert, FormGroup, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { required, isNumber, length } from '../../util/validators';
import {
    setIndexes, postTicket, setTicket,
    setCheckingSuccess, setCheckingMessage, setCheckingFail,
    setCheckingError
} from '../../flux/slices/ticketsSlice';
import { setPickedResult } from '../../flux/slices/resultsSlice';
import { setUser } from '../../flux/slices/authSlice';

const CheckTicket = () => {

    const dispatch = useDispatch()

    // const [date, setDate] = useState('') // loi cap nhat dong thoi
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

        // hinh nhu date bi invalid la do sau khi blur => tinh changing value la rong
        // nen neu fill date trc roi den value thi date se bi loi
        // sao no van tinh onchange vay nhi ?

        if (name === 'date' && value !== '') {
            const newDate = new Date(value)
            const updatedDate = newDate.toLocaleDateString("vi-VN")
            console.log(updatedDate, 9687163)
            if (updatedDate === 'Invalid Date') {
                return setValidated('test')
            }
            
            dispatch(setTicket({
                ...checkingTicket,
                date: updatedDate,
            }))
        }

        // const ticket = {
        //     ...checkingTicket,
        //     [name]: value,
        //     date,
        // }
        // dispatch(setTicket(ticket))

    }
    console.log(checkingTicket, 9687163)

    // vi checking !isAuth ko luu data => only need fe validation
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


        // find result that have the checking date
        const checkingResult = results.find(result => result.date === checkingTicket.date)

        // not found  
        // later : thu de phan nay cho be only
        if (!checkingResult) {
            // still pass date to Checked
            dispatch(setPickedResult({
                ...checkingResult,
                date: checkingTicket.date,
            }))

            dispatch(setCheckingMessage('Not found result'))
            // dispatch(setCheckingError())
            dispatch(setCheckingSuccess())
            dispatch(setCheckingFail())
        }

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


        // 1. save indexes to highlight 
        dispatch(setIndexes({
            ...indexes,
            JP: indexCheckingJP,
            P1: indexChecking1P,
            P2: indexChecking2P,
            P3: indexChecking3P,
            P4: indexChecking4P,
            P5: indexChecking5P
        }))

        // 2. pass found out result to render
        dispatch(setPickedResult(checkingResult))
        // dispatch(setPickedResult({
        //     ...checkingResult,
        //     date: checkingTicket.date,
        // }))

        // 3. pass msg to show if found index (return !== -1) , i.e won a prize + add check if be user
        const wonPrizes = []
        indexCheckingJP !== -1 && wonPrizes.push('Jackpot')
        indexChecking1P !== -1 && wonPrizes.push('1st Prize')
        indexChecking2P !== -1 && wonPrizes.push('2nd Prize')
        indexChecking3P !== -1 && wonPrizes.push('3rd Prize')
        indexChecking4P !== -1 && wonPrizes.push('4th Prize')
        indexChecking5P !== -1 && wonPrizes.push('5th Prize')


        const postData = {
            ticket: {
                ...checkingTicket,
                // date,
                wonPrizes,
            },
            token: token
        }

        // neu la user thi add check to his
        if (isAuth) {
            const data = await dispatch(postTicket(postData))

            if (data.payload) {
                // if won
                if (wonPrizes.length > 0) {
                    dispatch(setCheckingSuccess(`You have won the ${wonPrizes.join(' and the ')}`))
                    // clear old state
                    dispatch(setCheckingFail())
                    dispatch(setCheckingError())
                    dispatch(setCheckingMessage())
                    setValidated('')

                } else { // if not won
                    dispatch(setCheckingFail('Not won any prize'))
                    dispatch(setCheckingSuccess())
                    dispatch(setCheckingMessage())
                    dispatch(setCheckingError())
                    setValidated('')
                    // clear inputs
                    // dispatch(setTicket())
                }

                // update user's hisCheck
                dispatch(setUser(data.payload.user))
                return
            }
            // clear checking result
            // dispatch(setPickedResult())

            // // if validation failed // not necessary
            if (data.error) {
                dispatch(setCheckingSuccess())
                dispatch(setCheckingFail())
                dispatch(setCheckingMessage())
                // dispatch(setPickedResult())
                setValidated('')
            }

        } else { // not auth => not update his
            if (wonPrizes.length > 0) {
                dispatch(setCheckingSuccess(`You have won the ${wonPrizes.join(' and the ')}`))
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
                    // value={value}
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
                    // value={checkingTicket.date !== '' && checkingTicket.date}
                    onChange={handleChange}
                />
                <Label>Date</Label>
            </FormGroup>
            <Button block
                color="success"
                size="lg"
                className="mt-3 mb-5"
                // disabled={validated !== '' ? true : false}
                onClick={handleCheck}
            >
                Check
            </Button>
        </Form>
    )

}

export default CheckTicket