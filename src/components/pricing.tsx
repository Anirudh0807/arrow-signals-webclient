// Pricing.tsx

import {
  Box,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface PricingProps {
  selected: boolean;
  onclick: () => void;
  onbuyNow: () => void;
  currentType: string;
  subscriptionType: string;
  price: number;
}

const Pricing: React.FC<PricingProps> = ({
  price,
  currentType,
  subscriptionType,
  selected,
  onclick,
  onbuyNow,
}) => {
  return (
    <Box
      onClick={onclick}
      m={"3"}
      w={"330px !important"}
      bg={selected ? "blue" : "white"}
      boxShadow={selected ? "3xl" : "xl"}
      rounded={"md"}
      height={"450px !important"}
      overflow={"hidden"}
    >
      <Stack
        textAlign={"center"}
        p={6}
        color={useColorModeValue("gray.800", "white")}
        align={"center"}
      >
        <Text
          fontSize={"sm"}
          fontWeight={500}
          bg={useColorModeValue("green.50", "green.900")}
          p={2}
          px={3}
          color={"green.500"}
          rounded={"full"}
        >
          {subscriptionType}
        </Text>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Text fontSize={"3xl"}>$</Text>
          <Text
            fontSize={"6xl"}
            fontWeight={800}
            color={selected ? "white" : "blue"}
          >
            {price}
          </Text>
          <Text color={selected ? "white" : "grey.500"}>/month</Text>
        </Stack>
      </Stack>

      <Box bg={selected ? "blue" : "white"} px={6} py={10}>
        <List spacing={3}>
          <ListItem color={selected ? "white" : "blue"}>
            <ListIcon as={CheckIcon} color="green.400" />
            5.000 page views
          </ListItem>
          <ListItem color={selected ? "white" : "blue"}>
            <ListIcon as={CheckIcon} color="green.400" />
            50 automation executions
          </ListItem>
          <ListItem color={selected ? "white" : "blue"}>
            <ListIcon as={CheckIcon} color="green.400" />
            50 identified users
          </ListItem>
          <ListItem color={selected ? "white" : "blue"}>
            <ListIcon as={CheckIcon} color="green.400" />
            All features
          </ListItem>
        </List>

        <Button
          mt={10}
          w={"full"}
          bg={"green.400"}
          color={"white"}
          rounded={"xl"}
          boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
          _hover={{
            bg: "green.500",
          }}
          _focus={{
            bg: "green.500",
          }}
          onClick={onbuyNow}
        >
          {currentType == subscriptionType
            ? "Renew Now"
            : "Upgrade to " + subscriptionType}
        </Button>
      </Box>
    </Box>
  );
};

export default Pricing;
