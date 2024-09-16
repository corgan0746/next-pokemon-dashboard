// 'use client'
import { Ability, PokemonResult, TopLevel } from "@/app/pokemons/Types";
import { notFound, useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

interface Prop {
  params: { name: string};
}

export async function generateStaticParams() {

    const res = await pokemonsGallery();

    let pokemonsList:string[] = res.results.map((v) => v.name );

    return pokemonsList;

}

export async function generateMetadata({params}:Prop): Promise<Metadata> {

  const name:string = params.name;

  console.log("generating metadata")

  try{

    let meta:Metadata;

    const res = await fetchSinglePokemon(name);

    let pokemonName = res.name;
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    meta = {title: pokemonName, description: res.types[0].type.name}

    return meta;

  }catch(err){
    return {
      title: 'Pokemon',
      description: 'Pokemon description'
    }
  }


}

const pokemonsGallery = async (): Promise<PokemonResult> =>    {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
    const result = await response.json();

    return result;
}

const fetchSinglePokemon = async (name:string):Promise<TopLevel> => {

  try{

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {cache: 'force-cache'});
    const pokemon = await response.json();
    return pokemon;
  }catch(err){
    notFound();
  }
}


type Props = {
  params:{
    name:string;
  }
}

export default async function NamePage(props:Props) {

    // const param = useParams();

    
    const name:string = props.params.name;

    console.log("id is: ", name)

    const pokemon = await fetchSinglePokemon(name);
    let abilities:string = ''; 
    pokemon.abilities.forEach((ele:Ability) => abilities+=`${ele.ability.name.toUpperCase()} - `);

  return (
    <>
        <div className="max-w-sm mx-auto mt-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
            <div className="md:flex-shrink-0">
            <Image height={150} width={150} alt={pokemon.name} className=" object-cover" src={pokemon.sprites.front_default} />
            </div>
            <div className="p-8">
            <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">{pokemon.name}</div>
            <div className="block mt-1 text-sm leading-tight font-medium text-black">Weight: {pokemon.weight} Kg</div>
            <div className="mt-2 text-gray-500">
              <p className="text-amber-600">Abilities</p>
              {abilities}
              </div>
            <div className="mt-4">
                <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none"> {pokemon.types[0].type.name} Type</button>
                {/* <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none ml-2">Share</button> */}
            </div>
            </div>
        </div>
        </div>
    </>
  );
}