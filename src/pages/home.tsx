import { Box, Flex, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddScript from "../components/addScript";
import AddSignal from "../components/addSignal";
import CommodityCard from "../components/commodityCard";
import SuccessRateCard from "../components/successCard";
import Layout from "./layout";

interface SuccessData {
  successRate: string;
  timeFrame: string;
}

interface UserFavourite {
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

const Home = () => {
  const successdata: SuccessData[] = [
    { successRate: "45 %", timeFrame: "This Month" },
    { successRate: "45 %", timeFrame: "This Month" },
    { successRate: "45 %", timeFrame: "This Month" },
    { successRate: "45 %", timeFrame: "This Month" },
  ];

  const [userFavourites, setUserFavourites] = useState<UserFavourite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/home/get-home-details/1",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const res = await response.json();
        setUserFavourites(res.data.favouriteSignals.data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getHomeData();
  }, []);

  return (
    <Layout pathName="Home">
      <Box px={{ base: 4, md: 10 }}>
        <Flex
          alignContent={"center"}
          justifyContent={"space-between"}
          direction={{ base: "column", md: "row" }}
        >
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight={"bold"}
            color={"white"}
          >
            Hey Anirudh!
          </Text>

          <Flex alignContent={"center"} gap={5} mt={{ sm: 10, md: 0 }}>
            <AddScript />
            <AddSignal />
          </Flex>
        </Flex>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 4, md: 10 }}
          alignItems="space-between"
          justifyContent={"flex-start"}
          mt={5}
        >
          {successdata.map((data, index) => (
            <SuccessRateCard
              key={index}
              successRate={data.successRate}
              timeFrame={data.timeFrame}
            />
          ))}
        </Flex>
      </Box>

      <Box px={{ base: 4, md: 10 }} mt={8}>
        <Text
          color={"white"}
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight={"bold"}
        >
          Favourites
        </Text>
        {userFavourites && userFavourites.length === 0 ? (
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight={"semibold"}
            color={"white"}
            textAlign={"center"}
          >
            {" "}
            No Favourites
          </Text>
        ) : (
          <SimpleGrid
            mt={10}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, md: 10 }}
          >
            {userFavourites.map((data, index) => (
              <CommodityCard key={index} data={data} isFavourite={true} />
            ))}
          </SimpleGrid>
        )}
      </Box>

      <Box px={{ base: 4, md: 10 }} mt={8}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            color={"white"}
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight={"bold"}
          >
            Today's Call
          </Text>
          <Select
            variant="filled"
            bg={"#1c2027"}
            color={"white"}
            width={{ base: "40%", md: "10%" }}
            placeholder="Past Hour"
          >
            <option value="pastHour">Past Hour</option>
            <option value="past6Hours">Past 6 hours</option>
            <option value="past12Hours">Past 12 hours</option>
            <option value="past24Hours">Past 24 hours</option>
          </Select>
        </Flex>
        {userFavourites.length === 0 ? (
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight={"semibold"}
            color={"white"}
            textAlign={"center"}
          >
            {" "}
            No Favourites
          </Text>
        ) : (
          <SimpleGrid
            mt={10}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, md: 10 }}
          >
            {userFavourites.map((data, index) => (
              <CommodityCard key={index} data={data} isFavourite={true} />
            ))}
          </SimpleGrid>
        )}
      </Box>

      <Box px={{ base: 4, md: 10 }} mt={8}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text
            color={"white"}
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight={"bold"}
          >
            Past Performances
          </Text>
          <Select
            variant="filled"
            width={{ base: "40%", md: "10%" }}
            placeholder="This Week"
            bg={"#1c2027"}
            color={"white"}
          >
            <option value="pastHour">This Week</option>
            <option value="past6Hours">This Month</option>
            <option value="past12Hours">Last 6 Months</option>
            <option value="past24Hours">Last 12 Months</option>
          </Select>
        </Flex>
        {userFavourites.length === 0 ? (
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight={"semibold"}
            color={"white"}
            textAlign={"center"}
          >
            {" "}
            No Favourites
          </Text>
        ) : (
          <SimpleGrid
            mt={10}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, md: 10 }}
          >
            {userFavourites.map((data, index) => (
              <CommodityCard key={index} data={data} isFavourite={true} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Layout>
  );
};

export default Home;
