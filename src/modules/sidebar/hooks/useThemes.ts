import { useAppDispatch, useAppSelector } from "@/shared/infra/redux/hooks";
import {
  backgroundPattern,
  changeBackground,
  changeThemeColor,
  selectTheme,
} from "../slices/themes";

export const useThemes = () => {
  const dispatch = useAppDispatch();
  const userChatState = useAppSelector(selectTheme);
  const { themeColor, backgroundPatternType } = userChatState;
  const handleChangeTheme = (background: string) => {
    dispatch(changeThemeColor({ themeColor: background }));
  };
  const handleChangeBackground = (background: backgroundPattern) => {
    dispatch(changeBackground({ backgroundPattern: background }));
  };
  return {
    themeColor,
    backgroundPatternType,
    handleChangeTheme,
    handleChangeBackground,
  };
};
