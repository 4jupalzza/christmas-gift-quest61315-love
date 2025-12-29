export interface Box {
  id: number;
  question: string;
  type: "주관식" | "객관식";
  options: string[];
  answer: string;
  gift: string;
  isGolden: boolean;
  isSpecial: boolean;
}

export interface BoxState {
  id: number;
  isOpened: boolean;
}
