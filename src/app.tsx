import { useReducer } from "react";
import useSWR, { preload, useSWRConfig } from "swr";
// import { useLoaderData } from "react-router-dom";

import { request } from "./request";

const CACHE_KEY = "https://pokeapi.co/api/v2/pokemon?limit=10";

async function fetchAndCache(key: string) {
  const result = await preload(key, request);
  return result;
}

export const pokemonsLoader = async () => {
  const data = await fetchAndCache(CACHE_KEY);
  return data;
};

export const usePokemons = () => {
  const results = useSWR(CACHE_KEY, request);

  return results;
};

export const App = () => {
  const data = usePokemons();
  /**
   * it is also OK to use:
   * const data = useLoaderData()
   * deeper in the tree we can use the SWR hooks, it is a matter of choice
   * I would use SWR for consitency
   */
  const { cache } = useSWRConfig();
  console.log(cache);
  const [isOpen, toggle] = useReducer((state) => !state, false);

  return (
    <>
      hello world
      <div>{JSON.stringify(data)}</div>
      <button onClick={toggle}>Open</button>
      {isOpen && <PokemonList />}
    </>
  );
};

const PokemonList = () => {
  const data = usePokemons();

  return <div>{JSON.stringify(data)}</div>;
};
