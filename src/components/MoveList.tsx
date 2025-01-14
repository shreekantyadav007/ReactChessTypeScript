import React from 'react';

interface MoveListProps {
  moves: string[];
}

const MoveList: React.FC<MoveListProps> = ({ moves }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg mb-2">Move List</h3>
      <ul className="list-disc list-inside">
        {moves.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoveList;
