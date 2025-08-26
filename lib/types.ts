// This file defines the shape of our data.

export type Education = {
  institution: string;
  degree: string;
  year: string;
};

export type Review = {
  name: string;
  school: string;
  avatarUrl: string;
  rating: number;
  text: string;
};

export type RecommendedMentor = {
  name: string;
  university: string;
  year: string;
  avatarUrl: string;
  reviews: number;
  sessions: number;
};