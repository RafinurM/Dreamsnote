import type { FC } from "react";
import style from './ResetPasswordUI.module.scss'

export const ResetPasswordUI: FC = () => {
    return (
        <div className={style.resetPassword}> 
            please enter new credentials
        </div>
    )
}