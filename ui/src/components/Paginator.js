import { Button } from "reactstrap"
import { useDispatch, useSelector } from 'react-redux';

import { fetchPreviousPage, fetchNextPage } from '../flux/resultsSlice'

const Paginator = props => {

  const dispatch = useDispatch()

  const totalResults = useSelector(state => state.results.totalResults)
  const currentPage = useSelector(state => state.results.currentPage)

  const lastPage = Math.ceil(totalResults / 6) // hardcoded here

  return (
    <div className="d-flex justify-content-center p-1 m-3">
      {currentPage > 1 && (
        <Button
          outline
          className="me-5 px-3 "
          onClick={() => dispatch(fetchPreviousPage())}
        >
          Previous
        </Button>
      )}
      {currentPage < lastPage && (
        <Button
          outline
          className="me-5 px-3 "
          onClick={() => dispatch(fetchNextPage())}
        >
          Next
        </Button>
      )}
    </div>
  )
}

export default Paginator;
