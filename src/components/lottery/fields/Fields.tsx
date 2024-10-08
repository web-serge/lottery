import s from './fields.module.css'
import { Typography } from '../../typography/Typography.tsx'
import { Button } from '../../button/button.tsx'
import { Field } from '../../field/Field.tsx'
import { setRandomFields, toggleFieldSelection } from '../lotterySlice.ts'
import { useCallback } from 'react'
import { randomNumbers } from '../../../utils'
import { useDispatch } from 'react-redux'

const createFirstField = Array.from({ length: 19 }, (_, i) => i + 1)
const createSecondField = Array.from({ length: 2 }, (_, i) => i + 1)

type Props = {
    selectedFirstField: number[]
    selectedSecondField: number[]
}

export const Fields = ({ selectedSecondField, selectedFirstField }: Props) => {
    const dispatch = useDispatch()

    const handleGetRandom = useCallback(() => {
        const randomFirstField = randomNumbers(19, 8)
        const randomSecondField = randomNumbers(2, 1)

        dispatch(setRandomFields({ randomFirstField, randomSecondField }))
    }, [])

    return (
        <>
            <div className={s.header}>
                <Typography variant="h2">Билет 1</Typography>
                <Button variant={'icon'} onClick={handleGetRandom}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M12.0716 1.5249C12.4266 1.5249 12.7144 1.81272 12.7144 2.16776V4.71423C12.7144 5.06927 12.4266 5.35709 12.0716 5.35709C11.7165 5.35709 11.4287 5.06927 11.4287 4.71423V2.16776C11.4287 1.81272 11.7165 1.5249 12.0716 1.5249ZM16.3831 4.52589C16.6342 4.27484 16.6342 3.86781 16.3831 3.61676C16.1321 3.3657 15.7251 3.3657 15.474 3.61676L14.1883 4.90247C13.9372 5.15352 13.9372 5.56056 14.1883 5.81161C14.4393 6.06266 14.8464 6.06266 15.0974 5.81161L16.3831 4.52589ZM9.71965 11.1893C9.9707 10.9383 9.9707 10.5313 9.71965 10.2802C9.4686 10.0292 9.06156 10.0292 8.81051 10.2802L1.24005 17.8507C0.988995 18.1017 0.988995 18.5088 1.24005 18.7598C1.4911 19.0109 1.89813 19.0109 2.14918 18.7598L9.71965 11.1893ZM12.7144 11.7857C12.7144 11.4306 12.4266 11.1428 12.0716 11.1428C11.7165 11.1428 11.4287 11.4306 11.4287 11.7857V13.6678C11.4287 14.0228 11.7165 14.3107 12.0716 14.3107C12.4266 14.3107 12.7144 14.0228 12.7144 13.6678V11.7857ZM14.6426 7.9285C14.6426 7.57346 14.9304 7.28564 15.2854 7.28564H17.8569C18.2119 7.28564 18.4997 7.57346 18.4997 7.9285C18.4997 8.28354 18.2119 8.57136 17.8569 8.57136H15.2854C14.9304 8.57136 14.6426 8.28354 14.6426 7.9285ZM6.28544 7.28564C5.9304 7.28564 5.64258 7.57346 5.64258 7.9285C5.64258 8.28354 5.9304 8.57136 6.28544 8.57136H8.85686C9.2119 8.57136 9.49972 8.28354 9.49972 7.9285C9.49972 7.57346 9.2119 7.28564 8.85686 7.28564H6.28544ZM14.1883 10.0453C14.4393 9.79429 14.8464 9.79429 15.0974 10.0453L16.3831 11.3311C16.6342 11.5821 16.6342 11.9891 16.3831 12.2402C16.1321 12.4912 15.7251 12.4912 15.474 12.2402L14.1883 10.9545C13.9372 10.7034 13.9372 10.2964 14.1883 10.0453ZM8.66872 3.61676C8.41766 3.3657 8.01063 3.3657 7.75958 3.61676C7.50853 3.86781 7.50853 4.27484 7.75958 4.52589L9.04529 5.81161C9.29634 6.06266 9.70338 6.06266 9.95443 5.81161C10.2055 5.56056 10.2055 5.15352 9.95443 4.90247L8.66872 3.61676Z"
                              fill="currentColor" />
                    </svg>
                </Button>
            </div>
            <div className={s.fieldText}>
                <Typography as={'span'}>Поле 1 </Typography>
                <Typography as={'span'} light>Отметьте 8 чисел.</Typography>
            </div>
            <Field
                numbers={createFirstField}
                selected={selectedFirstField}
                maxSelect={8}
                onSelect={(number) => dispatch(toggleFieldSelection({ field: 'firstField', number }))}
            />
            <div className={s.fieldText}>
                <Typography as={'span'}>Поле 2 </Typography>
                <Typography as={'span'} light>Отметьте 1 число.</Typography>
            </div>
            <Field
                numbers={createSecondField}
                selected={selectedSecondField}
                maxSelect={1}
                onSelect={(number) => dispatch(toggleFieldSelection({ field: 'secondField', number }))}
            />
        </>
    )
}