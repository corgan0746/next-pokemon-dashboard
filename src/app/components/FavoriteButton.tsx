'use client'
import { IoHeartOutline } from "react-icons/io5";


export default function FavoriteButton() {
    const changeFavorite =  () => {
        console.log("we don't know if it's a favorite")
    }
  return (
    <div>
			<button onClick={changeFavorite} >
				<IoHeartOutline ></IoHeartOutline>
			</button>
		</div>
  );
}