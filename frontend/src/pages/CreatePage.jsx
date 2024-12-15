import {
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Box,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTaskTodos } from "../todos/task";

const CreatePage = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    image: "",
  });

  const { createTask } = useTaskTodos();
  const toast = useToast();

  const handleAddProduct = async () => {
    const { success, message } = await createTask(newTask);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 1500,
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
      <Container maxW="container.sm">
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create New Task
          </Heading>
          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                name="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                name="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={newTask.image}
                onChange={(e) =>
                  setNewTask({ ...newTask, image: e.target.value })
                }
              />
              <Button colorScheme="blue" onClick={handleAddProduct} w="full">
                Add Task
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default CreatePage;
