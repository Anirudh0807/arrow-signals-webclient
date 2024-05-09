// PricingPage.tsx

import { Flex, Text } from '@chakra-ui/react';
import Pricing from '../components/pricing';
import { useState } from 'react';
import { getDetailsOfUserSubscriptions, upgradePremium } from '../http/buy_subscription';


const PricingPage = () => {

  const [selected, updateSelected] = useState([false, true, false, false])
  return (
    <div style={{ height: '100vh', backgroundColor: 'black' }}  >
      <Text fontSize="4xl" fontWeight="bolder" pb={4} pt={10} pl={10} color={'white'}>
        Select a Subscription
      </Text>
      <Flex
        justifyContent={'center'}
        scrollBehavior={'auto'}
        flexDir={'row'}
        overflow={'auto'}
        overflowX={'auto'}
        backgroundColor={'black.200'}
        gap={6}
        pt={10}>
        <Pricing
          currentType='FREE'
          onbuyNow={
            () => {
              console.log("FREEE")
            }
          }
          price={0}
          subscriptionType='FREE'
          selected={selected[0]} onclick={
            () => {
              console.log("THIS TAPPED")
              updateSelected([true, false, false, false])
            }
          } />
        <Pricing
          currentType='FREE'
          onbuyNow={
            () => {
              console.log("SILVERRRR")
              getDetailsOfUserSubscriptions(1)
              upgradePremium(1,'silver')
            }
          }
          price={70}
          subscriptionType='SILVER'
          selected={selected[1]} onclick={
            () => {
              updateSelected([false, true, false, false])
            }
          } />
        <Pricing
          currentType='FREE'
          onbuyNow={
            () => {
              console.log("GOLDDDD")
              getDetailsOfUserSubscriptions(1)
              upgradePremium(1,'gold')
              
            }
          }
          price={100}
          subscriptionType='GOLD'
          selected={selected[2]} onclick={
            () => {
              updateSelected([false, false, true, false])
            }
          } />
        <Pricing
          currentType='FREE'
          onbuyNow={
            () => {
              console.log("DIAMOND")
              getDetailsOfUserSubscriptions(1)
              upgradePremium(1,'diamond')
            }
          }
          price={150}
          subscriptionType='DIAMOND'
          selected={selected[3]} onclick={
            () => {
              updateSelected([false, false, false, true])
            }
          } />

      </Flex>
    </div >
  );
};



export default PricingPage;
