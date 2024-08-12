import React from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

function AddCard({ isOpen, onClose }) {
    const handleSave = () => {
        // Handle the form submission logic here
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add a New Flashcard</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Question</FormLabel>
                        <Input placeholder='Enter question here' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Answer</FormLabel>
                        <Input placeholder='Enter answer here' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Options (comma separated)</FormLabel>
                        <Input placeholder='Option1, Option2, Option3' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddCard;
