'use client'
import { TopLevel } from "@/app/pokemons/Types";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";

const fetchSinglePokemon = async (url:string):Promise<TopLevel> => {
	const response = await fetch(url, {cache: 'force-cache'});
	const pokemon = await response.json();
	return pokemon;
}

export default async function NamePage({params}:any) {

    // const param = useParams();

    console.log("id is: ", params)

    const pokemon = await fetchSinglePokemon(params.id);

  return (
    <>
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
            <div className="md:flex-shrink-0">
            <Image height={100} width={100} alt={pokemon.name} className=" object-cover" src={pokemon.sprites.front_default} />
            </div>
            <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case Study</div>
            <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
            <p className="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
            <div className="mt-4">
                <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none">Read More</button>
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none ml-2">Share</button>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}