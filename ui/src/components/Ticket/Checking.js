
import { useEffect, useState } from 'react';
import { Input, Button, Form, Alert, FormGroup, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { isNumber, length } from '../../util/validators';
import { setError, setIndexes, setMessage, setSuccess, setTicket } from '../../flux/slices/ticketsSlice';
import { setResult } from '../../flux/slices/resultsSlice';
import { postTicket } from '../../flux/slices/authSlice';

const CheckTicket = () => {

    const dispatch = useDispatch()
    const [validated, setValidated] = useState('')

    const results = useSelector(state => state.results.results)

    const checkingTicket = useSelector(state => state.tickets.checkingTicket)
    const indexes = useSelector(state => state.tickets.indexes)

    const isAuth = useSelector(state => state.auth.isAuth)
    const token = useSelector(state => state.auth.token)

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

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
            return setValidated('Fill all input')
        }

        // find checking result
        const checkingResult = results.find(result => result.date === checkingTicket.date)

        if (checkingResult) {
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
            dispatch(setResult(checkingResult))

            // 3. pass msg to show if found index (return !== -1) , i.e won a prize + add check if be user
            // le ra no nen la arr nhu luc dau 
            // maybe can tach ra thanh tung case if
            // co cai nao thi pass value qua reducer xong push vao state 
            // later mb
            // neu trung giai
            if (indexCheckingJP !== -1) {
                // neu la user thi add check to his
                isAuth && dispatch(postTicket({
                    ticket: {
                        ...checkingTicket,
                        wonPrize: 'jackpot'
                    },
                    token: token
                }))
                dispatch(setSuccess('you have won the jackpot'))
                // clear old state
                dispatch(setMessage())
                dispatch(setError())
            } else if (indexChecking1P !== -1) {
                isAuth && dispatch(postTicket({
                    ticket: {
                        ...checkingTicket,
                        wonPrize: 'firstPrize'
                    },
                    token: token
                }))
                dispatch(setSuccess('you have won the first prize'))
                dispatch(setMessage())
                dispatch(setError())
            } else if (indexChecking2P !== -1) {
                isAuth && dispatch(postTicket({
                    ticket: {
                        ...checkingTicket,
                        wonPrize: 'secondPrize'
                    },
                    token: token
                }))
                dispatch(setSuccess('you have won the second prize'))
                dispatch(setMessage())
                dispatch(setError())
            } else if (indexChecking3P !== -1) {
                isAuth && dispatch(postTicket({
                    ticket: {
                        ...checkingTicket,
                        wonPrize: 'thirdPrize'
                    },
                    token: token
                }))
                dispatch(setSuccess('you have won the third prize'))
                dispatch(setMessage())
                dispatch(setError())
            } else if (indexChecking4P !== -1) {
                isAuth && dispatch(postTicket({
                    ticket: {
                        ...checkingTicket,
                        wonPrize: 'fourthPrize'
                    },
                    token: token
                }))
                dispatch(setSuccess('you have won the fourth prize'))
                dispatch(setMessage())
                dispatch(setError())
            } else if (indexChecking5P !== -1) {
                isAuth && dispatch(postTicket({
                    ticket: {
                        ...checkingTicket,
                        wonPrize: 'fifthPrize'
                    },
                    token: token
                }))
                dispatch(setSuccess('you have won the fifth prize'))
                dispatch(setMessage())
                dispatch(setError())
            } else {
                // neu ko trung
                const ticket = {
                    ticket: checkingTicket,
                    token: token
                }
                isAuth && dispatch(postTicket(ticket))
                dispatch(setMessage('no won any prize'))
                dispatch(setSuccess())
                dispatch(setError())

                // clear input
                dispatch(setTicket())
                console.log(checkingTicket, 123)
            }



        } else {
            // neu ko co result cua ngay dc tim
            dispatch(setError('Not found result'))
            dispatch(setSuccess())
            dispatch(setMessage())

            // still pass date in to render
            dispatch(setResult({
                ...checkingResult,
                date: checkingTicket.date
            }))
        }

    }


    return (
        <Form inline className="w-50">
            <div className="text-center text-success fs-1 fw-bolder">
                Check the ticket
            </div>
            {validated !== '' && <Alert color="danger">{validated}</Alert>}
            <FormGroup floating className="mt-3">
                <Input
                    name="value"
                    type="text"
                    bsSize="lg"
                    // value={checkingTicket.value}
                    onChange={handleChange}
                />
                <Label>Ticket</Label>
            </FormGroup>
            <FormGroup floating className="mt-3">
                <Input
                    name="date"
                    type="date"
                    bsSize="lg"
                    // value={checkingTicket.date}
                    onChange={handleChange}
                />
                <Label>Date</Label>
            </FormGroup>
            <Button block
                color="success"
                size="lg"
                className="mt-3 mb-5"
                disabled={validated !== '' ? true : false}
                onClick={handleCheck}
            >
                Check
            </Button>
        </Form>
    )

}

export default CheckTicket