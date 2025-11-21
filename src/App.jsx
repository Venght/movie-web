import {useEffect, useState} from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import { updateSearchMetrics } from './appwrite.js'

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
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useDebounce(() => setDebouncedTerm(searchTerm), 700, [searchTerm]);
  
  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage('');

    try {

      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok) {
        throw new Error('Failed to fetch the movie')
      }
      const data = await response.json();

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'An error occurred while fetching movies.')
      }

      setMovies(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchMetrics(query, data.results[0]);
      }
     
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
      setMovies([]);
      return;
    } finally {
      setLoading(false);
    }
    
  }
  useEffect(() => {
    if (debouncedTerm === '') {
      fetchMovies('')
    } else {
      fetchMovies(debouncedTerm);
    }
  }, [debouncedTerm]);

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
        <h2 className = "mt-[50px]">All movies</h2>

        {loading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
              ))}
          </ul>
        )}
      </section>

    </div> 
    </main>
  )
}

export default App