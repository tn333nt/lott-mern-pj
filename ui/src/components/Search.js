import { Button, Input } from "reactstrap";
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { setSearchText } from "../flux/slices/sharedSlice";

export const Search = props => {
    const { placeholder, color, handleSearch } = props
    
    const dispatch = useDispatch()
    const handleChange = e => {
        const value = e.target.value
        dispatch(setSearchText(value))
    }

    return (
        <div
            className="d-flex align-items-center"
        >
            <Input
                type="search"
                placeholder={placeholder}
                name="search"
                onChange={handleChange}
            />
            <Button
                className="ms-2 d-flex align-self-stretch align-items-center"
                color={color ? color : "dark"}
                onClick={() => handleSearch()}
            >
                <FaSearch />
            </Button>
        </div>
    )
}