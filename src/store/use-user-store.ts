import { create, type StateCreator } from "zustand";
import type { IUser } from "../types/user";

interface IInitialState {
  user: IUser | null;
  isAuth: boolean;
  initialized: boolean;
}

interface IUserActions {
  setUser: (user: IUser | null) => void;
  setAuth: (isAuth: boolean) => void;
} 

type IUserStore = IInitialState & IUserActions;

const initialState: IInitialState = {
  user: null,
  isAuth: false,
  initialized: false,
};

const userStore: StateCreator<IUserStore> = (set) => ({
  ...initialState,
  setUser: (user) => set({ user, initialized: true }),
  setAuth: (isAuth) => set({ isAuth, initialized: true }),
});

export const useUserStore = create<IUserStore>()(userStore);

export const useUser = () => useUserStore((state) => state.user);
export const useIsAuth = () => useUserStore((state) => state.isAuth);
export const useSetUser = () => useUserStore.getState().setUser;
export const useSetAuth = () => useUserStore.getState().setAuth;
export const useInitialized = () => useUserStore((state) => state.initialized);