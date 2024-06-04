import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface SuccessRateCardProps {
  successRate: string;
  timeFrame: string;
}

const SuccessRateCard: React.FC<SuccessRateCardProps> = ({ successRate, timeFrame }) => {
  return (
    <Box
      w="100%"
      maxW="600px"
      p={10}
      bgGradient="linear(to-tr, #5c3055, #45528d, #8b5cc0)"
      borderRadius="12px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex alignItems="center" justifyContent={"center"}>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Success Rate
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" gap={4}>
        <Text fontSize="3xl" fontWeight={"bold"} color="white">
          {successRate}
        </Text>
        <Text fontSize="md" color="gray.400">
          {timeFrame}
        </Text>
      </Flex>
    </Box>
  );
};

export default SuccessRateCard;