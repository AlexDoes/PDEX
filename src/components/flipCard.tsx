import { useState, FC } from 'react';
import { useToggle } from 'react-use';

type FlipCardProps = {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  width?: string;
  height?: string;
};

interface frontContent {

}

interface backContent {
    
}

const frontCard = (frontContent) => (
    <div className="flip-card-front bg-gray-300 text-black">
          {frontContent}
    </div>
)

const backCard = (backContent) => (
    <div className="flip-card-back bg-gray-800 text-white">
        {backContent}
    </div>
)

const FlipCard = ({ frontContent, backContent, width = '300px', height = '300px' }: FlipCardProps) => {
  const [flipped, setFlipped] = useToggle(false);

  return (
    <div className={`flip-card w-full ${width} ${height}`} onClick={setFlipped}>
      <div className={`flip-card-inner ${flipped ? 'flip-card-flipped' : ''}`}>
            {!flipped ? frontCard(frontContent) : backCard(backContent)}
      </div>
    </div>
  );
};

export default FlipCard;