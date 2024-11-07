import { useEffect, useState } from 'react'
import { getPokemon } from '../services/apiService'
import Select from 'react-select'
import Details from './Details'

const Search = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [url, setUrl] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    const data = async () => {
      const result = await getPokemon(
        'https://pokeapi.co/api/v2/pokemon?limit=1500'
      )
      const formattedOptions = result.results.map((pokemon: any) => ({
        label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        value: pokemon.name
      }))
      setOptions(formattedOptions)
    }
    data()
  }, [])

  const handleChange = (selectedOption: any) => {
    setSelectedPokemon(selectedOption)
    setUrl(`https://pokeapi.co/api/v2/pokemon/${selectedOption.value}`)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedPokemon(null)
  }
    
  const handleInputChange = (newValue: any) => setInputValue(newValue)

  const DropdownIndicator = () => null

  const IndicatorSeparator = () => null

  const filterOptions = (option: any, inputValue: any) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())

  const filteredOptions = options
    .filter((pokemon: any) =>
      pokemon.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    .sort((a: any, b: any) => {
      const isAMatch = a.label
        .toLowerCase()
        .startsWith(inputValue.toLowerCase())
      const isBMatch = b.label
        .toLowerCase()
        .startsWith(inputValue.toLowerCase())
      if (isAMatch && !isBMatch) return -1
      if (!isAMatch && isBMatch) return 1
      return 0
    })
    .slice(0, 5)

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '100%',
      minWidth: '300px',
      cursor: 'text'
    }),
    menu: (provided: any) => ({
      ...provided,
      color: 'black'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'black'
    }),
    input: (provided: any) => ({
      ...provided,
      cursor: 'text',
    })
  }

  return (
    <div className='my-10'>
      <Select
        options={filteredOptions}
        value={selectedPokemon}
        onChange={handleChange}
        placeholder='Type to search for a Pokémon'
        styles={customStyles}
        filterOption={filterOptions}
        onInputChange={handleInputChange}
        menuIsOpen={inputValue.length > 0}
        components={{ DropdownIndicator, IndicatorSeparator }}
        isClearable
      />
      {isOpen && <Details setOpen={handleClose} url={url}/>}
    </div>
  )
}

export default Search
