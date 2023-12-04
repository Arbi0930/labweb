import React, { useEffect, useState } from 'react';

function CountryComponent() {
    const [countries, setCountries] = useState([]);
    const [newCountryName, setNewCountryName] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/countries') // Assuming your backend API route is '/api/countries'
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const addCountry = async () => {
        try {
            const response = await fetch('/api/countries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newCountryName })
            });
            const data = await response.json();
            setCountries([...countries, data]);
            setNewCountryName('');
        } catch (error) {
            console.error('Error adding country:', error);
        }
    };

    return (
        <div>
            <h2>Countries</h2>
            <ul>
                {countries.map(country => (
                    <li key={country._id}>{country.name}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newCountryName}
                onChange={e => setNewCountryName(e.target.value)}
            />
            <button onClick={addCountry}>Add Country</button>
        </div>
    );
}

export default CountryComponent;
