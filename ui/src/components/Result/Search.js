import { useState } from "react";
import { Button, Input } from "reactstrap";
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { setSearchText } from "../../flux/resultsSlice";

export const Search = props => {

    const dispatch = useDispatch()

    const [search, setSearch] = useState('') // searching value to update input

    const handleSearch = () => {
        dispatch(setSearchText(search))
    }

    return (
        <div
            className="d-flex align-items-center"
        >
            <Input
                type="search"
                placeholder={props.placeholder}
                name="search"
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="ms-2 d-flex" onClick={handleSearch}>
                <FaSearch />
            </Button>
        </div>
    )
}