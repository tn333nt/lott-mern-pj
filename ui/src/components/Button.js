
import { Button } from 'reactstrap'


export const BtnComponent = props => {

    return (
        <Button className="me-5 px-3 " onClick={() => props.handleClick()}>
            {props.text}
        </Button>
    )
}
