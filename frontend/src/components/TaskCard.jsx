import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const TaskCard = ({ task }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
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
            <IconButton icon={<DeleteIcon />} colorScheme="red" />
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default TaskCard;
