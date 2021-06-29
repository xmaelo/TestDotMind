import React, {useEffect, useState, FunctionComponent } from 'react'; 
import {Search} from './components/Search'
import {Img} from './components/Img'
import {images} from './assets'

export const TestDotMind: FunctionComponent<> = () => {
	const [keyword, changeKeyword] = useState("");
	const [imgs, setImg] = useState([]);
	const [loader, setloader] = useState(true);
	const [favories, setFavories] = useState([]);

	function stopLoader(objImage: object){
		setImg(objImage || images)
		setloader(false);
	}
	function initLoader(objImage: object){
		setTimeout(() => {
		      stopLoader(objImage);
		}, 1000);
	}

	useEffect(()=>{
		(async()=>{
			const f = await initLocalStorage()
			filterImage("", f)
		})()
	}, [])

	async function initLocalStorage(){
		try{
			let string_favorites = await localStorage.getItem('favorites_picture');
			string_favorites = string_favorites && string_favorites.split('_').map(str => parseInt(str)) || []
			setFavories(string_favorites)
			return string_favorites;
		}catch(e){
			console.error('eroor localStorage', e)
			return []
		}
	}
	function addAsFavorie(id){
		let ids = favories.slice();
		if(ids.find(element => element === id)){
			ids.splice(ids.indexOf(id), 1)
		}else{
			ids.push(id);
		}
		setFavories(ids);
		localStorage.setItem('favorites_picture', ids.join('_'));
	}

	function filterImage(value: string, f: Array) {
	  console.log('favories', favories, f)
	  setloader(true)
	  changeKeyword(value)
	  if(f && f.length > 0 || favories.length > 0){

	  	let f_local = f || favories
	  	let newImgs = images.slice().filter((img)=>img.username&&img.username.startsWith(value))

	  	newImgs = newImgs.slice().map(img =>  {
	  		return {...img, favorie: f_local.includes(img.id)}
	  	})

	  	newImgs.sort((a, b) =>  a.favorie === b.favorie ? 0 : a.favorie ? -1 : 1);
	  	initLoader(newImgs);

	  }
	  else{
	  	initLoader(images.slice().filter((img)=>img.username&&img.username.startsWith(value)).sort((a, b) => a.id - b.id));
	  }
	}

	return (
		<div>
			<Search keyword={keyword} changeKeyword={filterImage}/>
			{!loader ?
				<div>
					{imgs.length > 0 ?
						<div className="grille">
							{imgs.map((img, i) => <Img key={i} favories={favories} img={img} addAsFavorie={addAsFavorie}/>)}
						</div>
						:
						<p>
							Aucun element ne correspond a votre recherche !
						</p>
					}
				</div>
				:
				<p>Chargement encours ...</p>
			}
		</div>
	)
}
