import React, { FunctionComponent } from 'react'; 

type SearchProps = {
  keyword: any,
  changeKeyword: any
}

export const Search: FunctionComponent<SearchProps> = ({ keyword, changeKeyword }) => 
<div className="search">
	<input placeholder="Entrez l'username" className="input-search" value={keyword} type="search" name="name" onChange={(e)=>changeKeyword(e.target.value)}/>
	<button onClick={()=>changeKeyword("")} className="button-reinit">
	  	Réinitialiser
	</button>
</div> 

//const el =  <Card title="Welcome!" paragraph="To this example" />



/**

function add(x: number, y: number): number {
  return x + y;
}


//

**/