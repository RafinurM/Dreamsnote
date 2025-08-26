import { create, type StateCreator } from "zustand";
import type { IDream } from "../types/dreams";
import { getDreamsApi, likeDreamApi } from "../utils/dreamers-api";
import { devtools } from "zustand/middleware";

interface IActions {
  setupDreams: () => Promise<void>;
  addDream: (dream: IDream) => void;
  removeDream: (dream: IDream) => void;
  likeDream: (userId: number, dreamId: number) => Promise<void>;
  // removeLike: (userId: string, dreamId: string) => void;
}

interface IInitialState {
  dreams: IDream[];
}

interface IDreamsStore extends IInitialState, IActions {}

const initialState: IInitialState = {
  dreams: [],
};

const dreamsStore: StateCreator<IDreamsStore, [["zustand/devtools", never]]> = (
  set
) => ({
  ...initialState,
  setupDreams: async () => {
    try {
      const dreams = await getDreamsApi();
      set({ dreams });
    } catch (e) {
      console.error("Failed to load dreams", e);
    }
  },
  addDream: (dream) =>
    set((state) => {
      if (state.dreams.includes(dream)) return state;
      return { dreams: [...state.dreams, dream] };
    }),
  removeDream: (dream) =>
    set((state) => ({
      dreams: state.dreams.filter((i) => i !== dream),
    })),
  likeDream: async (userId, dreamId) => {
    try {
      await likeDreamApi(userId, dreamId);
      set((state) => {
        const dreamsCopy = state.dreams.map((dream) => {
          if (dream.id === dreamId) {
            const alreadyLiked = dream.likes.includes(userId);
            const newLikes = alreadyLiked
              ? dream.likes
              : [...dream.likes, userId];
            return { ...dream, likes: newLikes };
          }
          return dream;
        });
        return { dreams: dreamsCopy };
      });
    } catch (e) {
      console.error("Failed to like dream", e);
    }
  },
});

const useDreamsStore = create<IDreamsStore>()(devtools(dreamsStore));

export const useDreams = () => useDreamsStore((state) => state.dreams);
export const useLikeDream = () => useDreamsStore((state) => state.likeDream);
export const useSetupDreams = () =>
  useDreamsStore((state) => state.setupDreams);
