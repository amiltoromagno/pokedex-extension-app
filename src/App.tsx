import './App.css'
import Home from './components/Home'

function App () {
  return (
    <div className='h-full w-full bg-[url("/src/assets/background.png")] bg-cover bg-center bg-fixed bg-no-repeat'>
      <div className='h-full w-full bg-white bg-opacity-50 flex justify-center items-center'>
        <Home />
      </div>
    </div>
  )
}

export default App
