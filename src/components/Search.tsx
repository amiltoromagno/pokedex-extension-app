import { useEffect, useState } from 'react'
import { getPokemon } from '../services/apiService'
import Select from 'react-select'

const Search = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const data = async () => {
      const result = await getPokemon('https://pokeapi.co/api/v2/pokemon?limit=1500')
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
  }

  const handleInputChange = (newValue: any) => {
    setInputValue(newValue);
  }

  const filterOptions = (option: any, inputValue: any) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '100%',
      minWidth: '300px',
    }),
    menu: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
  }

  return (
    <div className='my-10'>
      <Select
        options={options}
        value={selectedPokemon}
        onChange={handleChange}
        placeholder='Type to search for a Pokémon'
        styles={customStyles}
        filterOption={filterOptions}
        onInputChange={handleInputChange}
        menuIsOpen={inputValue.length > 0}
        isClearable
      />
    </div>
  )
}

export default Search
