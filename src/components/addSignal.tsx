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
import { Emoji } from "emoji-picker-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface SignalSchema {
  Script: {
    connect: {
      id: number;
    };
  };
  ltp: number;
  type: string;
  target1: number;
  target2: number;
  target3: number;
  status: string;
  buyRange: number;
  stopLoss: number;
  selectedScriptName?: string;
}

interface ScriptDataSchema {
  id: number;
  name: string;
  emoji: string;
}

const initialSignalData: SignalSchema = {
  Script: {
    connect: {
      id: 0,
    },
  },
  ltp: 0,
  type: "",
  target1: 0,
  target2: 0,
  target3: 0,
  status: "",
  buyRange: 0,
  stopLoss: 0,
  selectedScriptName: "",
};

const AddSignal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [signalData, setSignalData] = useState<SignalSchema>(initialSignalData);
  const [scriptDataList, setScriptDataList] = useState<ScriptDataSchema[]>();

  const getScriptData = async () => {
    const response = await fetch("http://localhost:3000/scripts/ids", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    console.log(res)
    setScriptDataList(res.data);
  };

  const handleSignal = async () => {
    const { selectedScriptName, ...dataToSend } = signalData;

    console.log(dataToSend);

    const response = await fetch("http://localhost:3000/signals/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const res = await response.json();

    if (res.error) {
      toast.error(`Error creating signal: ${res.message}`);
      console.log(res);
    } else {
      toast.success("Signal created successfully");
      setSignalData(initialSignalData);
    }
  };

  const handleSignalNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof SignalSchema
  ) => {
    const value = e.target.value;
    const numberValue = value === "" ? 0 : parseFloat(value);
    setSignalData({ ...signalData, [key]: numberValue });
  };

  const handleButtonClick = async () => {
    await getScriptData();
    onOpen();
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
          Add Signal
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent bg={"#1b2028"} p={4} mx={{ base: 5, md: 0 }}>
          <ModalCloseButton color={"#9058c3"} />
          <ModalBody>
            <Box alignContent={"center"} justifyContent={"center"} mb={4}>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={"bold"}
                color={"white"}
                alignSelf={"center"}
              >
                Create a Signal
              </Text>
            </Box>

            <Box
              maxHeight="400px"
              overflow="auto"
              p={2}
              borderRadius="md"
              css={{
                /* Scrollbar styles */
                "&::-webkit-scrollbar": {
                  width: "4px",
                  height: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#1b2028",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#9058c3",
                  borderRadius: "24px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#7938b3",
                },
              }}
            >
              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Select the Script
                </Text>
                <Select
                  color={"white"}
                  placeholder="Select the Script"
                  bg={"#1b2028"}
                  value={signalData.selectedScriptName}
                  onChange={(e) => {
                    const selectedScriptName = e.target.value;
                    const selectedScript = scriptDataList?.find(
                      (script) => script.name === selectedScriptName
                    );

                    if (selectedScript) {
                      setSignalData({
                        ...signalData,
                        Script: {
                          connect: {
                            id: selectedScript.id,
                          },
                        },
                        selectedScriptName: selectedScript.name,
                      });
                    }
                  }}
                >
                  {scriptDataList && scriptDataList.length > 0 ? (
                    scriptDataList.map((data) => (
                      <option key={data.id}>
                        {data.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No scripts available</option>
                  )}
                </Select>
              </Box>

              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  LTP
                </Text>
                <Input
                  color={"white"}
                  placeholder="Enter a value"
                  type="number"
                  value={signalData.ltp === 0 ? "" : signalData.ltp}
                  onChange={(e) => handleSignalNumberChange(e, "ltp")}
                  onWheel={(e) => e.preventDefault()}
                ></Input>
              </Box>

              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Type
                </Text>
                <Select
                  color={"white"}
                  placeholder="Select the Action"
                  value={signalData.type}
                  onChange={(e) => {
                    if (e.target.value !== "Select the Action") {
                      setSignalData({
                        ...signalData,
                        type: e.target.value,
                      });
                    }
                  }}
                >
                  <option>Buy</option>
                  <option>Sell</option>
                </Select>
              </Box>

              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Target 1
                </Text>
                <Input
                  color={"white"}
                  placeholder="Enter a value"
                  type="number"
                  value={signalData.target1 === 0 ? "" : signalData.target1}
                  onChange={(e) => handleSignalNumberChange(e, "target1")}
                  onWheel={(e) => e.preventDefault()}
                ></Input>
              </Box>

              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Target 2
                </Text>
                <Input
                  color={"white"}
                  placeholder="Enter a value"
                  type="number"
                  value={signalData.target2 === 0 ? "" : signalData.target2}
                  onChange={(e) => handleSignalNumberChange(e, "target2")}
                  onWheel={(e) => e.preventDefault()}
                ></Input>
              </Box>

              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Target 3
                </Text>
                <Input
                  color={"white"}
                  placeholder="Enter a value"
                  type="number"
                  value={signalData.target3 === 0 ? "" : signalData.target3}
                  onChange={(e) => handleSignalNumberChange(e, "target3")}
                  onWheel={(e) => e.preventDefault()}
                ></Input>
              </Box>

              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Status
                </Text>
                <Select
                  color={"white"}
                  placeholder="Select the Status"
                  value={signalData.status}
                  onChange={(e) => {
                    if (e.target.value !== "Select the Status") {
                      setSignalData({
                        ...signalData,
                        status: e.target.value,
                      });
                    }
                  }}
                >
                  <option>Open</option>
                  <option>Close</option>
                </Select>
              </Box>

              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Buy Range
                </Text>
                <Input
                  color={"white"}
                  placeholder="Enter a value"
                  type="number"
                  value={signalData.buyRange === 0 ? "" : signalData.buyRange}
                  onChange={(e) => handleSignalNumberChange(e, "buyRange")}
                  onWheel={(e) => e.preventDefault()}
                ></Input>
              </Box>

              <Box mb={4}>
                <Text color={"white"} fontWeight={"semibold"} mb={2}>
                  Stoploss
                </Text>
                <Input
                  color={"white"}
                  placeholder="Enter a value"
                  type="number"
                  value={signalData.stopLoss === 0 ? "" : signalData.stopLoss}
                  onChange={(e) => handleSignalNumberChange(e, "stopLoss")}
                  onWheel={(e) => e.preventDefault()}
                ></Input>
              </Box>
            </Box>

            <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
              <Button
                bg={"#9359c6"}
                color={"white"}
                rounded={"full"}
                onClick={handleSignal}
                _hover={{ bg: "#7938b3" }}
              >
                Create Signal
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSignal;
