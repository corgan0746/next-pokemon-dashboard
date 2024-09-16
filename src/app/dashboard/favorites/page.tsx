import PokemonsSection from "@/app/pokemons/page";



export default function PokemonsPage() {
  return (
    <>
        <div className="flex gap-6 flex-row flex-wrap animated fadeIn faster justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-300">
            <PokemonsSection />
        </div>
    </>
  );
}