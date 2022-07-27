
import { Form, FormGroup, Label, Input, Row, Col, FormText } from 'reactstrap';
import { useSelector } from 'react-redux';


export const FormResult = props => {
    
    const prizesArr = ['jackpotInput', 'firstPrizeInput', 'secondPrizeInput', 'thirdPrizeInput', 'fourthPrizeInput', 'fifthPrizeInput', 'sixthPrizeInput', 'sevenPrizeInput', 'eightPrizeInput']
    const titles = ['jackpot', '1st prizes', '2nd prizes', '3rd prizes', '4th prizes', '5th prizes', '6th prizes', '7th prizes', '8th prizes']
    
    const prizesAmount = useSelector(state => state.results.results.prizesAmount)

    return (
        <Form className='px-2' inline>
            <FormText className='pb-3' >
                * pattern : xxxxxx xxxxxx xxxxxx
            </FormText>

            {prizesArr.map((item, index) => (
                <FormGroup
                    floating
                    // {item[index] <= prizesAmount ? '' : 'disabled'}
                >
                    <Input
                        name={item}
                        type="text"
                        id={item}
                        placeholder={titles[index]}
                    />
                    <Label for={item}>
                        {titles[index]}
                    </Label>
                </FormGroup>
            ))}

        </Form >
    )
}