import { configureStore } from '@reduxjs/toolkit'

import resultsSlice from './resultsSlice'
import usersSlice from './usersSlice'

const store = configureStore({
    reducer: {
        results : resultsSlice,
        users: usersSlice
    }
})

export default store
