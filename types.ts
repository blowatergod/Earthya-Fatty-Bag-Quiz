export type Language = 'en' | 'zh' | 'bm';

export interface Question {
  id: number;
  statement: string;
  isTrue: boolean;
  feedback: string;
}

export interface QuizContent {
  questions: Question[];
  ui: {
    startTitle: string;
    startSubtitle: string;
    nextBtn: string;
    resultSuccessTitle: string;
    resultSuccessMsg: string;
    resultFailTitle: string;
    resultFailMsg: string;
    redeemText: string;
    codeLabel: string;
    retryBtn: string;
    progress: string;
    trueBtn: string;
    falseBtn: string;
  };
}