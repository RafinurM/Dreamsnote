import type { FC } from "react";
import style from "./Grid.module.scss";
import clsx from "clsx";
import { backgroundArticles } from "../../../../api/mock";

export const Grid: FC = () => {
  return (
    <>
      <div className={style.grid}>
        <div className={clsx(style.column, style.accent_text, style.text) }>{backgroundArticles[0].content}</div>
        <div className={style.column}></div>
        <div className={clsx(style.column, style.column_accent, style.quote)}>{backgroundArticles[2].content}</div>
        <div className={clsx(style.column, style.accent)}></div>
        <div className={clsx(style.column, style.text)}>{backgroundArticles[1].content}</div>
        <div className={style.column}></div>
        <div className={style.column}></div>
        <div className={clsx(style.column, style.accent)}></div>
        <div className={clsx(style.column, style.text) }>Cон — неотъемлемая часть жизни, в рамках которой реализуются важнейшие биологические процессы. Вопреки распространенному мнению о том, что во сне ничего не происходит, врач-сомнолог и заведующий отделением сомнологии Федерального центра оториноларингологии ФМБА Александр Мельников отмечает, что сон — это активное состояние, во время которого организм продолжает жизнедеятельность. В отличие от самого человека, его мозг не спит. Он работает во вторую смену, трудясь над восстановлением организма.</div>
        <div className={style.column}></div>
        <div className={clsx(style.column, style.text)}>Роль сновидений изучена наукой еще меньше, чем функции сна. Это связано с тем, что изучение сновидений опирается на субъективный опыт людей. Роман Бузунов объясняет, что миссия сновидений включает анализ накопленной за день информации в оперативной памяти и ее категоризацию. Он поделился: «Проводились эксперименты, когда человека будили в начале REM-фазы сна, тем самым лишая сновидений. Буквально через несколько дней он становился раздражительным и вспыльчивым. Сон постепенно внедрялся в бодрствование, и человек начинал видеть галлюцинации. Сновидения настолько важны, что даже в бодрствовании мозг начинает их включать».</div>
        <div className={style.column}></div>
      </div>
    </>
  );
};
