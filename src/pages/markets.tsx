import {
  Box,
  Button,
  Divider,
  Flex,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Layout from "./layout";
import { useEffect, useState } from "react";
import CommodityCard from "../components/commodityCard";

interface dataFormat {
  id: number;
  name: string;
  market: string;
  isFavourite: boolean;
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

interface MarketSchema {
  id: number;
  name: string;
}

const MarketsAndExchanges = () => {
  const [type, setType] = useState<string>("");
  const [time, setTime] = useState<string>("This week");
  const [action, setAction] = useState<string>("");
  const [data, setData] = useState<dataFormat[]>([]);

  const [markets, setMarkets] = useState<MarketSchema[]>([]);

  useEffect(() => {
    getData();
    console.log(data);
    getMarkets();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/signals/getLatestSignals"
      );

      const res = await response.json();
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getMarkets = async () => {
    const response = await fetch("http://localhost:3000/market/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    if (!res.error) {
      setMarkets(res.data);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(event.target.value);
    console.log(time);
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "All") {
      setAction("");
    } else {
      setAction(event.target.value);
    }
    console.log(action);
  };

  const openSignals = data.filter(
    (data) =>
      data.latestSignal &&
      data.latestSignal.status === "Open" &&
      (!type || data.market === type) &&
      (!action || data.latestSignal.type === action)
  );

  const closedSignals = data.filter(
    (data) =>
      data.latestSignal &&
      data.latestSignal.status === "Closed" &&
      (!type || data.market === type) &&
      (!action || data.latestSignal.type === action)
  );

  return (
    <Layout pathName="Markets & Exchanges">
      <Box px={{ base: 4, md: 10 }}>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight={"bold"}
          color={"white"}
        >
          Markets and Exchanges
        </Text>
      </Box>

      <Flex
        direction={{ base: "column", lg: "row" }}
        mt={8}
        gap={4}
        justify={"space-between"}
        alignItems={{ base: "flex-end", md: "none" }}
        px={{ base: 4, md: 10 }}
      >
        <Flex gap={8}>
          {markets && markets.length > 0 ? (
            markets.map((market) => (
              <Button
                key={market.id}
                bg={ type===market.name ? "purple.500" : "gray.700" }
                onClick={() => {
                  if (type !== market.name) {
                    setType(market.name);
                  } else {
                    setType("");
                  }
                }}
              >
                {market.name}
              </Button>
            ))
          ) : (
            <></>
          )}
        </Flex>

        <Flex gap={8}>
          <Select
            variant="filled"
            placeholder="All"
            w={"max-content"}
            onChange={handleActionChange}
          >
            <option>Buy</option>
            <option>Sell</option>
          </Select>
          <Select
            variant="filled"
            placeholder="This Week"
            w={"max-content"}
            onChange={handleTimeChange}
          >
            <option>This month</option>
            <option>Last 6 months</option>
          </Select>
        </Flex>
      </Flex>

      <Box px={{ base: 4, md: 10 }} mt={5}>
        <Text color={"white"} fontWeight={"bold"} fontSize={"2xl"}>
          Open Signals
        </Text>
        {openSignals.length === 0 ? (
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight={"semibold"}
            color={"white"}
            textAlign={"center"}
          >
            {" "}
            No Open Signals
          </Text>
        ) : (
          <SimpleGrid
            mt={10}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, md: 10 }}
          >
            {openSignals.map((data, index) => (
              <CommodityCard key={index} data={data} isFavourite={false} />
            ))}
          </SimpleGrid>
        )}
      </Box>

      <Box px={{ base: 4, md: 10 }} my={4}>
        <Divider />
      </Box>

      <Box px={{ base: 4, md: 10 }}>
        <Text color={"white"} fontWeight={"bold"} fontSize={"2xl"}>
          Closed Signals
        </Text>
        {closedSignals.length === 0 ? (
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight={"semibold"}
            color={"white"}
            textAlign={"center"}
          >
            {" "}
            No Closed Signals
          </Text>
        ) : (
          <SimpleGrid
            mt={10}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, md: 10 }}
          >
            {closedSignals.map((data, index) => (
              <CommodityCard key={index} data={data} isFavourite={false} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Layout>
  );
};

export default MarketsAndExchanges;
