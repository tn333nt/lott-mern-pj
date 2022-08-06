
import { useEffect, useState } from 'react';
import { Input, Spinner, Button, Table, Form, Col, Alert, FormGroup, Label, FormText, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllResults, toggleModalAdd, toggleModalMessage, setValues, toggleModalUpdate } from '../../flux/resultsSlice';
import Paginator from '../../components/Paginator';
import Messenger from '../../components/Messenger';
import { Link } from 'react-router-dom';
import { ResultDetail } from '../../components/Result/Detail';
import { isEmail, length } from '../../util/validators';


const Home = () => {

    const dispatch = useDispatch()

    const results = useSelector(state => state.results.results)
    console.log(results)
    const isLoading = useSelector(state => state.results.isLoading)

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


    const [searchText, setSearchText] = useState('')
    const [validated, setValidated] = useState('')

    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value

        setSearchText(e.target.value)

        if (name === 'ticket') {
            const isValidated = length({ exact: 6 })(value)
            !isValidated && setValidated('6 numbers for each ticket')
            isValidated && setValidated('')
        }

    }

    const handleCheck = () => {
        // 1. find result contains checking date => return this date (pickedResult, use again maybe)
        // 2. map through each prizes @@ & its winningValues => check if ticket value === winning value
        // 3. if true => set isWon{prize}P (viet tat)
        // 4. check in each <span> to highlight or not
    }

    // const handleDeleteAll = () => {
    //     dispatch(toggleModalMessage("delete all results ?"))
    // }

    // const handleDelete = userId => {
    //     const deletingUser = results.find(user => user._id === userId)
    //     const username = deletingUser.username

    //     const confirm = `delete user ${username} ?`

    //     dispatch(toggleModalMessage(confirm))
    //     dispatch(setUser(deletingUser))

    // }


    useEffect(() => {
        dispatch(fetchAllResults())
    }, [dispatch])
    // later : set specific result to fetch

    return (
        <div className="container pt-5 mw-100">
            <Messenger />

            <section>
                <Row>
                    <Col xs="12" md="6" className="d-flex justify-content-center">
                        <Form inline className="w-50">
                            <div className="text-center text-success fs-1 fw-bolder">
                                check the ticket
                                {/* 'ticket' , or 'value' like normally call */}
                            </div>
                            {validated !== '' && <Alert color="danger">{validated}</Alert>}
                            <FormGroup floating className="mt-3">
                                <Input
                                    name="ticket"
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
                                className="mt-4"
                                disabled={validated !== '' ? true : false}
                                onClick={handleCheck}
                            >
                                check
                            </Button>
                        </Form>
                    </Col>

                    <Col xs="12" md="6" className="d-flex flex-column align-content-stretch">
                        <div style={{ marginRight: 21 }}>
                            <Alert color="primary" className="text-center fs-1 fw-bolder">
                                latest result
                                {/* result ? `result of ${result.date}` : 'latest result' */}
                            </Alert>
                            {/* {validated !== '' && <p className="text-success">{validated}</p>} */}
                            {/* {validated !== '' && <p className="text-danger">{validated}</p>} */}
                        </div>
                        <div style={{ marginRight: 21 }}>
                            {/* hardcode here */}
                            <p>{results[0].date}</p>
                            <ResultDetail result={results[0]} text="dark" />
                        </div>
                        {/* 
                            {
                                !isLoading && searchText && searchedUsers.length <= 0 && (
                                    <p style={{ textAlign: 'center' }}> not found user </p>
                                )
                            } */}
                        <p>see all results <Link to="/results">results</Link></p>
                    </Col>
                </Row>
            </section>

            <hr className="mt-5" />
            <section>
                <title className="row">
                    <div className="col-12 text-center text-danger fs-1 fw-bolder">
                        <div> checking history</div>
                    </div>
                </title>
            </section>


        </div >
    )

}

export default Home