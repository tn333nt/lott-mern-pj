import { useState } from "react";
import { Button, Input } from "reactstrap";
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { setSearchText as setSearchTextForResults } from "../flux/slices/resultsSlice";
import { setSearchText as setSearchTextForUsers } from "../flux/slices/usersSlice";

export const Search = props => {
    const location = useLocation();

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    const handleSearch = () => {
        if (location.pathname === "/results") {
            dispatch(setSearchTextForResults(search))
        }
        if (location.pathname === "/users") {
            dispatch(setSearchTextForUsers(search))
        }
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
            <Button className="ms-2 d-flex align-self-stretch align-items-center" color={props.color ? props.color : "dark" } onClick={handleSearch}>
                <FaSearch />
            </Button>
        </div>
    )
}