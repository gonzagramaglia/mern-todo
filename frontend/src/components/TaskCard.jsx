import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  HStack,
  VStack,
  IconButton,
  useColorModeValue,
  useToast,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useTaskTodos } from "../todos/task";

const TaskCard = ({ task }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteTask, updateTask } = useTaskTodos();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteTask = async (tid) => {
    const { success, message } = await deleteTask(tid);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        duration: 1500,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleUpdateTask = async (tid, updatedTask) => {
    const { success, message } = await updateTask(tid, updatedTask);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Task updated successfully",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-2.5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={task.image}
          alt={task.title}
          h={48}
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <Heading as="h3" size="md" mb={2}>
            {task.title}
          </Heading>
          <Text color={textColor} mb={4}>
            {task.description}
          </Text>
          <HStack spacing="2">
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="blue"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteTask(task._id)}
              colorScheme="red"
            />
          </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Update Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Title"
                  name="title"
                  value={updatedTask.title}
                  onChange={(e) =>
                    setUpdatedTask({
                      ...updatedTask,
                      title: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Description"
                  name="description"
                  type="text"
                  value={updatedTask.description}
                  onChange={(e) =>
                    setUpdatedTask({
                      ...updatedTask,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedTask.image}
                  onChange={(e) =>
                    setUpdatedTask({
                      ...updatedTask,
                      image: e.target.value,
                    })
                  }
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleUpdateTask(task._id, updatedTask)}
              >
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default TaskCard;
