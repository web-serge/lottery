import { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'clsx'
import s from './button.module.css'

type ButtonProps<T extends ElementType = 'button'> = {
    as?: T
    fullWidth?: boolean
    select?: boolean
    variant?: 'default' | 'number' | 'icon'
    className?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
    const { as, select, fullWidth, variant = 'default', className, ...restProps } = props
    const Component = as ?? 'button'

    return <Component
        className={clsx(s[variant], s.button, fullWidth && s.fullWidth, select && s.selected, className)} {...restProps} />
}
