import { useCallback } from 'react'
import { compareNumbers, randomNumbers } from '../../utils'
import { Spinner, Typography } from '../index.ts'
import { Button } from '../button/button.tsx'
import s from './lottery.module.css'
import { selectFirstField, selectResult, selectSecondField, setResult } from './lotterySlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { usePostLotteryTicketMutation } from '../../api/lotteryApi.ts'
import { toast } from 'sonner'
import { Fields } from './fields/Fields.tsx'


export const Lottery = () => {
    const dispatch = useDispatch()

    const selectedFirstField = useSelector(selectFirstField)
    const selectedSecondField = useSelector(selectSecondField)
    const result = useSelector(selectResult)

    const [postLotteryTicket, { isLoading }] = usePostLotteryTicketMutation()

    const handleCheckResult = useCallback(async () => {
        const randomFirstField = randomNumbers(19, 8)
        const randomSecondField = randomNumbers(2, 1)
        const firstMatchCount = compareNumbers(selectedFirstField, randomFirstField)
        const secondMatchCount = compareNumbers(selectedSecondField, randomSecondField)
        const isTicketWon = firstMatchCount >= 4 || (firstMatchCount >= 3 && secondMatchCount === 1)

        let attempts = 3

        while (attempts > 0) {
            try {
                const response = await postLotteryTicket({
                    selectedNumber: {
                        firstField: selectedFirstField,
                        secondField: selectedSecondField,
                    },
                    isTicketWon,
                }).unwrap()

                if (response.json.isTicketWon) {
                    dispatch(setResult('Ого, Вы выиграли! Поздравляем!'))
                } else {
                    dispatch(setResult('Упс, Вы проиграли!'))
                }

                return
            } catch (error) {
                attempts--
                if (attempts === 0) {
                    toast.error('Не удалось отправить результат.')
                }
            }
        }
    }, [selectedFirstField, selectedSecondField, dispatch, postLotteryTicket])

    if (result) {
        return <div className={s.lottery} key={result}>
            <Typography variant="h2">Билет 1</Typography>
            {result}
        </div>
    }

    return (
        <div className={s.lottery} key={result}>
            <Fields selectedFirstField={selectedFirstField} selectedSecondField={selectedSecondField} />
            <Button onClick={handleCheckResult}
                    className={s.lotteryButton}
                    disabled={selectedFirstField.length !== 8 || selectedSecondField.length !== 1 || isLoading}>
                {isLoading && <Spinner /> || 'Показать результат'}
            </Button>
        </div>
    )
}