import { configureStore } from '@reduxjs/toolkit'

import resultsSlice from './slices/resultsSlice'
import usersSlice from './slices/usersSlice'
import ticketsSlice from './slices/ticketsSlice'

const store = configureStore({
    reducer: {
        results : resultsSlice,
        users: usersSlice,
        tickets: ticketsSlice
    }
})

export default store
