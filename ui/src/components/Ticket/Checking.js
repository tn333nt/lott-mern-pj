
import { useEffect, useState } from 'react';
import { Input, Button, Form, Alert, FormGroup, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { isNumber, length, required } from '../../util/validators';
import { setError, setIndexes, setMessage, setTicket } from '../../flux/slices/ticketsSlice';
import { setResult } from '../../flux/slices/resultsSlice';

const CheckTicket = () => {

    const dispatch = useDispatch()
    const [validated, setValidated] = useState('')

    const results = useSelector(state => state.results.results)
    const pickedResult = useSelector(state => state.results.pickedResult)

    const checkingTicket = useSelector(state => state.tickets.checkingTicket)
    const indexes = useSelector(state => state.tickets.indexes)

    // convert each date to a Date() and take the max
    // const dates = []
    // results.map(result => {
    //     const date = new Date(result.createdAt)
    //     console.log(date, typeof date, 123) 
    //     dates.push(date)
    // })
    // // const result = results.find(result => result.date === Math.max(dates))

    // console.log(results, 'results')
    // console.log(Math.max(...dates), 'Math.max(dates)')

    // https://stackoverflow.com/a/36578942


    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

        console.log(typeof value)

        if (name === 'value') {
            const isValidated = length({ exact: 6 })(value) && isNumber(value)
            !isValidated && setValidated('SIX NUMBERS for each ticket')
            isValidated && setValidated('')
        }

        const ticket = {
            ...checkingTicket,
            [name]: value
        }

        dispatch(setTicket(ticket))

    }

    const handleCheck = () => {

        if (checkingTicket.date === 'Invalid Date' ||
            checkingTicket.value === '' ||
            checkingTicket.date === ''
        ) {
            return setValidated('fill all input')
        }

        // 1. find la dc r
        // 2. check nhu the chi dc nhung giai cung length thoi (hien tai cung chua dam bao dc vi tri so)
        // 3. neu luu chung nthe no se highlight all lol
        // 4. neu luu chung nthe no se highlight all lol

        const checkingResult = results.find(result => result.date === checkingTicket.date)
        console.log(results, 'results')
        console.log(checkingResult, 'checkingResult')

        if (checkingResult) {

            // check if checking value has included any winning value
            const indexCheckingJP = checkingResult.jackpot.winningValues.findIndex(value => checkingTicket.value === value)
            const indexChecking1P = checkingResult.firstPrizes.winningValues.findIndex(value => checkingTicket.value === value)
            // const won2P = checkingResult.secondPrizes.winningValues.findIndex(value => checkingTicket.value.includes(value))
            // const won3P = checkingResult.thirdPrizes.winningValues.findIndex(value => checkingTicket.value.includes(value))
            // const won4P = checkingResult.fourthPrizes.winningValues.findIndex(value => checkingTicket.value.includes(value))
            // const won5P = checkingResult.fifthPrizes.winningValues.findIndex(value => checkingTicket.value.includes(value))
    
            // -1 = no match is found
            const indexChecking2P = checkingResult.secondPrizes.winningValues.findIndex(value => {
                // check if x last number of checking value === winning value
                // get x last num of cV
                console.log(checkingTicket, 'checkingTicket')
                const comparedNumbers = checkingTicket.value.substring(1)
                // compare these last nums to wV , return T F
                const isCompared = comparedNumbers === value
                // return isCompared ? isCompared : null
                console.log(value, 'value')
                console.log(comparedNumbers, 'comparedNumbers')
                console.log(isCompared, 'isCompared')
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
            dispatch(setResult(checkingResult))
            console.log(pickedResult, 'pickedResult')
    
            // 3. pass msg to show
            indexCheckingJP!==-1 && dispatch(setMessage('you have won the jackpot'))
            indexChecking1P!==-1 && dispatch(setMessage('you have won the first prize'))
            indexChecking2P!==-1 && dispatch(setMessage('you have won the second prize'))
            indexChecking3P!==-1 && dispatch(setMessage('you have won the third prize'))
            indexChecking4P!==-1 && dispatch(setMessage('you have won the fourth prize'))
            indexChecking5P!==-1 && dispatch(setMessage('you have won the fifth prize'))

        } else {
            dispatch(setError('not found result'))
        }

    }


    return (
        <Form inline className="w-50">
            <div className="text-center text-success fs-1 fw-bolder">
                check the ticket
            </div>
            {validated !== '' && <Alert color="danger">{validated}</Alert>}
            <FormGroup floating className="mt-3">
                <Input
                    name="value"
                    type="text"
                    bsSize="lg"
                    onChange={handleChange}
                />
                <Label>ticket</Label>
            </FormGroup>
            <FormGroup floating className="mt-3">
                <Input
                    name="date"
                    type="date"
                    bsSize="lg"
                    onChange={handleChange}
                />
                <Label>date</Label>
            </FormGroup>
            <Button block
                color="success"
                size="lg"
                className="mt-3 mb-5"
                disabled={validated !== '' ? true : false}
                onClick={handleCheck}
            >
                check
            </Button>
        </Form>
    )

}

export default CheckTicket