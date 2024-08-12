import React from 'react';
import Temp from './temp';

const temp2 = () => {
  const cards = [
    { title: 'Question 1', description: 'Description for question 1' },
    { title: 'Question 2', description: 'Description for question 2' },
    { title: 'Question 3', description: 'Description for question 3' },
  ];

  return (
    <div className="p-8">
      <Temp cards={cards} />
    </div>
  );
};

export default temp2;
