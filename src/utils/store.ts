import { create } from 'zustand';
import { Poet, Poem } from '../types';

interface AppState {
  // 诗人相关
  selectedPoet: Poet | null;
  setSelectedPoet: (poet: Poet | null) => void;
  
  // 诗词相关
  selectedPoem: Poem | null;
  setSelectedPoem: (poem: Poem | null) => void;
  
  // 游戏相关
  gameMode: 'sentence' | 'character' | null;
  setGameMode: (mode: 'sentence' | 'character' | null) => void;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  gameCompleted: boolean;
  setGameCompleted: (completed: boolean) => void;
  
  // 重置状态
  resetState: () => void;
}

export const useStore = create<AppState>((set) => ({
  // 诗人相关
  selectedPoet: null,
  setSelectedPoet: (poet) => set({ selectedPoet: poet }),
  
  // 诗词相关
  selectedPoem: null,
  setSelectedPoem: (poem) => set({ selectedPoem: poem }),
  
  // 游戏相关
  gameMode: null,
  setGameMode: (mode) => set({ gameMode: mode }),
  gameStarted: false,
  setGameStarted: (started) => set({ gameStarted: started }),
  gameCompleted: false,
  setGameCompleted: (completed) => set({ gameCompleted: completed }),
  
  // 重置状态
  resetState: () => set({
    selectedPoet: null,
    selectedPoem: null,
    gameMode: null,
    gameStarted: false,
    gameCompleted: false
  })
}));