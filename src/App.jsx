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
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  
  const fetchMovies = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      /*onst endpoint = `${API_URL}/discover/movie?sort_by=popularity.desc` */
      const endpoint = searchTerm
        ? `${API_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`
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

        {loading ? (
          <p className="text-white">Loading...</p> 
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <p key={movie.id}className="text-white">{movie.title}</p>
              ))}
          </ul>
        )}
      </section>

    </div> 
    </main>
  )
}

export default App