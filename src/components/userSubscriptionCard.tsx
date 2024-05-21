import { Avatar, Badge, Box, Circle, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";

interface SubscriptionDetails {
  data: {
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
}

const UserSubscriptionCard: React.FC<SubscriptionDetails> = ({ data }) => {
  const formatDate = (createdAt: string) => {
    const date = new Date(createdAt);
    // const options: Intl.DateTimeFormatOptions = {
    //   timeZone: "Asia/Kolkata",
    //   hour12: true,
    //   hour: "numeric",
    //   minute: "numeric",
    // };
    return format(date, "do MMMM");
  };

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="lg"
      w={"max-content"}
      bg={"purple.900"}
    >
      <Flex alignItems="center" gap={6}>
        {/* <Avatar src={avatarUrl} size="md" mr="4" /> */}
        <Circle
          bg={"lightcoral"}
          size={20}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {data.user_details.profilePicture ? (
            <Avatar src={data.user_details.profilePicture} size="md" mr="4" />
          ) : (
            <Text fontSize={"4xl"}>{data.user_details.name.charAt(0).toUpperCase()}</Text>
          )}
        </Circle>
        <Box>
          <Flex alignItems={"center"} gap={2}>
            <Text color={"white"} fontSize="xl" fontWeight="bold">
              {data.user_details.name}
            </Text>

            <Badge colorScheme="green" mr="2">
              {data.subscription_details.type}
            </Badge>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            Days Left: {data.days_left}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Subscription Start:{" "}
            {formatDate(data.subscription_details.startDate)}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Subscription End: {formatDate(data.subscription_details.endDate)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserSubscriptionCard;
