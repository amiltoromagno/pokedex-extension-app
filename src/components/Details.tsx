import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { getPokemon } from '../services/apiService'

interface Props {
  url: string | null
  setOpen: (value: boolean) => void
}

const Details = (props: Props) => {

  useEffect(() => {
    const data = async () => {
      const result = await getPokemon(props.url)
    }
    data()
    //in construction
  }, [props.url])

  return (
    <div>
      <div className='absolute inset-0 flex items-center justify-center bg-[url("/src/assets/background.png")] bg-cover bg-center bg-no-repeat z-50'>
          <div className='w-full h-full p-4 bg-white bg-opacity-50 text-black flex'>
            <div>
              <button onClick={() => props.setOpen(false)}>
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Details
