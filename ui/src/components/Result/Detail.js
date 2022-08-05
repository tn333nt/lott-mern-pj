
import { Table } from 'reactstrap';

export const ResultDetail = props => {

    const result = props.result

    return (

        <Table bordered className="table-light text-center" responsive >
            <thead>
                <tr className="text-secondary">
                    <th> prize </th>
                    <th> winning values </th>
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

    )
}