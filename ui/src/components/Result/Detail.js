
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import _ from "lodash";

import { setResult, toggleModalAdd, toggleModalUpdate } from '../../flux/resultsSlice';
import { useEffect } from 'react';

export const ResultDetail = props => {

    const dispatch = useDispatch()

    const result = props.result
    const results = useSelector(state => state.results.results)

    // sao set o onClick ma no van run all vay ???


    const handleUpdate = resultId => {
        const r = results.find(result => result._id === resultId)
        console.log(r, 444)
        // () => dispatch(toggleModalUpdate(result))

        dispatch(toggleModalUpdate())
        dispatch(setResult(r))
        console.log(pickedResult, 333); // sao no ko truyen vao ?

    }

    const pickedResult = useSelector(state => state.results.pickedResult)


    const handleDelete = () => {
        dispatch(toggleModalUpdate(result))
    }


    return (
        <>

            <Table bordered className="table-light text-center shadow-sm p-3 bg-body rounded text-dark" responsive >
                <thead>
                    <tr className="text-secondary">
                        <th> prize </th>
                        <th> winning numbers </th>
                        <th> reward ($) </th>
                    </tr>
                </thead>
                <tbody>

                    {!_.isEqual(result.jackpot, {}) && (
                        <tr>
                            <th scope="row"> jackpot</th>
                            <td >
                                {result.jackpot.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.jackpot.reward}</td>
                        </tr>
                    )}

                    {!_.isEqual(result.firstPrizes, {}) && (
                        <tr>
                            <th scope="row"> firstPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.firstPrizes.winningValues.map(value => {
                                    // console.log(value, result._id)
                                    return <div >{value}</div>
                                })}
                            </td >
                            <td>{result.firstPrizes.reward}</td>
                        </tr>
                    )}

                    {!_.isEqual(result.secondPrizes, {}) && (
                        <tr>
                            <th scope="row"> secondPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.secondPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.secondPrizes.reward}</td>
                        </tr>
                    )}

                    {!_.isEqual(result.thirdPrizes, {}) && (
                        <tr>
                            <th scope="row"> thirdPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.thirdPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.thirdPrizes.reward}</td>
                        </tr>
                    )}

                    {!_.isEqual(result.fourthPrizes, {}) && (
                        <tr>
                            <th scope="row"> thirdPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.fourthPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.fourthPrizes.reward}</td>
                        </tr>
                    )}

                    {!_.isEqual(result.fifthPrizes, {}) && (
                        <tr>
                            <th scope="row"> fifthPrizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.fifthPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.fifthPrizes.reward}</td>
                        </tr>
                    )}

                    {
                        // !_.isEqual(result.sixthPrizes, {}) && (
                        //     <tr>
                        //         {/* {console.log(345)} */}
                        //         <th scope="row"> sixthPrizes</th>
                        //         <td className="d-flex flex-wrap justify-content-evenly">
                        //             {result.sixthPrizes.winningValues.map(value => <span>{value}</span>)}
                        //         </td>
                        //         <td>{result.sixthPrizes.reward}</td>
                        //     </tr>
                        // )
                    }

                    {
                        // !_.isEqual(result.seventhPrizes, {}) && (
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
                        // !_.isEqual(result.eighthPrizes, {}) && (
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
                    onClick={() => handleUpdate(props.result._id)}
                    isUpdate={true}
                >
                    update
                </Button>
                <Button
                    className="me-5 px-3 "
                    onClick={() => props.handleDelete}
                >
                    delete
                </Button>
            </div>

        </>
    )
}