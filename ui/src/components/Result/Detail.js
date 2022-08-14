
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';

export const ResultDetail = props => {

    const result = props.result

    const indexJP = useSelector(state => state.tickets.indexes.JP)
    const indexP1 = useSelector(state => state.tickets.indexes.P1)
    const indexP2 = useSelector(state => state.tickets.indexes.P2)
    const indexP3 = useSelector(state => state.tickets.indexes.P3)
    const indexP4 = useSelector(state => state.tickets.indexes.P4)
    const indexP5 = useSelector(state => state.tickets.indexes.P5)

    return (

        <Table bordered responsive
            className={props.color ? `table-${props.color} text-center` : 'text-center'}
        >
            <thead>
                <tr className={props.text ? `text-${props.text}` : "text-secondary"}>
                    <th> Prize </th>
                    <th> Winning values </th>
                    <th> Reward ($) </th>
                </tr>
            </thead>
            <tbody>
                {/* chuyen compare obj sang compare arr.length vi req auto tao wV : [] */}

                {result.jackpot.winningValues.length > 0 && (
                    <tr>
                        <th scope="row"> Jackpot</th>
                        <td >
                            {result.jackpot.winningValues.map((value, index) => (
                                <span
                                    className={+indexJP === +index ? 'text-success fw-bold' : ''}
                                >{value}</span>
                            ))}
                        </td>
                        <td>{result.jackpot.reward}</td>
                    </tr>
                )}

                {result.firstPrizes.winningValues.length > 0 && (
                    <tr>
                        <th scope="row"> First Prizes</th>
                        <td className="d-flex flex-wrap justify-content-evenly">
                            {result.firstPrizes.winningValues.map((value, index) => (
                                <span
                                    className={+indexP1 === +index ? 'text-success fw-bold' : ''}
                                >{value}</span>
                            ))}
                        </td >
                        <td>{result.firstPrizes.reward}</td>
                    </tr>
                )}

                {result.secondPrizes.winningValues.length > 0 && (
                    <tr>
                        <th scope="row"> Second Prizes</th>
                        <td className="d-flex flex-wrap justify-content-evenly">
                            {result.secondPrizes.winningValues.map((value, index) => (
                                <span
                                    className={+indexP2 === +index ? 'text-success fw-bold' : ''}
                                >{value}</span>
                            ))}
                        </td>
                        <td>{result.secondPrizes.reward}</td>
                    </tr>
                )}

                {result.thirdPrizes.winningValues.length > 0 && (
                    <tr>
                        <th scope="row"> Third Prizes</th>
                        <td className="d-flex flex-wrap justify-content-evenly">
                            {result.thirdPrizes.winningValues.map((value, index) => (
                                <span
                                    className={+indexP3 === +index ? 'text-success fw-bold' : ''}
                                >{value}</span>
                            ))}
                        </td>
                        <td>{result.thirdPrizes.reward}</td>
                    </tr>
                )}

                {result.fourthPrizes.winningValues.length > 0 && (
                    <tr>
                        <th scope="row"> Fourth Prizes</th>
                        <td className="d-flex flex-wrap justify-content-evenly">
                            {result.fourthPrizes.winningValues.map((value, index) => (
                                <span
                                    className={+indexP4 === +index ? 'text-success fw-bold' : ''}
                                >{value}</span>
                            ))}
                        </td>
                        <td>{result.fourthPrizes.reward}</td>
                    </tr>
                )}

                {result.fifthPrizes.winningValues.length > 0 && (
                    <tr>
                        <th scope="row"> Fifth Prizes</th>
                        <td className="d-flex flex-wrap justify-content-evenly">
                            {result.fifthPrizes.winningValues.map((value, index) => (
                                <span
                                    className={+indexP5 === +index ? 'text-success fw-bold' : ''}
                                >{value}</span>
                            ))}
                        </td>
                        <td>{result.fifthPrizes.reward}</td>
                    </tr>
                )}

                {
                    result?.sixthPrizes.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> Sixth Prizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result?.sixthPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result?.sixthPrizes.reward}</td>
                        </tr>
                    )
                }

                {
                    result?.seventhPrizes.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> Seventh Prizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.seventhPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.seventhPrizes.reward}</td>
                        </tr>
                    )
                }

                {
                    result?.eighthPrizes.winningValues.length > 0 && (
                        <tr>
                            <th scope="row"> Eighth Prizes</th>
                            <td className="d-flex flex-wrap justify-content-evenly">
                                {result.eighthPrizes.winningValues.map(value => <span>{value}</span>)}
                            </td>
                            <td>{result.eighthPrizes.reward}</td>
                        </tr>
                    )
                }

            </tbody>
        </Table>

    )
}