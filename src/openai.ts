import { appendSkinToneIndex } from 'emojibase';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || ''
});

const openai = new OpenAIApi(configuration);

// export const chatCompletion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   messages: [{role: "user", content: "Hello world"}],
// });
// console.log(chatCompletion.data.choices[0].message);


export const logOpenAI = async () => {
  console.log("openai initialized");
  console.log(configuration.apiKey);

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Invite the user to our app and explain that the bot will help to prepare the query for airstack.xyz"}],
  });
  console.log(chatCompletion.data.choices[0].message);
}


export const queryOpenAI = async (value: string) => {
  const prompt = `
  an api accepts the data in the following format only:
  
  query QB3 {
    TokenNfts(input: {filter: {address: {_eq: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"}, metaData: {attributes: {_and: [{trait_type: {_eq: "param1"}}, {trait_type: {_eq: "param2"}}]}}}, blockchain: ethereum, limit: 50}) {
      TokenNft {
        address
        tokenId
        metaData {
          attributes {
            trait_type
            value
          }
        }
        tokenBalances {
          owner {
            addresses
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
  

  return the data in form of the above json object
  
  where "trait_type" is an array of key-value pairs representing the traits in the following list Hat, Eyes, Mouth, Clothes, Background, Fur
  
  replace in the form above the param1 and param2 by values of the traits you will have extracted from the prompt provided

  And give me only the json object, no text, nothing at all
  
  the user message is ${value}, update the current value and return the json object
      `;

  console.log("openai initialized");
  console.log(configuration.apiKey);

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(chatCompletion.data);
  return chatCompletion.data.choices[0].message?.content;
}

// interface State {
//   interests: string[];
//   notInterests: string[];
//   profession: string;
//   userProfession: string;
// }

// export async function updateState(state: State, message: string) {
//   const prompt = `
//       an api accepts the data in the following format only:
//       """
//       {
//           "traits": [],
//           "collection": ""
//       }
//       """
//       return the data in form of the above json object 
      
//       where "interests" is the list of all the interests i want in my peer, "notInterests" is the list of all the interests that i dont want in my peer, "profession" is the profession of my peer and "userProfession" is my profession
//       And give me only the json object, no text, nothing at all
      
//       the user message is ${message}, update the current value and return the json object
//           `;
//       const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{"role": "user", "content": prompt}],
//         temperature: 1,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//       });
          
//   // const response = await openai.createChatCompletion({
//   //   model: 'text-davinci-003',
//   //   prompt,
//   //   temperature: 0.8,
//   //   max_tokens: 256,
//   //   top_p: 1,
//   //   frequency_penalty: 0,
//   //   presence_penalty: 0
//   // });
//   // const newState = JSON.parse(response.data.choices[0].text as string) as State;
//   // state.interests = newState.interests;
//   // state.notInterests = newState.notInterests;
//   // state.profession = newState.profession;
//   // state.userProfession = newState.userProfession;
//   return state;
// }





// const prompt = `
// an api accepts the data in the following format only:
// """
// query QB3 {
//   TokenNfts(input: {filter: {address: {_eq: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"}, metaData: {attributes: {_and: [{trait_type: {_eq: "sunglasses"}}, {trait_type: {_eq: "hat"}}]}}}, blockchain: ethereum, limit: 50}) {
//     TokenNft {
//       address
//       tokenId
//       metaData {
//         attributes {
//           trait_type
//           value
//         }
//       }
//       tokenBalances {
//         owner {
//           addresses
//         }
//       }
//     }
//     pageInfo {
//       nextCursor
//       prevCursor
//     }
//   }
// }
// """
// that is corresponding to the following prompt """I want a all nft holders of a bored ape nfts that have sunglasses and 
// hat"""

// return the data in form of the above json object

// where "trait_type" is an array of key-value pairs representing the traits and the corresponding values i want in the nft I want to search for

// In the above example, sunglasses and hat are a trait_type 
// , and collection is the collection I want my nft to be part of

// And give me only the json object, no text, nothing at all

// the user message is ${value}, update the current value and return the json object
//     `;