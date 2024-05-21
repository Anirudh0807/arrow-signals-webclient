import {
  Box,
  Text,
  Avatar,
  Flex,
  Stack,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaBell, FaEdit } from "react-icons/fa";
import Layout from "./layout";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(false);

  function getUserData() {
    const id = localStorage.getItem("userId");
    setLoading(true);
    fetch("http://localhost:3000/users/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data["statusCode"] != null) {
          //
        } else {
          setUserData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }

  useEffect(getUserData, []);

  return (
    <Layout pathName="Profile">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        direction="column"
        px={4}
        bgColor={"black"}
      >
        {isLoading ? (
          <Center>
            <Spinner size="xl" color="white" />
          </Center>
        ) : (
          <>
            <Flex w="100%" justify="space-between" align="center" mb={4}>
              <Text fontSize="3xl" fontWeight={600} color={"white"}>
                Your Profile
              </Text>
              <Box>
                <FaBell size={24} color="white" />
              </Box>
            </Flex>
            <Box w={700} h={200} bg="#121212" borderRadius={15}>
              <Center mt={-50}>
                <Box w={200} h={200}>
                  <Avatar
                    size={"3xl"}
                    borderColor={"red"}
                    borderWidth={2}
                    src={
                      userData["profilePicture"] == null
                        ? "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                        : userData["profilePicture"]
                    }
                    mt={0}
                    mx="auto"
                  />
                  <Text
                    align={"center"}
                    fontWeight={550}
                    fontSize={"3xl"}
                    color={"white"}
                  >
                    Ritesh Kumar
                  </Text>
                </Box>
              </Center>
            </Box>
            <Stack spacing={8} align="center" marginTop={30}>
              <Box w={700} h={180} bg="#121212" borderRadius={10} padding={5}>
                <Flex justify={"right"}>
                  <Box>
                    <FaEdit size={24} color={"white"} />
                  </Box>
                </Flex>
                <Flex justify={"space-between"} mt={4}>
                  <Text color={"white"}>Name:</Text>
                  <Text color={"white"}>{userData["name"]}</Text>
                </Flex>
                <Flex justify={"space-between"} mt={4}>
                  <Text color={"white"}>Email:</Text>
                  <Text color={"white"}>{userData["email"]}</Text>
                </Flex>
                <Flex justify={"space-between"} mt={4}>
                  <Text color={"white"}>Location:</Text>
                  <Text color={"white"}>New York City</Text>
                </Flex>
              </Box>
              <Box w={700} h={180} bg="#121212" borderRadius={10} padding={5}>
                <Flex justify={"space-between"} mt={4}>
                  <Text color={"white"}>Notification on Telegram:</Text>
                  <Text color={"white"}>On</Text>
                </Flex>
              </Box>
            </Stack>
          </>
        )}
      </Flex>
    </Layout>
  );
};

export default UserProfile;
