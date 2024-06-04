import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { format, isToday, isYesterday, isSameWeek } from "date-fns";

interface UserFavourite {
  id: number;
  name: string;
  market: string;
  latestSignal: {
    id: number;
    type: string;
    status: string;
    stopLoss: number;
    ltp: number;
    target1: number;
    target2: number;
    target3: number;
    buyRange: number;
    createdAt: string;
  };
}

interface CommodityCardProps {
  data: UserFavourite;
  isFavourite: boolean;
}

const CommodityCard: React.FC<CommodityCardProps> = ({ data, isFavourite }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    };

    if (isToday(date)) {
      return `Today ${date.toLocaleTimeString("en-IN", options)}`;
    } else if (isYesterday(date)) {
      return `Yesterday ${date.toLocaleTimeString("en-IN", options)}`;
    } else if (isSameWeek(date, new Date())) {
      return `${format(date, "EEEE")}, ${date.toLocaleTimeString(
        "en-IN",
        options
      )}`;
    } else {
      return format(date, "do MMMM");
    }
  };

  return (
    <>
      <Box
        px={5}
        py={5}
        rounded={"xl"}
        maxW={{ base: "full", md: 900 }}
        bg={"#1b2028"}
      >
        <Flex justifyContent="space-between" alignItems="center" mb={3}>
          <Flex alignItems="center" bg="gray.800" borderRadius="md">
            <Text color="white" fontSize={{ base: "xl", md: "3xl" }} mr={2}>
              {data.name}
            </Text>
            <Box
              alignItems={"center"}
              bg="#eefcf0"
              color="white"
              borderRadius="lg"
              px={4}
            >
              <Text color={"black"} fontWeight={"semi-bold"} fontSize={"xs"}>
                {data.market}
              </Text>
            </Box>
          </Flex>
          <Icon
            as={StarIcon}
            boxSize={6}
            color={isFavourite ? "yellow.300" : "gray.400"}
          />
        </Flex>
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 4 }}
          rowGap={4}
          textAlign={"center"}
          mb={4}
        >
          <Flex
            gap={2}
            direction={"column"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Text color={"#84868a"}>Call Type</Text>
            <Text color={"#ffffff"}>{data.latestSignal.type}</Text>
          </Flex>
          <Flex gap={2} direction={"column"}>
            <Text color={"#84868a"}>Call Status</Text>
            <Text color={"#ffffff"}>{data.latestSignal.status || "Open"}</Text>
          </Flex>
          <Flex gap={2} direction={"column"}>
            <Text color={"#84868a"}>Stoploss</Text>
            <Text color={"#ffffff"}>{data.latestSignal.stopLoss}</Text>
          </Flex>
          <Flex gap={2} direction={"column"}>
            <Text color={"#84868a"}>LTP</Text>
            <Text color={"#ffffff"}>{data.latestSignal.ltp}</Text>
          </Flex>
          <Flex gap={2} direction={"column"}>
            <Text color={"#84868a"}>Buy Range</Text>
            <Text color={"#ffffff"}>{data.latestSignal.buyRange}</Text>
          </Flex>
          <Flex gap={2} direction={"column"}>
            <Text color={"#84868a"}>Target 1</Text>
            <Text color={"#ffffff"}>{data.latestSignal.target1}</Text>
          </Flex>
          <Flex gap={2} direction={"column"}>
            <Text color={"#84868a"}>Target 2</Text>
            <Text color={"#ffffff"}>{data.latestSignal.target2}</Text>
          </Flex>
          <Flex gap={2} direction={"column"}>
            <Text color={"#84868a"}>Target 3</Text>
            <Text color={"#ffffff"}>{data.latestSignal.target3}</Text>
          </Flex>
        </SimpleGrid>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          gap={4}
        >
          <Text color={"#84868a"}>
            Last Modified on {formatCreatedAt(data.latestSignal.createdAt)}
          </Text>
          <Button bg={"#9359c6"} rounded={"full"} _hover={{ bg: "#7938b3" }}>
            <Text fontSize={"sm"} color={"#ffffff"} onClick={onOpen}>
              View Details
            </Text>
          </Button>
        </Flex>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        preserveScrollBarGap
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent bg={"#1b2028"} p={4} mx={{ base: 5, md: 0}}>
          <ModalCloseButton color={"#9058c3"}/>
          <ModalHeader>
            <Flex direction={{ base: "column", md:"row"}} alignItems={"center"} justify={"space-between"}>
              <Flex alignItems="center" borderRadius="md">
                <Text color="white" fontSize={{ base: "xl", md: "3xl" }} mr={2}>
                  {data.name}
                </Text>
                <Box
                  alignItems={"center"}
                  bg="#eefcf0"
                  color="white"
                  borderRadius="lg"
                  px={4}
                >
                  <Text
                    color={"black"}
                    fontWeight={"semi-bold"}
                    fontSize={"xs"}
                  >
                    {data.market}
                  </Text>
                </Box>
              </Flex>

              <Flex alignItems={"center"} justifyContent={"space-between"} gap={3}>
                <Text color={"#84868a"} fontSize={"md"}>
                  Last Modified on{" "}
                  {formatCreatedAt(data.latestSignal.createdAt)}
                </Text>

                <Icon
                  as={StarIcon}
                  boxSize={6}
                  color={isFavourite ? "yellow.300" : "gray.400"}
                />
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <SimpleGrid
              columns={{ base: 2, md: 3, lg: 4 }}
              rowGap={8}
              textAlign={"center"}
              mb={4}
            >
              <Flex
                gap={2}
                direction={"column"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Text color={"#84868a"}>Call Type</Text>
                <Text color={"#ffffff"}>{data.latestSignal.type}</Text>
              </Flex>
              <Flex gap={2} direction={"column"}>
                <Text color={"#84868a"}>Call Status</Text>
                <Text color={"#ffffff"}>{data.latestSignal.status}</Text>
              </Flex>
              <Flex gap={2} direction={"column"}>
                <Text color={"#84868a"}>Stoploss</Text>
                <Text color={"#ffffff"}>{data.latestSignal.stopLoss}</Text>
              </Flex>
              <Flex gap={2} direction={"column"}>
                <Text color={"#84868a"}>LTP</Text>
                <Text color={"#ffffff"}>{data.latestSignal.ltp}</Text>
              </Flex>
              <Flex gap={2} direction={"column"}>
                <Text color={"#84868a"}>Buy Range</Text>
                <Text color={"#ffffff"}>{data.latestSignal.buyRange}</Text>
              </Flex>
              <Flex gap={2} direction={"column"}>
                <Text color={"#84868a"}>Target 1</Text>
                <Text color={"#ffffff"}>{data.latestSignal.target1}</Text>
              </Flex>
              <Flex gap={2} direction={"column"}>
                <Text color={"#84868a"}>Target 2</Text>
                <Text color={"#ffffff"}>{data.latestSignal.target2}</Text>
              </Flex>
              <Flex gap={2} direction={"column"}>
                <Text color={"#84868a"}>Target 3</Text>
                <Text color={"#ffffff"}>{data.latestSignal.target3}</Text>
              </Flex>
            </SimpleGrid>

            <Box>
              <Text color={"#84868a"}>Notes</Text>
              <Textarea bg={"black"} textColor={"white"} mt={2} isReadOnly resize={"none"} variant={"outline"}>
                No notes available
              </Textarea>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommodityCard;
