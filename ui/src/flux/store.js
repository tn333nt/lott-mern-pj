import { configureStore } from '@reduxjs/toolkit'

import resultsSlice from './slices/resultsSlice'
import usersSlice from './slices/usersSlice'
import ticketsSlice from './slices/ticketsSlice'
import authSlice from './slices/authSlice'

console.log(usersSlice, 1874613)

const store = configureStore({
    reducer: {
        results : resultsSlice,
        users: usersSlice,
        tickets: ticketsSlice,
        auth: authSlice
    }
})

export default store

console.log(store, 'test 1')
console.log(store.getState(), 'test 2')
console.log(store.dispatch, 'test 3')
console.log(store.replaceReducer, 'test 4')
console.log(store.subscribe, 'test 5')

// https://redux.js.org/tutorials/fundamentals/part-4-store#middleware

