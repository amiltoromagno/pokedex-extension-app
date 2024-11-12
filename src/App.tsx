import { FaGithub } from 'react-icons/fa6'
import './App.css'
import Home from './components/Home'

function App () {
  return (
    <div className='h-full w-full bg-[url("/src/assets/background.png")] bg-cover bg-center bg-no-repeat relative'>
      <a
        href='https://github.com/amiltoromagno/pokedex-extension-app'
        target='_blank'
        rel='noopener noreferrer'
        className='absolute bottom-4 right-4 text-black text-2xl'
      >
        <FaGithub />
      </a>
      <div className='h-full w-ful flex justify-center items-center'>
        <Home />
      </div>
    </div>
  )
}

export default App
