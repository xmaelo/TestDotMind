import React, { FunctionComponent } from 'react'; 

type ImgProps = {
  img: object,
  addAsFavorie: any,
  favorie: any
}

export const Img: FunctionComponent<ImgProps> = ({ img, addAsFavorie, favories }) => 
	<span style={{paddingLeft: '2px'}}>
		<img src={img.picture} onClick={()=>addAsFavorie(img.id)} />
		<p className="username">
			{img.username+" "}
			{favories.find(element => element == img.id) && <span className="favorie"><br/>Favorite</span>}
		</p>
	</span> 

//const el =  <Card title="Welcome!" paragraph="To this example" />



/**

function add(x: number, y: number): number {
  return x + y;
}


//

**/