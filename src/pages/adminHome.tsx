import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminLayout from "./adminLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSubscriptionCard from "../components/userSubscriptionCard";

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

interface SubscriptionDetails {
  days_left: number;
  subscription_details: {
    id: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
    type: string;
    userId: number;
  };
  user_details: {
    id: number;
    name: string;
    email: string;
    type: string;
    profilePicture: string | null;
    deleted: string | null;
    authType: string;
    favoutites: string;
  };
};

const AdminHome = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [scriptData, setScriptData] = useState({
    name: "",
    market: "Forex",
  });

  const [signalData, setSignalData] = useState<SignalSchema>(initialSignalData);

  const [scriptDataList, setScriptDataList] = useState<ScriptDataSchema[]>();

  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails[]>();

  useEffect(() => {
    getSubscriptionDetails();
    getScriptData();
  }, []);

  const getScriptData = async () => {
    const response = await fetch("http://localhost:3000/scripts/ids", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    setScriptDataList(res.data);
  };

  const getSubscriptionDetails = async () => {
    const response = await fetch("http://localhost:3000/subscription/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    setSubscriptionDetails(res.data);
  }

  const handleScript = async () => {
    const response = await fetch("http://localhost:3000/scripts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scriptData),
    });

    const res = await response.json();

    if(res.error){
      toast.error(`Error creating script: ${res.message}`);
    } else {
      toast.success("Script created successfully");
      setScriptData({
        name: "",
        market: "Forex",
      });
    }

    getScriptData();
  };

  const handleSignal = async () => {
    console.log(signalData);

    const response = await fetch("http://localhost:3000/signals/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signalData),
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

  return (
    <AdminLayout pathName="Home">
      <Box p={20}>
        <SimpleGrid columns={3}>
          {subscriptionDetails?.map((data) => (
            <UserSubscriptionCard data={data}/>
          ))}
        </SimpleGrid>
      </Box>

      <Circle position="fixed" bottom="6" right="10">
        <IconButton
          aria-label="Add"
          icon={<AddIcon />}
          color={"white"}
          bg={"#9359c6"}
          size="lg"
          className="shadow-md"
          onClick={onOpen}
        />
      </Circle>

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
            <Tabs isFitted variant="unstyled">
              <TabList mb="1em">
                <Tab color={"#9058c3"}>
                  <Text fontWeight={"bold"} fontSize={"xl"}>
                    Create Script
                  </Text>
                </Tab>
                <Tab color={"#9058c3"}>
                  <Text fontWeight={"bold"} fontSize={"xl"}>
                    Create Signal
                  </Text>
                </Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <SimpleGrid columns={2} columnGap={5}>
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

                    <Box>
                      <Text color={"white"} fontWeight={"semibold"} mb={2}>
                        Market
                      </Text>
                      <Select
                        color={"white"}
                        placeholder="Forex"
                        value={scriptData.market}
                        onChange={(e) => {
                          setScriptData({
                            ...scriptData,
                            market: e.target.value,
                          });
                        }}
                      >
                        <option>Commoditiy</option>
                        <option>Stocks</option>
                      </Select>
                    </Box>
                  </SimpleGrid>

                  <Flex mt={4} justifyContent={"center"} alignItems={"center"}>
                    <Button
                      color={"white"}
                      bg={"#9359c6"}
                      onClick={handleScript}
                    >
                      Create
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Box>
                    <Select
                      color={"white"}
                      placeholder="Select the Script"
                      bg={"#1b2028"}
                      value={signalData.selectedScriptName} // Set the value to the script name
                      onChange={(e) => {
                        const selectedScriptName = e.target.value; // Get the selected script's ID
                        const selectedScript = scriptDataList?.find(
                          (script) => script.name === selectedScriptName
                        ); // Find the corresponding script in the list

                        if (selectedScript) {
                          setSignalData({
                            ...signalData,
                            Script: {
                              connect: {
                                id: selectedScript.id, // Set the ID to the selected script's ID
                              },
                            },
                            selectedScriptName: selectedScript.name, // Set the name to the selected script's name
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

                    <SimpleGrid columns={2} columnGap={5} mt={5} rowGap={4}>
                      <Box>
                        <Text color={"white"} fontWeight={"semibold"} mb={2}>
                          LTP
                        </Text>
                        <Input
                          color={"white"}
                          placeholder="Enter a value"
                          type="number"
                          pattern="[0-9]*"
                          value={signalData.ltp}
                          onChange={(e) => {
                            setSignalData({
                              ...signalData,
                              ltp: Number(e.target.value),
                            });
                          }}
                        ></Input>
                      </Box>

                      <Box>
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

                      <Box>
                        <Text color={"white"} fontWeight={"semibold"} mb={2}>
                          Target 1
                        </Text>
                        <Input
                          color={"white"}
                          placeholder="Enter a value"
                          value={signalData.target1}
                          onChange={(e) => {
                            setSignalData({
                              ...signalData,
                              target1: Number(e.target.value),
                            });
                          }}
                        ></Input>
                      </Box>

                      <Box>
                        <Text color={"white"} fontWeight={"semibold"} mb={2}>
                          Target 2
                        </Text>
                        <Input
                          color={"white"}
                          placeholder="Enter a value"
                          value={signalData.target2}
                          onChange={(e) => {
                            setSignalData({
                              ...signalData,
                              target2: Number(e.target.value),
                            });
                          }}
                        ></Input>
                      </Box>

                      <Box>
                        <Text color={"white"} fontWeight={"semibold"} mb={2}>
                          Target 3
                        </Text>
                        <Input
                          color={"white"}
                          placeholder="Enter a value"
                          value={signalData.target3}
                          onChange={(e) => {
                            setSignalData({
                              ...signalData,
                              target3: Number(e.target.value),
                            });
                          }}
                        ></Input>
                      </Box>

                      <Box>
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

                      <Box>
                        <Text color={"white"} fontWeight={"semibold"} mb={2}>
                          Buy Range
                        </Text>
                        <Input
                          color={"white"}
                          placeholder="Enter a value"
                          value={signalData.buyRange}
                          onChange={(e) => {
                            setSignalData({
                              ...signalData,
                              buyRange: Number(e.target.value),
                            });
                          }}
                        ></Input>
                      </Box>

                      <Box>
                        <Text color={"white"} fontWeight={"semibold"} mb={2}>
                          Stoploss
                        </Text>
                        <Input
                          color={"white"}
                          placeholder="Enter a value"
                          value={signalData.stopLoss}
                          onChange={(e) => {
                            setSignalData({
                              ...signalData,
                              stopLoss: Number(e.target.value),
                            });
                          }}
                        ></Input>
                      </Box>
                    </SimpleGrid>

                    <Flex
                      mt={4}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Button
                        color={"white"}
                        bg={"#9359c6"}
                        onClick={handleSignal}
                      >
                        Create
                      </Button>
                    </Flex>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>

      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminHome;
