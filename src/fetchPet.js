const fetchPet = async({queryKey}) => {
    const id = queryKey[1];
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

    if(!res.ok)
        throw new Error(`Something went wrong at details/${id}`);
    
    return res.json();
}

export default fetchPet;