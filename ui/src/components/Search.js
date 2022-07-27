import { Button, Input } from "reactstrap";
import { FaSearch } from 'react-icons/fa';


export const Search = props => {

    const handleChange = (e) => {}

    return (
        <div className="d-flex align-items-center">
            <Input type="search" placeholder="search . . ." name="search" handleChange={handleChange} />
            <Button className="ms-2 d-flex" onClick={() => props.handleSearch()}>
                <FaSearch className="align-self-center" />
            </Button>
        </div>
    )
}