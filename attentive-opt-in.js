const fetch = require('node-fetch');
const dotenv = require('dotenv').config;

const url = `https://rickandmortyapi.com/api/character`

const getCharacters = async () => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('something went wrong: ', error)
  }
}
async function main(event) {

  let statusCode
  let body = event.phone
  const data = await getCharacters()
  
  statusCode
  let response = {
    statusCode,
    body: JSON.stringify(body)
  }

  return response
}



exports.handler = main