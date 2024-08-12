import React, { useState } from 'react';
import Flashcards from '../Demodata/data';
import Card from './card';
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip, useDisclosure } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, ArrowForwardIcon, ChevronDownIcon } from '@chakra-ui/icons';
import AddCard from './AddCard';

function Flashcard() {
    const [flash, setFlash] = useState(Flashcards);
    const [currPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(Flashcards.length / 1));
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Function to handle page changes
    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => {
            let newPage = prevPage;
            if (direction === 'next') {
                newPage = Math.min(prevPage + 1, totalPages);
            } else if (direction === 'prev') {
                newPage = Math.max(prevPage - 1, 1);
            }
            return newPage;
        });
    };

    // Get current flashcard based on currPage
    const currentFlashcard = flash.length > 0 ? flash[currPage - 1] : null;

    return (
        <div className='w-screen h-screen flex justify-center items-center border-1 bg-blue-50'>
            <div className='w-7/12 h-7/12 bg-blue-100 flex flex-col items-center p-3 overflow-hidden'>
                <div className='flex justify-center items-center text-3xl w-full gap-8'>
                    Amazing Flashcards
                    <Tooltip hasArrow label='Add Flash Card' bg='blue.300'>
                        <IconButton
                            aria-label='Add Flash Card'
                            icon={<AddIcon />}
                            onClick={onOpen}
                            className='hover:cursor-pointer text-black'
                        />
                    </Tooltip>
                </div>

                {flash.length === 0 ? (
                    <div className='flex justify-center items-center p-2 w-full h-full font-semibold text-4xl'>
                        Add a flashcard
                    </div>
                ) : (
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${(currPage - 1) * 100}%)` }}
                    >
                        {flash.map((card) => (
                            <div key={card.id} className="w-full flex-shrink-0">
                                <Card
                                    options={card.options}
                                    question={card.question}
                                    answer={card.answer}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className='w-1/2 p-3 flex justify-between items-center'>
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        colorScheme='teal'
                        variant='outline'
                        onClick={() => handlePageChange('prev')}
                        disabled={currPage === 1}
                    >
                        View Previous
                    </Button>
                    <Menu>
                        <MenuButton as={Button} colorScheme='teal' variant='outline' rightIcon={<ChevronDownIcon />}>
                            Actions
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </MenuList>
                    </Menu>
                    <Button
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme='teal'
                        variant='outline'
                        onClick={() => handlePageChange('next')}
                        disabled={currPage === totalPages}
                    >
                        View Next
                    </Button>
                </div>
            </div>
            <AddCard isOpen={isOpen} onClose={onClose} />
        </div>
    );
}

export default Flashcard;
