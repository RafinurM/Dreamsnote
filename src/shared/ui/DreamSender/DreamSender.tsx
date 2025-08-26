import { useEffect, useState, type FC } from "react";
import style from "./DreamSender.module.scss";
import clsx from "clsx";
import { Dreamline } from "../Dreamline";
import { Cover } from "../Cover/Cover";
import { createDreamApi } from "../../../utils/dreamers-api";
import {
  dreamCreateSchema,
  type DreamCreateSchema,
} from "../../../utils/zod-schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IDream } from "../../../types/dreams";
import { useUser } from "../../../store/use-user-store";
import { useSetupDreams } from "../../../store/use-dreams-store";

export const DreamSender: FC = () => {
  const [show, setShow] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const user = useUser();
  const setupDreams = useSetupDreams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<DreamCreateSchema>({
    resolver: zodResolver(dreamCreateSchema),
    mode: "onChange",
  });

  const handleToggle = (): void => {
    setShow((prev) => !prev);
    setIsVisible((prev) => !prev);
  };

  const onSubmit: SubmitHandler<DreamCreateSchema> = async (
    data: Partial<IDream>
  ) => {
    try {
      const userId = user ? user.id : 1;
      await createDreamApi({ ...data, userId, published: true });
      reset();
    } catch (e) {
      console.log("Error", e);
    } finally {
      setupDreams();
    }
  };

  useEffect(() => {
    setupDreams()
  }, []);

  return (
    <>
      <div className={clsx(style.dream_sender, show && style.dream_closed)}>
        <h3 className={style.dream_header} onClick={handleToggle}>
          {isVisible ? `Отправить сон` : `Читать сны`}
          <div className={clsx(style.dream_header_container)}>
            <svg
              className={clsx(style.stroke)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className={clsx(
                  style.stroke_up_act,
                  !show && style.stroke_active
                )}
                strokeWidth="2"
                d="m18 18-6-6-6 6M18 12l-6-6-6 6"
              />
            </svg>
            <svg
              className={clsx(style.stroke)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className={clsx(
                  style.stroke_down_act,
                  show && style.stroke_active
                )}
                strokeWidth="2"
                d="m18 12-6 6-6-6M18 6l-6 6-6-6"
              />
            </svg>
          </div>
        </h3>
        <form
          className={clsx(style.form, show && style.form_closed)}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div
            className={clsx(
              style.textarea_wrapper,
              show && style.textarea_closed
            )}
          >
            <input
              {...register("title")}
              id="title"
              maxLength={12}
              minLength={3}
              name="title"
              required
              placeholder="Назовите Ваш сон"
              className={clsx(style.dream_title_input, show && style._unactive)}
              aria-invalid={errors.title ? true : false}
            ></input>
            <textarea
              {...register("content")}
              id="content"
              minLength={25}
              name="content"
              required
              placeholder="Опишите Ваш сон подробнее"
              className={clsx(style.dream_input, show && style._unactive)}
              spellCheck
              aria-invalid={errors.content ? true : false}
            />
          </div>

          <button
            type="submit"
            className={clsx(
              style.dream_submit,
              show && style.dream_submit_closed
            )}
            disabled={isValid && isSubmitting}
          >
            отправить
          </button>
        </form>
        <Cover />
        <Dreamline isVisible={isVisible} />
      </div>
    </>
  );
};
