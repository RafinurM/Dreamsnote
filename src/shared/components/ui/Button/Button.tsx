import type { FC, ReactNode } from 'react';
// import style from './Button.module.scss';

type TButtonProps = {
    children?: ReactNode;
}
export const Button: FC<TButtonProps> = ({ children } ) => {
    return (
        <>
            <button>{children}</button>
        </>
    )
}