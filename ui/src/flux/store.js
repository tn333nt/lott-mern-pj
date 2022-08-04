import { configureStore } from '@reduxjs/toolkit'

import resultsSlice from './resultsSlice'

const store = configureStore({
    reducer: {
        results : resultsSlice
    }
})

export default store
