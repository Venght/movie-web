import {useState} from 'react'
import Search from './assets/search.jsx'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return ( 
   <main>
    <div className = "pattern"></div>

    <div className = "wrapper">
      <header>
        <h1>
          <img src = "hero.png" alt = "hero-banner"></img>
          <span className="text-gradient">Find movies</span> here for free
        </h1>
      </header>

      <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
      <h1 className='text-white'>{searchTerm} </h1>
    </div> 
    </main>
  )
}

export default App