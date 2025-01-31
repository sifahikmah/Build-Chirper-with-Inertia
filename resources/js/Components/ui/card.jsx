// card.jsx
import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;
