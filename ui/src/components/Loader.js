import { Spinner } from 'reactstrap';

const Loader = props => {

    return (
        <div className="m-3 d-flex justify-content-center" >
            <Spinner
                className="m-3"
                color={props.color}
            >
                Loading...
            </Spinner>
        </div>
    )
}

export default Loader
