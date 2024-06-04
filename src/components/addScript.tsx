import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import EmojiPicker, { Emoji, EmojiClickData } from "emoji-picker-react";

interface MarketSchema {
  id: number;
  name: string;
}

interface ScriptSchema {
  name: string;
  Market: {
    connect: {
      id: number;
    };
  };
  emoji: string;
  marketName: string;
}

const initialScriptData: ScriptSchema = {
  name: "",
  Market: {
    connect: {
      id: 0,
    },
  },
  emoji: "",
  marketName: "",
};

const AddScript = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [scriptData, setScriptData] = useState<ScriptSchema>(initialScriptData);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [marketData, setMarketData] = useState({
    name: "",
  });

  const [markets, setMarkets] = useState<MarketSchema[]>();

  useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = async () => {
    const response = await fetch("http://localhost:3000/market/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    if (res.error) {
      toast.error(`Error fetching markets: ${res.message}`);
    } else {
      setMarkets(res.data);
    }
  };

  const handleScript = async () => {
    const { marketName, ...data } = scriptData;
    const response = await fetch("http://localhost:3000/scripts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (res.error) {
      toast.error(`Error creating script: ${res.message}`);
    } else {
      toast.success("Script created successfully");
      setScriptData(initialScriptData);
    }
  };

  const handleMarket = async () => {
    const response = await fetch("http://localhost:3000/market/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(marketData),
    });

    const res = await response.json();

    if (res.error) {
      toast.error(`Error creating market: ${res.message}`);
    } else {
      toast.success("Market created successfully");
      setMarketData({
        name: "",
      });
      getMarkets();
    }
  };

  const handleButtonClick = async () => {
    await getMarkets();
    onOpen();
  };

  const onEmojiSelect = (emojiData: any, e: any) => {
    setScriptData({
      ...scriptData,
      emoji: emojiData.unified,
    });
    setShowEmojiPicker(false);
  };

  return (
    <>
      <Box>
        <Button
          bg={"#9359c6"}
          rounded={"full"}
          color={"white"}
          onClick={handleButtonClick}
          _hover={{ bg: "#7938b3" }}
        >
          {" "}
          Add Script{" "}
        </Button>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        preserveScrollBarGap
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent bg={"#1b2028"} p={4} mx={{ base: 5, md: 0 }}>
          <ModalCloseButton color={"#9058c3"} />
          <ModalBody>
            <Box alignContent={"center"} justifyContent={"center"}>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={"bold"}
                color={"white"}
                alignSelf={"center"}
              >
                Create a Script
              </Text>
            </Box>

            <Box px={5} mt={5}>
              <Box>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Name
                </Text>
                <Input
                  color={"white"}
                  placeholder="Enter a name"
                  value={scriptData.name}
                  onChange={(e) => {
                    setScriptData({
                      ...scriptData,
                      name: e.target.value,
                    });
                  }}
                ></Input>
              </Box>

              <Box mt={5}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Market
                </Text>
                <Select
                  color={"white"}
                  placeholder="Select a Market"
                  value={scriptData.marketName}
                  onChange={(e) => {
                    const selectedMarketName = e.target.value;
                    const selectedMarket = markets?.find(
                      (market) => market.name === selectedMarketName
                    );

                    if (selectedMarket) {
                      setScriptData({
                        ...scriptData,
                        Market: {
                          connect: {
                            id: selectedMarket.id,
                          },
                        },
                        marketName: selectedMarketName,
                      });
                    }
                  }}
                >
                  {markets && markets.length > 0 ? (
                    markets.map((market) => (
                      <option key={market.id} value={market.name}>
                        {market.name}
                      </option>
                    ))
                  ) : (
                    <option value={""}>No Markets Avaliable</option>
                  )}
                </Select>

                <Button mt={5} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  {scriptData.emoji ? (
                    <>
                      <Text>Selected Emoji:</Text>
                      <Emoji unified={scriptData.emoji}/>
                    </>
                  ) : (
                    <Text>Pick an Emoji</Text>
                  )}
                </Button>
                {showEmojiPicker && (
                  <EmojiPicker onEmojiClick={onEmojiSelect} />
                )}
              </Box>
            </Box>

            <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
              <Button color={"white"} bg={"#9359c6"} onClick={handleScript}>
                Create
              </Button>
            </Flex>

            <Box mt={10}>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={"bold"}
                color={"white"}
                alignSelf={"center"}
              >
                Create a Market
              </Text>

              <Box mt={5} justifyContent={"space-between"} px={5}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Name
                </Text>
                <Input
                  color={"white"}
                  placeholder="Enter a name"
                  value={marketData.name}
                  onChange={(e) => {
                    setMarketData({
                      name: e.target.value,
                    });
                  }}
                ></Input>
              </Box>

              <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
                <Button color={"white"} bg={"#9359c6"} onClick={handleMarket}>
                  Create
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default AddScript;
