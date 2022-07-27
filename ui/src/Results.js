
import { useState } from 'react';
import dateFormat from 'dateformat'
import { UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Table } from 'reactstrap'
import _ from "lodash";

import { results } from './data'
import { BtnComponent } from './components/Button';
import { Search } from './components/Search';
import { ModalForm } from './components/Modal';
import { toggleModalAdd, toggleModalUpdate } from './flux/resultsSlice';
import { useDispatch } from 'react-redux';



const Results = () => {

    const dispatch = useDispatch()


    // const [isOpen, setIsOpen] = useState(false)

    // const toggleModal = () => {
    //     console.log(isOpen, 1)
    //     setIsOpen(!isOpen)
    //     console.log(isOpen, 2)
    // }
    const handleSearch = () => {
        dispatch(toggleModalAdd())
    }
    const handleDelete = () => {
        dispatch(toggleModalAdd())
    }


    return (
        <div className="container pt-3 ">
            {/* {console.log(isOpen)} */}
            <ModalForm />
            <title className="row"><div className="col-12 text-center text-primary fs-1 fw-bolder">
                <div>result management</div>
                <hr />
            </div></title>

            <div className="m-3 mb-5 d-flex justify-content-between">
                <BtnComponent text=" + add new result " handleClick={() => dispatch(toggleModalAdd())} />
                <Search handleSearch={handleSearch} />
            </div>

            <UncontrolledAccordion defaultOpen="0" stayOpen>
                {results && results.map((result, index) => (
                    <div key={result.resultId.toString()} className="col-12 mt-3" >
                        <AccordionItem>
                            {/* {console.log(_.isEqual(result.sixthPrizes, {}))} */}

                            <AccordionHeader targetId={result.resultId.toString()} >
                                <div className="d-flex justify-content-between w-100 px-5">
                                    <div >date :  <strong>{dateFormat(result.date, "dd - mm - yyyy")}</strong></div>
                                    <div >game :  <strong>{result.game}</strong></div>
                                </div>
                            </AccordionHeader>

                            <AccordionBody accordionId={result.resultId.toString()}>
                                <Table bordered className="table-light text-center shadow-sm p-3 bg-body rounded text-dark" responsive >
                                    <thead>
                                        <tr className="text-secondary">
                                            <th> prize </th>
                                            <th> winning numbers </th>
                                            <th> reward ($) </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {console.log(typeof prizesArr[index], 1)}
                                        {console.log(result.prizesArr[index], 2)} */}

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
                                                        // console.log(value, result.resultId)
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

                                        {!_.isEqual(result.sixthPrizes, {}) && (
                                            <tr>
                                                {/* {console.log(345)} */}
                                                <th scope="row"> sixthPrizes</th>
                                                <td className="d-flex flex-wrap justify-content-evenly">
                                                    {result.sixthPrizes.winningValues.map(value => <span>{value}</span>)}
                                                </td>
                                                <td>{result.sixthPrizes.reward}</td>
                                            </tr>
                                        )}

                                        {!_.isEqual(result.seventhPrizes, {}) && (
                                            <tr>
                                                <th scope="row"> seventhPrizes</th>
                                                <td className="d-flex flex-wrap justify-content-evenly">
                                                    {result.seventhPrizes.winningValues.map(value => <span>{value}</span>)}
                                                </td>
                                                <td>{result.seventhPrizes.reward}</td>
                                            </tr>
                                        )}

                                        {!_.isEqual(result.eighthPrizes, {}) && (
                                            <tr>
                                                <th scope="row"> eighthPrizes</th>
                                                <td className="d-flex flex-wrap justify-content-evenly">
                                                    {result.eighthPrizes.winningValues.map(value => <span>{value}</span>)}
                                                </td>
                                                <td>{result.eighthPrizes.reward}</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-end">
                                    <BtnComponent text="update" handleClick={() => dispatch(toggleModalUpdate(true))} isUpdate={true} />
                                    <BtnComponent text="Delete" handleClick={handleDelete} />
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </div>

                ))}
            </UncontrolledAccordion>
        </div>
    )

}

export default Results