import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { DreamlineUI } from "../ui/DreamlineUI/DreamlineUI";
import { useUser } from "../../../store/use-user-store";
import { useDreams, useLikeDream } from "../../../store/use-dreams-store";
import { useChangeCover } from "../../../store/use-app-store";

interface IDreamlineProps {
  isVisible: boolean;
}

export const Dreamline: FC<IDreamlineProps> = ({ isVisible }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();
  const user = useUser();
  const dreams = useDreams();
  const changeCover = useChangeCover();
  const currentDream =
    dreams && dreams.length > 0 ? dreams[currentIndex] : null;
  const likeDream = useLikeDream();
  const changeDream = (): void => {
    if (!dreams || dreams.length === 0) return;
    const nextIndex = (currentIndex + 1) % dreams.length;
    setCurrentIndex(nextIndex);
  };

  const handleGoFull = (id: number): void => {
    navigate(`/dreams/${id}`, { state: { background: "/" } });
  };
  if (!isVisible || !currentDream) return null;
  const createdYear = currentDream.createdAt
    ? new Date(currentDream.createdAt).getFullYear?.()
    : undefined;
  return (
    <DreamlineUI
      isVisible={isVisible}
      currentDream={currentDream}
      createdYear={createdYear}
      user={user}
      changeDream={changeDream}
      likeDream={likeDream}
      handleGoFull={handleGoFull}
      changeCover={changeCover}
    />
  );
};
