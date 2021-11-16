import type IGame from './interfaces'

const url = `http://localhost:3000/`;

async function request(path: string): Promise<JSON> {
  return await fetch(url.concat(path))
    .then(response => response.json()) as JSON;
}

async function getGames(): Promise<IGame[]> {
  let requestData = await request('api/v1/games');

  // Maybe there's a more readable way to loop through this, but that's fine ATM...
  return Object.entries(requestData).map(value => {
    return value[1];
  });
}

export default getGames;
