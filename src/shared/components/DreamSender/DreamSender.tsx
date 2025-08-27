import { useEffect, useState, type FC } from "react";
import { DreamSenderUI } from "../ui/DreamSenderUI";
import { useUser } from "../../../store/use-user-store";
import { useSetupDreams } from "../../../store/use-dreams-store";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { DreamCreateSchema } from "../../../utils/zod-schema";
import type { IDream } from "../../../types/dreams";
import { createDreamApi } from "../../../utils/dreamers-api";

export const DreamSender: FC = () => {
  const [show, setShow] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const user = useUser();
  const setupDreams = useSetupDreams();
  const { reset } = useForm();
  useEffect(() => {
    setupDreams();
  }, []);
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
  return (
    <DreamSenderUI
      show={show}
      isVisible={isVisible}
      handleToggle={handleToggle}
      onSubmit={onSubmit}
    />
  );
};
