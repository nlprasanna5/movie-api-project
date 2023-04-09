import React, { useState } from 'react'
import movieStyle from './components/movie.module.css';


const App = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const submitHandler = e => {
    e.preventDefault();
    if (search === '') {
      alert("please enter any movie name")
    } else {
      fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
        response => response.json()
      ).then(value => {
        setData(value.Search);
      })

    }
    setSearch('');


  }
  const download = url => {
    fetch(url).then(response => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        document.body.appendChild(link);
        link.click();
      });
    })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className={movieStyle.container}>

      <div className={movieStyle.heading}>
        <h1>Search Your Favorite Movie</h1>
        <span>(Such as star wars,game of thrones,batman)</span>
        <form onSubmit={submitHandler} className={movieStyle.formContainer}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className={movieStyle.field} /><br /><br />
          <input type="submit" value="Search" className={movieStyle.search} />
        </form>
      </div>
      <div className={movieStyle.row} >
        {data.length >= 1 ? data.map(movie =>
          <div className={movieStyle.movieContainer} key={movie.imdbID}>
            <div className={movieStyle.card} style={{ "width": "18rem" }}>
              <div className={movieStyle.imgContainer}>
                <img src={movie.Poster} className={movieStyle.cardImgTop} alt={movie.Title} />
              </div>

              <div className={movieStyle.cardBody}>
                <h4 className={movieStyle.cardTitle}>{movie.Title}</h4>
                <a className={movieStyle.btn} onClick={() => download(movie.Poster)}>Download Poster</a>
              </div>
            </div>
          </div>
        ) : null}
      </div>

    </div>
  )
}

export default App