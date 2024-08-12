import React, { useState } from 'react';
import './card.css';
import { Button, Menu, MenuItem, MenuList, Tooltip } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function Card({ question, answer, options }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === answer);
    setIsFlipped(true); 
  };

  return (
    <div className="card w-full p-5">
        <Tooltip hasArrow label={`${!isFlipped?'Click to Reveal Answer':'Go back to question'}`} bg='blue.400' placement='right'>
      <div className={`card__inner ${isFlipped ? 'is-flipped' : ''} w-full`} onClick={()=>setIsFlipped(!isFlipped)}>
        <div className="card__face card__face--front w-full">
          <div className='flex flex-col justify-center items-center w-9/12'>
            <h2 className='font-semibold'>{question}</h2>
          </div>
          <div className='flex flex-col justify-start items-center w-full gap-6 p-2'>
            {options.length>0 &&  options.map((option, index) => (
              <Button
                key={index}
                bg={selectedOption === option ? (isCorrect ? 'green.500' : 'red.500') : 'gray.200'}
                colorScheme={selectedOption === option ? (isCorrect ? 'green' : 'red') : 'gray'}
                onClick={() => handleAnswer(option)}
                isDisabled={isFlipped}
                className='w-7/12 p-1'
              >
                {option}
              </Button>
            ))}
            
          </div>
        </div>
        <div className="card__face card__face--back">
          <div className="card__content">
            <div className="card__header">
              <h2 className='font-semibold'>Answer</h2>
            </div>
            <div className="card__body">
                <div className='font-semibold'>
                     <h5>{answer}</h5>
                </div>
            </div>
          </div>
        </div>
      </div>
{/*      
        
          <div className="go-arrow">→</div>
        </Tooltip>
     */}
     </Tooltip>
    </div>
  );
}

export default Card;
