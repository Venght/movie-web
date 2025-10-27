import {useEffect, useState} from 'react'
import Search from './assets/search.jsx'

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  
  const fetchMovies = async () => {
    try {
      const endpoint = `${API_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok) {
        throw new Error('Failed to fetch the movie')
      }
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    }
  }
  useEffect(() => {
    console.log('useEffect ran');
    fetchMovies();
  }, []);

  return ( 
   <main>
    <div className = "pattern"></div>

    <div className = "wrapper">
      <header>
        <h1>
          <img src = "hero.png" alt = "hero-banner"></img>
          <span className="text-gradient">Find movies here for free </span>
        </h1>      
        
        <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />

      </header>

      <section className='all-movies'>
        <h2>All movies</h2>

        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </section>

      <h1 className='text-white'>{searchTerm} </h1>
    </div> 
    </main>
  )
}

export default App