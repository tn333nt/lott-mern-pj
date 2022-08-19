
import { useState } from 'react';
import { Input, Button, Form, Alert, FormGroup, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { isNumber, length } from '../../util/validators';
import { setCheckingError, setIndexes, setCheckingFail, setCheckingSuccess, setTicket } from '../../flux/slices/ticketsSlice';
import { setPickedResult } from '../../flux/slices/resultsSlice';
import { postTicket } from '../../flux/slices/authSlice';

const CheckTicket = () => {

    const dispatch = useDispatch()
    const [validated, setValidated] = useState('')

    const results = useSelector(state => state.results.results)
    const { checkingTicket, indexes } = useSelector(state => state.tickets)
    const { isAuth, token, error } = useSelector(state => state.auth)
    console.log(error, 28628768432)
    const handleChange = e => {
        const { name, value } = e.target

        // if (name === 'value') {
        //     const isValidated = length({ exact: 6 })(value) && isNumber(value)
        //     !isValidated && setValidated('SIX NUMBERS for each ticket')
        //     isValidated && setValidated('')
        // }

        const ticket = {
            ...checkingTicket,
            [name]: value
        }

        dispatch(setTicket(ticket))

    }

    // vi checking !isAuth ko luu data => only need fe validation
    // later : shorten it
    const handleCheck = async () => {

        if (checkingTicket.date === 'Invalid Date' || // loi validate thoi
            checkingTicket.value === '' ||
            checkingTicket.date === ''
        ) {
            dispatch(setTicket())
            // return setValidated('Fill all input')
            if (isAuth) {
                dispatch(postTicket({
                    ticket: checkingTicket,
                    token
                }))
            }
            return
        }
        console.log(checkingTicket, 'checkingTicket')
        // if (isAuth) {
        //     dispatch(postTicket({
        //         ticket: checkingTicket,
        //         token
        //     }))
        //     // const data = await dispatch(postTicket({
        //     //     ticket: checkingTicket,
        //     //     token
        //     // }))
        //     // if (data.payload) {
        //     //     // setValidated(error)
        //     //     dispatch(setCheckingFail())
        //     //     dispatch(setCheckingSuccess())
        //     //     dispatch(setCheckingError())
        //     // }
        //     // return
        // }

        // find checking date in Results
        const checkingResult = results.find(result => result.date === checkingTicket.date)
        console.log(checkingResult, 'checkingResult')
        // not found  
        if (!checkingResult) {
            // still pass date in to render
            dispatch(setPickedResult({
                ...checkingResult,
                date: checkingTicket.date
            }))

            // if (isAuth) {
            //     dispatch(postTicket({
            //         ticket: checkingTicket,
            //         token
            //     }))
            //     // const data = await dispatch(postTicket({
            //     //     ticket: checkingTicket,
            //     //     token
            //     // }))
            //     // if (data.payload) {
            //     //     setValidated(error)
            //     //     dispatch(setCheckingFail())
            //     //     dispatch(setCheckingSuccess())
            //     //     dispatch(setCheckingError())
            //     // }
            // } else {
                // tach err vs msg ra, msg -> hthi ben checked & err -> validation err
                // set msg & clear err in here
            dispatch(setCheckingError('Not found result'))
            dispatch(setCheckingSuccess())
            dispatch(setCheckingFail())
            // }

            return
        }
        // if (error !== '') {
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

        // 3. pass msg to show if found index (return !== -1) , i.e won a prize + add check if be user
        // neu trung giai
        let wonPrize = ''
        if (indexCheckingJP !== -1) {
            // // neu la user thi add check to his
            // isAuth && dispatch(postTicket({
            //     ticket: {
            //         ...checkingTicket,
            //         wonPrize: 'jackpot'
            //     },
            //     token: token
            // }))
            // dispatch(setCheckingSuccess('you have won the jackpot'))
            // // clear old state
            // dispatch(setCheckingFail())
            // dispatch(setCheckingError())
            wonPrize = 'Jackpot'
        } else if (indexChecking1P !== -1) {
            // isAuth && dispatch(postTicket({
            //     ticket: {
            //         ...checkingTicket,
            //         wonPrize: 'firstPrize'
            //     },
            //     token: token
            // }))
            // dispatch(setCheckingSuccess('you have won the first prize'))
            // dispatch(setCheckingFail())
            // dispatch(setCheckingError())
            wonPrize = 'First prize'
        } else if (indexChecking2P !== -1) {
            // isAuth && dispatch(postTicket({
            //     ticket: {
            //         ...checkingTicket,
            //         wonPrize: 'secondPrize'
            //     },
            //     token: token
            // }))
            // dispatch(setCheckingSuccess('you have won the second prize'))
            // dispatch(setCheckingFail())
            // dispatch(setCheckingError())
            wonPrize = 'Second prize'
        } else if (indexChecking3P !== -1) {
            // isAuth && dispatch(postTicket({
            //     ticket: {
            //         ...checkingTicket,
            //         wonPrize: 'thirdPrize'
            //     },
            //     token: token
            // }))
            // dispatch(setCheckingSuccess('you have won the third prize'))
            // dispatch(setCheckingFail())
            // dispatch(setCheckingError())
            wonPrize = '3rd prize'
        } else if (indexChecking4P !== -1) {
            // isAuth && dispatch(postTicket({
            //     ticket: {
            //         ...checkingTicket,
            //         wonPrize: 'fourthPrize'
            //     },
            //     token: token
            // }))
            // dispatch(setCheckingSuccess('you have won the fourth prize'))
            // dispatch(setCheckingFail())
            // dispatch(setCheckingError())
            wonPrize = 'Fourth prize'
        } else if (indexChecking5P !== -1) {
            // isAuth && dispatch(postTicket({
            //     ticket: {
            //         ...checkingTicket,
            //         wonPrize: 'fifthPrize'
            //     },
            //     token: token
            // }))
            // dispatch(setCheckingSuccess('you have won the fifth prize'))
            // dispatch(setCheckingFail())
            // dispatch(setCheckingError())
            wonPrize = 'Fifth prize'
        }


        // else {
        //     // neu ko trung
        //     const ticket = {
        //         ticket: checkingTicket,
        //         token: token
        //     }
        //     isAuth && dispatch(postTicket(ticket))
        //     dispatch(setCheckingFail('no won any prize'))
        //     dispatch(setCheckingSuccess())
        //     dispatch(setCheckingError())

        //     // clear input
        //     dispatch(setTicket())
        // }



        // } else {
        //     // neu ko co result cua ngay dc tim
        //     dispatch(setCheckingError('Not found result'))
        //     dispatch(setCheckingSuccess())
        //     dispatch(setCheckingFail())

        //     // still pass date in to render
        //     dispatch(setPickedResult({
        //         ...checkingResult,
        //         date: checkingTicket.date
        //     }))
        // }

        const ticket = {
            // ticket: checkingTicket,
            ticket: {
                ...checkingTicket,
                wonPrize: wonPrize,
            },
            token: token
        }

        console.log(ticket)

        if (isAuth) {
            const data = await dispatch(postTicket(ticket))
            if (data.payload) {
                // dispatch(postTicket(ticket))
                if (wonPrize !== '') {
                    // is won
                    dispatch(setCheckingSuccess(`You have won the ${wonPrize}`))
                    dispatch(setCheckingFail())
                    dispatch(setCheckingError())
                    // // clear input
                    // dispatch(setTicket())

                } else {
                    // if not won
                    dispatch(setCheckingFail('no won any prize'))
                    dispatch(setCheckingSuccess())
                    dispatch(setCheckingError())
                    // dispatch(setTicket())
                }

            }
            // clear checking result
            // await dispatch(setPickedResult())
            // dispatch(setPickedResult())
            // if (data.error) {
            //     setCheckingSuccess()
            // }
        } else {
            if (wonPrize !== '') {
                dispatch(setCheckingSuccess(`You have won the ${<strong>wonPrize</strong>}`))
                dispatch(setCheckingFail())
                dispatch(setCheckingError())
                dispatch(setTicket())

            } else {
                dispatch(setCheckingFail('no won any prize'))
                dispatch(setCheckingSuccess())
                dispatch(setCheckingError())
                dispatch(setTicket())
            }
        }


    }


    return (
        <Form inline className="w-50">
            <div className="text-center text-success fs-1 fw-bolder">
                Check the ticket
            </div>
            {error !== '' && <Alert color="danger">{error}</Alert>}
            {validated !== '' && <Alert color="danger">{validated}</Alert>}
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