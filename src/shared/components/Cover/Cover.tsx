import { type FC } from "react";
import { useAppStore, useCoverIsActive } from "../../../store/use-app-store";
import { CoverUI } from "../ui/CoverUI";

export const Cover: FC = () => {
  const coverIsActive = useCoverIsActive();
  const handleToggle = useAppStore((state) => state.changeCover);
  return <CoverUI coverIsActive={coverIsActive} handleToggle={handleToggle} />;
};
