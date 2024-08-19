import { configureStore } from '@reduxjs/toolkit'
import { lotteryReducer } from '../components/lottery/lotterySlice.ts'
import { lotteryApi } from '../api/lotteryApi.ts'

export const store = configureStore({
    reducer: {
        todos: lotteryReducer,
        [lotteryApi.reducerPath]: lotteryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(lotteryApi.middleware)
})