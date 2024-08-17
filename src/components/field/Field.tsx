import { Button } from '../button/button.tsx'
import s from './field.module.css'

type Props = {
    numbers: number[];
    selected: number[];
    maxSelect: number;
    onSelect: (number: number) => void;
};

export const Field = ({ numbers, selected, maxSelect, onSelect }: Props) => {
    return (
        <div className={s.field}>
            {numbers.map((number) => (
                <Button variant={'number'}
                        key={number}
                        select={selected.includes(number)}
                        onClick={() => onSelect(number)}
                        disabled={selected.length >= maxSelect && !selected.includes(number)}
                        type="button"
                >
                    {number}
                </Button>
            ))}
        </div>
    )
}
