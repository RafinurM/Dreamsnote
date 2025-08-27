import type { FC } from "react";
import { useParams } from "react-router-dom";
import { DreamUI } from "../ui/DreamUI";
import { useDreams } from "../../../store/use-dreams-store";

export const Dream: FC = () => {
  const { id } = useParams();
  const dreams = useDreams();
  const dream = dreams.find((dream) => id === dream.id.toString());
  return <DreamUI dream={dream ? dream : null} />;
};
