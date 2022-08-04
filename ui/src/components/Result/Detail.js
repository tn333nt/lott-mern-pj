
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'reactstrap';
// import _ from "lodash";

import { setValues, toggleModalMessage, toggleModalUpdate } from '../../flux/resultsSlice';
import dateFormat from 'dateformat'

export const ResultDetail = props => {

    const dispatch = useDispatch()

    const result = props.result
    const results = useSelector(state => state.results.results)

    const handleUpdateModal = resultId => {
        const updatingResult = results.find(result => {
            return result._id === resultId
        })

        dispatch(toggleModalUpdate())
        dispatch(setValues(updatingResult))

    }

    const handleDeleteModal = resultId => {
        const deletingResult = results.find(result => result._id === resultId)
        const date = dateFormat(result.date, "yyyy-mm-dd")

        const confirm = `delete result of ${date} ?`

        dispatch(toggleModalMessage(confirm))
        dispatch(setValues(deletingResult))

    }

    return (
        <>

            <Table bordered className="table-light text-center shadow-sm p-3 bg-body rounded text-dark" responsive >
                <thead>
                    <tr className="text-secondary">
                        <th> prize </th>
                        <th> winning tickets </th>
                        <th> reward ($) </th>
                    </tr>
                </thead>
                <tbody>
                    {/* chuyen compare obj sang compare arr.length vi req auto tao wV : [] */}

                    {result.jackpot.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> jackpot</th>
                            <td >
                                {result.jackpot.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.jackpot.reward}</td>
                        </tr>
                    )}

                    {result.firstPrizes.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> firstPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.firstPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td >
                            <td>{result.firstPrizes.reward}</td>
                        </tr>
                    )}

                    {result.secondPrizes.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> secondPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.secondPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.secondPrizes.reward}</td>
                        </tr>
                    )}

                    {result.thirdPrizes.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> thirdPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.thirdPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.thirdPrizes.reward}</td>
                        </tr>
                    )}

                    {result.fourthPrizes.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> fourthPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.fourthPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.fourthPrizes.reward}</td>
                        </tr>
                    )}

                    {result.fifthPrizes.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> fifthPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.fifthPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.fifthPrizes.reward}</td>
                        </tr>
                    )}

                    {
                        // result.sixthPrizes.winningValues.length > 0 && (
                        //     <tr>
                        //         <th scope="row"> sixthPrizes</th>
                        //         <td className="d-flex flex-wrap justify-content-evenly">
                        //             {result.sixthPrizes.winningValues.map(value => <span>{value}</span>)}
                        //         </td>
                        //         <td>{result.sixthPrizes.reward}</td>
                        //     </tr>
                        // )
                    }

                    {
                        // result.seventhPrizes.winningValues.length > 0 && (
                        //     <tr>
                        //         <th scope="row"> seventhPrizes</th>
                        //         <td className="d-flex flex-wrap justify-content-evenly">
                        //             {result.seventhPrizes.winningValues.map(value => <span>{value}</span>)}
                        //         </td>
                        //         <td>{result.seventhPrizes.reward}</td>
                        //     </tr>
                        // )
                    }

                    {
                        // result.eighthPrizes.winningValues.length > 0 && (
                        //     <tr>
                        //         <th scope="row"> eighthPrizes</th>
                        //         <td className="d-flex flex-wrap justify-content-evenly">
                        //             {result.eighthPrizes.winningValues.map(value => <span>{value}</span>)}
                        //         </td>
                        //         <td>{result.eighthPrizes.reward}</td>
                        //     </tr>
                        // )
                    }

                </tbody>
            </Table>

            <div className="d-flex justify-content-end">
                <Button
                    className="me-5 px-3 "
                    onClick={() => handleUpdateModal(props.result._id)}
                >
                    update
                </Button>
                <Button
                    className="me-5 px-3 "
                    onClick={() => handleDeleteModal(props.result._id)}
                >
                    delete
                </Button>
            </div>

        </>
    )
}