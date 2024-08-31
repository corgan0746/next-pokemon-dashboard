import Image from "next/image";
import { TopLevel } from "../pokemons/Types";
type pokemonUrl = {url:string}

const fetchSinglePokemon = async (url:string):Promise<TopLevel> => {
	const response = await fetch(url, {cache: 'force-cache'});
	const pokemon = await response.json();
	return pokemon;
}

export default async function PokemonCard(prop:pokemonUrl) {

	const pokemon = await fetchSinglePokemon(prop.url);

  return (

	
<div className="block rounded-lg bg-white w-24 mt-32">
	<div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">
		<Image width={100} height={100} priority={false} className="rounded-lg  " src={pokemon.sprites.front_default}
                                    alt={pokemon.name} />
		<a href="#!">
			<div
				className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
			</div>
		</a>
	</div>

	<div className="p-2">
		<div className="flex justify-between">
			<h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
				{pokemon.name}
			</h5>
			
		</div>
		<p className="mb-1 text-sm text-neutral-600 dark:text-neutral-200">
			Added X weeks ago
		</p>

		<p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
			Date Range - Owner
		</p>
		<h5 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50">
			Price per night
		</h5>
	</div>
</div>

  )
};