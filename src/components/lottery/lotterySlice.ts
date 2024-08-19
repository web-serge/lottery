import { toggleSelection } from '../../utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    selectedFirstField: [] as number[],
    selectedSecondField: [] as number [],
    result: null as string | null,
}

const lotterySlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        toggleFieldSelection(state, action: PayloadAction<{ field: 'firstField' | 'secondField'; number: number }>) {
            const { field, number } = action.payload
            if (field === 'firstField') {
                state.selectedFirstField = toggleSelection(state.selectedFirstField, number)
            } else if (field === 'secondField') {
                state.selectedSecondField = toggleSelection(state.selectedSecondField, number)
            }
        },
        setResult(state, action: PayloadAction<string>) {
            state.result = action.payload
        },
        setRandomFields(state, action: PayloadAction<{ randomFirstField: number[], randomSecondField: number[] }>) {
            state.selectedFirstField = action.payload.randomFirstField
            state.selectedSecondField = action.payload.randomSecondField
        },
    },
    selectors: {
        selectFirstField: state => state.selectedFirstField,
        selectSecondField: state => state.selectedSecondField,
        selectResult: state => state.result,
    },
})

export const { toggleFieldSelection, setResult, setRandomFields } = lotterySlice.actions
export const { selectResult, selectSecondField, selectFirstField } = lotterySlice.selectors
export const lotteryReducer = lotterySlice.reducer