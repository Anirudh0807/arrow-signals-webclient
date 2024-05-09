import axios, { AxiosResponse } from 'axios';

const endpointUrl = 'http://localhost:3000/subscription/';

export async function upgradePremium(userId:number,subscriptionType:string){
    
    axios.post(endpointUrl+'upgrade/'+userId+'/'+subscriptionType, {
        "Content-Type": "application/json"
      })
    .then((response: AxiosResponse) => {
      console.log('Response:', response.data);
      getDetailsOfUserSubscriptions(1)
    })
    .catch((error: unknown) => {
      // Handle error
      console.error('Error:', error);
    });
}


export async function getDetailsOfUserSubscriptions(userId:number){
    axios.get(endpointUrl+'info/'+userId)
    .then((response: AxiosResponse) => {
      console.log('Response:', response.data);
    })
    .catch((error: unknown) => {
      // Handle error
      console.error('Error:', error);
    });
}
