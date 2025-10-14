import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  const [count, setCount] = useState(0);
  const [hasLikes, setLikes] = useState(false)  

  useEffect(() => {
    console.log(`The movie ${title} has ${hasLikes ? "likes" : "no likes"}`);
  }, [hasLikes]);


  return (
    <div className='card' onClick={() => setCount(count + 1)}>
      <h2>{title} <br/> {count || null}</h2>

    <button onClick={() => setLikes(!hasLikes)}>
      {hasLikes ? "❤️" : "🤍"}
    </button>
    </div>
  )
}
const App = () => {

  return(
    <div className = "card-container">
      
      <Card title = "Spider man: Into the Spider Verse"/> 
      <Card title = "Shawshank Redemption"/>
      <Card title = "Kpop Demon Hunters"/>
      <Card title ="Spider man: Across the Spider Verse"/>
    </div>

  )
}

export default App
