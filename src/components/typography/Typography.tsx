import type { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import s from './typography.module.css'

type TypographyVariant =
    | 'h2'
    | 'body-14'

type Props<T extends ElementType> = {
    as?: T
    variant?: TypographyVariant
    light?: boolean
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType>({
                                                      as,
                                                      light,
                                                      children,
                                                      className,
                                                      variant = 'body-14',
                                                      ...restProps
                                                  }: Props<T>) => {
    const Component = getComponent(variant, as)

    return (
        <Component className={clsx(s[variant], light && s.light, className)} {...restProps}>
            {children}
        </Component>
    )
}

const getComponent = <T extends ElementType>(variant: TypographyVariant, as?: T) => {
    if (as) {
        return as
    }

    switch (variant) {
        case 'h2':
            return 'h2'
        default:
            return 'div'
    }
}