export interface Box {
  id: number;
  question: string;
  answer: string;
  gift: string;
  isGolden: boolean;
}

export interface BoxState {
  id: number;
  isOpened: boolean;
}
