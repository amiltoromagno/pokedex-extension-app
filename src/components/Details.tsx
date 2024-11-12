import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { getAdditionalPokemonInfo, getPokemon } from '../services/apiService'
import { Types } from '../constants/types'
import Info from './Info'

interface Props {
  url: string | null
  setOpen: (value: boolean) => void
}

const Details = (props: Props) => {
  const [info, setInfo] = useState<any>(null)
  const [addInfo, setAddInfo] = useState<any>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [weight, setWeight] = useState<number | null>(null)
  const [gen, setGen] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)

  useEffect(() => {
    getPokemon(props.url).then(result => {
      setInfo(result)
      convertHeight(result.height)
      convertWeight(result.weight)
      getAdditionalInfo(result.name)
    })
  }, [props.url])

  const getAdditionalInfo = (name: string) => {
    getAdditionalPokemonInfo(name).then(result => {
      setAddInfo(result)
      getGeneration(result.generation.name)
      
      const englishFlavorText = result.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      )
      if (englishFlavorText) {
        getDescription(englishFlavorText.flavor_text)
        return
      }
      getDescription('No english description available')
    })
  }

  const convertHeight = (height: number) => {
    setHeight(height / 10)
  }

  const convertWeight = (weight: number) => {
    setWeight(weight / 10)
  }

  const getGeneration = (generation: string) => {
    const genNumber = generation.split('-')[1]
    setGen(genNumber.toUpperCase())
  }

  const getDescription = (description: string) => {
    const text = description
    const cleanedText = text.replace(/[\x00-\x1F\x7F-\x9F\u000c]+/g, ' ').trim()
    setDescription(cleanedText)
  }

  return (
    <div>
      <div className='absolute inset-0 flex items-center justify-center bg-[url("/src/assets/background.png")] bg-cover bg-center bg-no-repeat z-50'>
        <div className='w-full h-full p-4 bg-white bg-opacity-50 text-black flex flex-col'>
          <div className='flex justify-start items-center h-[5%]'>
            <button onClick={() => props.setOpen(false)}>
              <FaArrowLeft />
            </button>
          </div>
          <div className='h-[95%]'>
            <div className='h-[10%] text-2xl flex justify-center'>
              <div>
                {info && info.name.charAt(0).toUpperCase() + info.name.slice(1)}
              </div>
              <div className='text-gray-400'>#{addInfo?.id}</div>
            </div>
            <div className='h-25% flex justify-center items-center'>
              <img
                src={info?.sprites?.other?.showdown?.front_default ?? null}
                alt={
                  info && info.name.charAt(0).toUpperCase() + info.name.slice(1)
                }
                className='h-24'
              />
            </div>
            <div className='h-[5%] mt-3 flex items-center justify-center'>
              <div className='w-[60%] flex justify-center bg-white rounded-full'>
                <div className='flex w-[300px]'>
                  {info?.types?.map((item: any) => {
                    const type = Types[item.type.name]
                    return (
                      <div
                        key={item.type?.name}
                        className={`flex-1 flex items-center justify-center ${type?.color}`}
                      >
                        {type?.icon && (
                          <div className='mr-2'>
                            <type.icon />
                          </div>
                        )}
                        <div className='flex items-center'>{type?.name}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className='h-[10%] flex items-center mt-3 bg-white rounded-full'>
              <div className='flex-1 border-r-2'>
                <div className='text-xs'>Height</div>
                <div>{height}m</div>
              </div>
              <div className='flex-1'>
                <div className='text-xs'>Weight</div>
                <div>{weight}kg</div>
              </div>
              <div className='flex-1 border-l-2'>
                <div className='text-xs'>Generation</div>
                <div>Gen {gen}</div>
              </div>
            </div>
            <div className='min-h-[10%] max-h-[80px] p-2 text-sm mt-3 flex items-center justify-center bg-white rounded-full'>
              <div className='w-[90%]'>{description || '-'}</div>
            </div>
            <Info info={info} addInfo={addInfo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
