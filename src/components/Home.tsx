import Search from './Search'

const Home = () => {
  return (
    <div className='w-4/5 flex justify-center items-center flex-col'>
      <div className='w-100% h-20 flex'>
        <img src='pokeball-logo.png' alt='logo' />
        <div className='text-black text-5xl flex items-center ml-2'>
          Pokédex
        </div>
      </div>
      <div>
        <Search />
      </div>
    </div>
  )
}

export default Home
