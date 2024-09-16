import PokemonCard from "../components/PokemonCard";
import { PokemonResult, PokemonResultSingle } from './Types';

const pokemonsGallery = async (): Promise<PokemonResult> =>    {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
    const result = await response.json();

    return result;
}



export default async function PokemonsSection() {

    const pokemons = await pokemonsGallery();
  return (
    <>
      { pokemons.results.map((poke, i) => <PokemonCard key={i+1} url={poke.url} /> ) }
    </>
  );
}