import React, { JSX } from "react";

interface CardProps {
  icon: JSX.Element;
  title: string;
  value: string;
  color: string;
}

const Card: React.FC<CardProps> = ({ icon, title, value, color }) => {
  return (
    <div className="bg-gray-900 p-5 rounded-lg shadow-lg flex items-center space-x-4">
      <div className={`text-${color}-400`}>{icon}</div>
      <div>
        <p className="text-lg font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
