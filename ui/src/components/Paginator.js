import { Button } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  fetchPreviousPage as fetchPreviousPageForResults,
  fetchNextPage as fetchNextPageForResults
} from '../flux/resultsSlice'


import {
  fetchPreviousPage as fetchPreviousPageForUsers,
  fetchNextPage as fetchNextPageForUsers
} from '../flux/usersSlice'

const Paginator = props => {

  const dispatch = useDispatch()
  const location = useLocation()

  const beingInResults = location.pathname === "/results"
  const beingInUsers = location.pathname === "/users"

  const totalResults = useSelector(state => state.results.results.length)
  const totalUsers = useSelector(state => state.users.users.length)

  // ! only call hooks at the top level

  const currentPageResults = useSelector(state => state.results.currentPage)
  const currentPageUsers = useSelector(state => state.users.currentPage)

  const lastPageResults = Math.ceil(totalResults / 9)
  const lastPageUsers = Math.ceil(totalUsers / 9)

  console.log(beingInResults)
  console.log(currentPageUsers > 1)

  const handlePrevious = () => {
    if (beingInResults) {
      dispatch(fetchPreviousPageForResults())
    }
    if (beingInUsers) {
      dispatch(fetchPreviousPageForUsers())
    }
  }

  const handleNext = () => {
    if (beingInResults) {
      dispatch(fetchNextPageForResults())
    }
    if (beingInUsers) {
      dispatch(fetchNextPageForUsers())
    }
  }

  return (
    <div className="d-flex justify-content-center p-1 m-3">

      {(
        (beingInResults && currentPageResults > 1) ||
        (beingInUsers && currentPageUsers > 1))
        && (
          <Button
            outline
            className="me-5 px-3 "
            onClick={handlePrevious}
          >
            Previous
          </Button>
        )}

      {(
        (beingInResults && currentPageResults < lastPageResults) ||
        (beingInUsers && currentPageUsers < lastPageUsers))
        && (
          <Button
            outline
            color="dark"
            className="me-5 px-3"
            onClick={handleNext}
          >
            Next
          </Button>
        )}

    </div>
  )
}

export default Paginator;

// later : 
// go to first/last page
// show current page & next(+1) & prev (-1)