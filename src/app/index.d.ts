import type { profile, user } from "@prisma/client";

export type loginPayload = {
  protocol: string;
  host: string;
  address: string;
  //token: string | null | undefined;
};

export interface userProfile {
  account: string;
  handle: string;
  name: string[];
  stopNewQuestion: boolean;
  stopAnonQuestion: boolean;
  avatarUrl: string;
  questionBoxName: string;
}

export interface questions {
  id: number;
  question: string;
  questioner: string | null;
  questionee: profile;
  questioneeHandle: string;
  questionedAt: Date;
}

export interface answers {
  id: string;
  question: string;
  questioner: string | null;
  answer: string;
  answeredAt: Date;
  answeredPersonHandle: string;
  nsfwedAnswer: boolean;
}

export interface typedAnswer {
  question: string;
  questioner: string | null;
  answer: string;
  answeredPersonHandle: string;
  nsfwedAnswer: boolean;
}

export interface postQuestion {
  question: string;
  questioner: string;
  answer: string;
  answeredPerson: user;
  answeredPersonHandle: string;
}