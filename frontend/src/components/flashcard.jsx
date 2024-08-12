import React, { useState, useEffect } from "react";
import Flashcards from "../Demodata/data";
import Card from "./card";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AddIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import AddCard from "./AddCard";

function Flashcard() {
  const [flash, setFlash] = useState(Flashcards);
  const [currPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(Flashcards.length / 1)
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Extract unique categories from flashcards
  const categories = Array.from(new Set(flash.map((card) => card.category)));

  // Function to handle page changes
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      let newPage = prevPage;
      if (direction === "next") {
        newPage = Math.min(prevPage + 1, totalPages);
      } else if (direction === "prev") {
        newPage = Math.max(prevPage - 1, 1);
      }
      setSelectedCard(flash[newPage - 1]);
      return newPage;
    });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing category
  };

  const handleEdit = (card) => {
    setSelectedCard(card);
    onOpen(); // Open modal for editing
  };

  const editCard = async (updatedCard) => {
    try {
      const updatedFlashcards = flash.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
      setFlash(updatedFlashcards);
      onClose(); // Close modal after updating
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCard = async (card) => {
    try {
      const updatedFlashcards = flash.filter((c) => c.id !== card.id);
      setFlash(updatedFlashcards);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter flashcards based on selected category
  const filteredFlashcards = selectedCategory
    ? flash.filter((card) => card.category === selectedCategory)
    : flash;

  useEffect(() => {
    setTotalPages(Math.ceil(filteredFlashcards.length / 1));
  }, [filteredFlashcards]);

  return (
    <div className="flex flex-1 flex-col w-full md:flex-row border-1 ">
      <div className="md:w-[30%] m-5 md:m-0 px-5 flex flex-col justify-center">
        <div className="font-semibold border-1 border-blue-500 mb-5">
          Select A Category
        </div>
        <div className="btn w-full">
          <Select
            placeholder="Select category"
            value={selectedCategory}
            colorScheme="teal"
            variant="outline"
            className="w-5/12 bg-slate-500"
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="md:w-[70%]  bg-blue-100 p-5 flex flex-col items-center overflow-hidden">
        <div className="flex justify-center items-center text-3xl w-full gap-4">
          Amazing Flashcards
          <Tooltip hasArrow label="Add Flash Card" bg="blue.300">
            <IconButton
              aria-label="Add Flash Card"
              icon={<AddIcon />}
              onClick={onOpen}
              className="hover:cursor-pointer text-black"
            />
          </Tooltip>
        </div>

        {filteredFlashcards.length === 0 ? (
          <div className="flex justify-center items-center p-2 w-full h-full font-semibold text-4xl">
            No flashcards available
          </div>
        ) : (
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${(currPage - 1) * 100}%)` }}
          >
            {filteredFlashcards.map((card) => (
              <div key={card.id} className="w-full flex-shrink-0">
                <Card
                  options={card.options !== null ? card.options : []}
                  question={card.question}
                  answer={card.answer}
                />
              </div>
            ))}
          </div>
        )}

        <div className="w-1/2 p-3 flex flex-col gap-3 md:flex-row justify-between items-center mt-5">
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => handlePageChange("prev")}
            disabled={currPage === 1}
            className="w-full"
          >
            View Previous
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="teal"
              variant="outline"
              rightIcon={<ChevronDownIcon />}
              className="w-full"
            >
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleEdit(selectedCard)}>Edit</MenuItem>
              <MenuItem onClick={() => deleteCard(selectedCard)}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => handlePageChange("next")}
            disabled={currPage === totalPages}
            className="w-full"
          >
            View Next
          </Button>
        </div>
      </div>

      <AddCard
        isOpen={isOpen}
        onClose={onClose}
        card={selectedCard}
        onSave={editCard}
      />
    </div>
  );
}

export default Flashcard;
