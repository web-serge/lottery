import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const lotteryApi = createApi({
    reducerPath: 'lotteryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://httpbin.org' }),
    endpoints: (builder) => ({
        postLotteryTicket: builder.mutation<{json: RequestBody}, RequestBody>({
            query: (body) => ({
                url: 'post',
                method: 'POST',
                body: body
            })
        }),
    }),
})

export const { usePostLotteryTicketMutation } = lotteryApi

export type RequestBody = {
    selectedNumber: {
        firstField: number[],
        secondField: number[],
    },
    isTicketWon: boolean
}