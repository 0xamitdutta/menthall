import React from 'react';
import {
  School,
  Users,
  NotebookPen,
  Landmark,
  Plane,
} from 'lucide-react';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-muted p-3 rounded-lg shadow-sm">
    {children}
  </div>
);

const features = [
    { icon: <School />, name: 'College Selections' },
    { icon: <Users />, name: 'College Counselling' },
    { icon: <NotebookPen />, name: 'Competitive Exam Preps' },
    { icon: <Landmark />, name: 'Campus Life Insights' },
    { icon: <Plane />, name: 'Abroad Studies' },
];

const bgColors = [
    'bg-amber-200',
    'bg-emerald-200',
    'bg-sky-200',
    'bg-rose-200',
    'bg-purple-200'
];

const PathToSuccess: React.FC = () => {
  return (
    <section className="bg-background text-foreground m-12 py-16 md:py-24 border-1 border-gray-300 rounded-lg">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Your Path to College Success Starts Here</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col items-center gap-4 ${bgColors[index]} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
              <IconWrapper>{feature.icon}</IconWrapper>
              <p className="font-semibold text-muted-foreground text-center">{feature.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathToSuccess; 