import { Education, Review, RecommendedMentor } from './types';

// We import the types to ensure our mock data is consistent.

export const educationData: Education[] = [
  {
    institution: 'Indian Institute of Technology, Bombay',
    degree: 'Computer Science & Engineering',
    year: '4th year | Batch (2020-2024)',
  },
  {
    institution: 'Delhi Public School, R.K. Puram',
    degree: 'Science (Physics, Chemistry, Mathematics)',
    year: 'Batch 2019',
  },
];

export const reviewsData: Review[] = [
  {
    name: 'Anant Dey',
    school: 'Jadavpur School',
    avatarUrl: 'https://i.pravatar.cc/150?u=anant',
    rating: 5,
    text: '"The conversation with Rohan completely blew me out of the water. He was a great mentor and even offered to do another session with him. You rock, Rohan!"',
  },
  {
    name: 'Naina Singh',
    school: 'Modern, RPS Delhi',
    avatarUrl: 'https://i.pravatar.cc/150?u=naina',
    rating: 5,
    text: '"Had an amazing session with my mentor! She provided valuable guidance and helped clear all my doubts. She was a great listener and helped me feel more confident about my choices."',
  },
  {
    name: 'Sushmita',
    school: 'Jadavpur School',
    avatarUrl: 'https://i.pravatar.cc/150?u=sushmita',
    rating: 5,
    text: '"Rohan\'s guidance and practical insights were invaluable for my career transition. He provided great direction and boosted my confidence."',
  },
];

export const recommendedMentorsData: RecommendedMentor[] = [
  {
    name: 'Jenie Mathew',
    university: 'IIT Bombay',
    year: '4th Year',
    avatarUrl: 'https://i.pravatar.cc/150?u=jenie',
    reviews: 110,
    sessions: 180,
  },
  {
    name: 'Rahul Unni',
    university: 'IIT Bombay',
    year: '3rd Year',
    avatarUrl: 'https://i.pravatar.cc/150?u=rahul',
    reviews: 70,
    sessions: 150,
  },
];

export const collegeHighlightImages: string[] = [
    '/college-activities/act1.jpeg',
    '/college-activities/act2.jpeg',
    '/college-activities/act3.jpeg'
];