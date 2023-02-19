import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import fetchPet from './fetchPet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';
const Details = ( ) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
    const { id } = useParams();
    const results = useQuery(['details', id], fetchPet);
    if(results.isLoading){
        return (
            <div className='loaging-pane'>
                <h1 className='loader'>Carregando...</h1>
            </div>
        )
    }
    const pet = results.data.pets[0];

    return (
        <div className='details'>
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
                <button onClick={() => setShowModal(true)}>Adotar {pet.name}</button>
                <p>{pet.description}</p>
                {
                    showModal ? 
                    (
                        <Modal>
                            <h1>Gostaria de adorar {pet.name} ?</h1>
                            <div className="buttons">
                                <button onClick={
                                    () =>{
                                        setAdoptedPet(pet);
                                        navigate('/');
                                    }
                                }>Sim</button>
                                <button onClick={() => setShowModal(false)}>Não</button>
                            </div>
                        </Modal>
                    ) : null
                }
            </div>
        </div>
    );
};
function DetailsErrorBoundary(props){
    return ( 
        <ErrorBoundary>
            <Details {...props}/>
        </ErrorBoundary>
    );
}

export default DetailsErrorBoundary;