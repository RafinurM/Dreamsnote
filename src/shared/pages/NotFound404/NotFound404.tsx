import { Link } from 'react-router-dom';
// import style from './NotFound404.module.scss';
import type { FC } from 'react';

export const NotFound404: FC = () => {
    return (
        <>
            <h2>Страница не найдена</h2>
            <span>Похоже вы перешли по несуществующему маршруту</span>
            <span>Вернитесь <Link to={'/'}>на главную</Link></span>
        </>
    )
}