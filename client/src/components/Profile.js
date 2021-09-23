import { useState, useEffect } from 'react';

function Profile({ user }){
    const [providers, setProviders] = useState([])
    const [medications, setMedications] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/providers')
        .then(response => response.json())
        .then(data => setProviders(data))
    }, [])
    const providerMap = providers.map((provider) => {
        return (
            <div key={provider.id} style={{backgroundColor: "orange"}}>
                {provider.provider_name}
                {provider.phone_number}
                {provider.address}
            </div>
        )
    })

    useEffect(() => {
        fetch('/medications')
        .then(response => response.json())
        .then(data => setMedications(data))
    }, [])
    const medicationMap = medications.map((medication) => {
        return (
            <div key={medication.id} style={{backgroundColor: "yellow"}}>
                {medication.provider_name}
                {medication.dosage}
            </div>
        )
    })

    useEffect(() => {
        fetch('/categories')
        .then(response => response.json())
        .then(data => setCategories(data))
    }, [])
    const categoryMap = categories.map((category) => {
        return (
            <div key={category.id} style={{backgroundColor: "green"}}>
                {category.category_name}
            </div>
        )
    })

    return(
        <div>
            <div className="demographic-info" style={{backgroundColor: "red"}}>
                Name: {user.name} 
                Age: {user.age}
                Summary: {user.summary}
                Avatar: <img alt="user profile pictre" src={user.avatar} style={{marginTop:"0px", maxHeight: '150px', maxWidth: '150px', padding: "5px"}}/>
                <button>Edit</button>
            </div>
            My Providers: {providerMap}
            My Medications: {medicationMap}
            My Categories: {categoryMap}
        </div>
    )

}

export default Profile;