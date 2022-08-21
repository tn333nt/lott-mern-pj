import { configureStore } from '@reduxjs/toolkit'

import resultsSlice from './slices/resultsSlice'
import usersSlice from './slices/usersSlice'
import ticketsSlice from './slices/ticketsSlice'
import authSlice from './slices/authSlice'
import sharedSlice from './slices/sharedSlice'

const store = configureStore({
    reducer: {
        shared: sharedSlice,
        results : resultsSlice,
        users: usersSlice,
        tickets: ticketsSlice,
        auth: authSlice,
    }
})

export default store


