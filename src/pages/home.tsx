import { Box, Flex, Select, Text } from "@chakra-ui/react";
import CommodityCard from "../components/commodityCard";
import SuccessRateCard from "../components/successCard";
import Layout from "./layout";
import { useEffect, useState } from "react";


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
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight={"bold"}
          color={"white"}
        >
          Hey Anirudh!
        </Text>
        <Flex justifyContent={"center"} mt={5}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 4, md: 10 }}
            alignItems="space-between"
          >
            {successdata.map((data, index) => (
              <SuccessRateCard
                key={index}
                successRate={data.successRate}
                timeFrame={data.timeFrame}
              />
            ))}
          </Flex>
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
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 6, md: 10 }}
          alignItems="center"
          justifyContent="center"
          mt={4}
        >
          {userFavourites.length===0 ? (
            <Text color="white">No Favourites</Text>
          ) : (
            userFavourites.map((data, index) => (
              <CommodityCard
                key={index}
                data={data}
                isFavourite={true}
              />
            ))
          )}
        </Flex>
      </Box>

      <Box px={10} mt={10}>
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

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 6, md: 10 }}
          alignItems="center"
          justifyContent="center"
          mt={4}
        >
          {userFavourites.length===0 ? (
            <Text color="white">No Favourites</Text>
          ) : (
            userFavourites.map((data, index) => (
              <CommodityCard
                key={index}
                data={data}
                isFavourite={false}
              />
            ))
          )}
        </Flex>
      </Box>

      <Box px={10} mt={10}>
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

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 6, md: 10 }}
          alignItems="center"
          justifyContent="center"
          mt={4}
        >
          {userFavourites.length===0 ? (
            <Text color="white">No Favourites</Text>
          ) : (
            userFavourites.map((data, index) => (
              <CommodityCard
                key={index}
                data={data}
                isFavourite={false}
              />
            ))
          )}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Home;
