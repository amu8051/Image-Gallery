import React, {useState, useEffect} from "react";
import ImageView from "./components/ImageView";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  const API_KEY='30205654-82c446a876fb65adfa2f526e7';

// const Term = 'yellow flowers';
  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&pretty=true`)
    .then((response) => { return response.json();})
    .then((data) => {
      setImages(data.hits); setIsLoading(false);
    })
    .catch((error) => {console.log(error, 'To err is human!!')});
  }, [query]);

  if(isLoading){
    return(
      <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1>
    );
  }

  return (
    <div className="container mx-auto">
      <ImageSearch searchTerm={(query) => { setQuery(query)}}/>
      {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">Oops.No Image Found!</h1>}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => {  
        return <ImageView key={img.id} image={img}/>
        })}
      </div>
    </div>
  );
}

export default App;
