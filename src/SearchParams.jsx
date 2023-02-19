import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from './Results';
import useBreedList from './useBreedList';
import fetchSearch from './fetchSearch';
import AdoptedPetContext from './AdoptedPetContext';
const animalsAll = ["bird", "cat", "dog", "rabbit", "reptile"]; 
const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: '',
        animal: '',
        breed: '',
    });
    const [animal, setAnimal] = useState('');
    const [breeds] = useBreedList(animal);
    const [adoptedPet] = useContext(AdoptedPetContext);
    const results = useQuery(['search', requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];
    
    return (
        <div className='search-params'>
            <form onSubmit={ (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
                location: formData.get('location') ?? '',
                animal: formData.get('animal') ?? '',
                breed: formData.get('breed') ?? '',
            };
            setRequestParams(obj);
            }}>
                {
                    adoptedPet ? (
                        <div className='adopted-pet'>
                            <h1>{adoptedPet.name} foi adotado!</h1>
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ) : null
                }
                <label  htmlFor='location'>
                    Local
                    <input
                    name='location'
                    id='location'  
                    placeholder='Local' />
                </label>
                <label htmlFor='animal'>
                    Animal
                    <select onChange={
                        (e) => {
                            setAnimal(e.target.value)
                            }} id='animal' value={animal} >
                        <option/>
                        {animalsAll.map((animals) => (
                            <option key={animals} value={animals}>{animals}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor='breed'>
                    Raça
                    <select 
                    id='breed' 
                    name='breed' 
                    disabled={!breeds.length}>
                        <option/>
                        {breeds.map((raca)=> (
                            <option key={raca} value={raca}>{raca}</option>
                        ))}
                    </select>
                </label>
                    
                <button>Enviar</button>
            </form>
            <Results pets={pets} />
        </div>  
    );
};
export default SearchParams;