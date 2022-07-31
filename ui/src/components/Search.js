import { useState } from "react";
import { Button, Input } from "reactstrap";
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchText } from "../flux/resultsSlice";

export const Search = props => {

    const dispatch = useDispatch()

    const searchText = useSelector(state => state.results.searchText)

    const handleChange = (e) => {
        const value = e.target.value
        dispatch(setSearchText(value))
        console.log(searchText, 123)
    }

    return (
        <div
            className="d-flex align-items-center"
        >
            <Input type="search" placeholder={props.placeholder} name="search" onChange={handleChange} />
            <Button className="ms-2 d-flex" onClick={() => props.handleSearch()}>
                <FaSearch className="align-self-center" />
            </Button>
        </div>
    )
}