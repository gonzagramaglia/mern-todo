import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useTaskTodos } from "../todos/task";

const TaskCard = ({ task }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteTask } = useTaskTodos();
  const toast = useToast();

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
            <IconButton icon={<EditIcon />} colorScheme="blue" />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteTask(task._id)}
              colorScheme="red"
            />
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default TaskCard;
