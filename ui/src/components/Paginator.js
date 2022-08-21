import { Button } from "reactstrap"

const Paginator = props => {

  const {currentPage, lastPage, handlePrevious, handleNext} = props

  return (
    <div className="d-flex justify-content-center p-1 m-3">
      {+currentPage > 1 && (
        <Button
          outline
          color="dark"
          className="me-5 px-5"
          onClick={() => handlePrevious()}
        >
          Previous
        </Button>
      )}

      {+currentPage < +lastPage && (
        <Button
          outline
          color="dark"
          className="me-5 px-5"
          onClick={() => handleNext()}
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