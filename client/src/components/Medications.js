import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Medications() {
    const [medications, setMedications] = useState([])
    const [showMedicationForm, setShowMedicationForm] = useState(false)
    const [genericMedication, setGenericMedication] = useState(false)
    const [medicationName, setMedicationName] = useState("")
    const [medicationsFromAPI, setMedicationsFromAPI] = useState([])
    const [oneMedication, setOneMedication] = useState([])
    const [medicationProviders, setMedicationProviders] = useState([])

    useEffect(() => {
        fetch('/medications')
        .then(response => response.json())
        .then(data => setMedications(data))
    }, [])

    useEffect(() => {
        fetch('/providers')
        .then(response => response.json())
        .then(dataProviders => setMedicationProviders(dataProviders))
    }, [])

    function handleOneMedicationChange(e){
        setOneMedication(e.target.value)
    }

    function searchMedicationsOnAPI(e){
        e.preventDefault()
        if (genericMedication) {
            fetch(`https://api.fda.gov/drug/drugsfda.json?search=openfda.generic_name:${medicationName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(response => response.json())
            .then(data => {
                let savedGenericInfo = data.results[0].products.map((product) => {
                    return product.active_ingredients[0]
                })
                setMedicationsFromAPI(savedGenericInfo)
            })
        } else {
            fetch(`https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:${medicationName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(response => response.json())
            .then(data => {
                debugger
                let savedBrandInfo = data.results[0].products.map((product) => {
                    return product.active_ingredients[0]
                })
                setMedicationsFromAPI(savedBrandInfo)
            })
        }
    }

    return(
        <div>
            <div style={{backgroundColor: "yellow"}}> 
                My Medications: {medications.map((medication) => {
                    return (
                        <div key={medication.id}>
                            Medicine: {medication.medication_name}
                            Dosage: {medication.dosage}
                            Prescribed by: {medicationProviders.provider_name}
                        </div>
                    )
                })}
                <button onClick={() => setShowMedicationForm(!showMedicationForm)}>Add Medication</button>
                {showMedicationForm ?
                <form 
                // onSubmit={handleMedicationSubmit}
                >
                    <label htmlFor="switch-api-search">Generic? (check if generic medication, otherwise leave unchecked for brand)</label>
                    <input type="checkbox" id="switch-api-search" checked={genericMedication} onChange={() => setGenericMedication(!genericMedication)} />
                    <label htmlFor="medicationName">Search by Medication Name:</label>
                    <input name="medicationName" id="medication" type="text" value={medicationName} onChange={(e) => setMedicationName(e.target.value)} />
                    <button onClick={searchMedicationsOnAPI}>Search Medications</button>
                    {medicationsFromAPI.length > 0 ?
                    medicationsFromAPI.map((medFromAPI) => {
                        return (
                            <div>
                                {/* <input type="radio" onChange={handleOneMedicationChange}>NAME: {medFromAPI.name} STRENGTH: {medFromAPI.strength}</input> */}
                                NAME: {medFromAPI.name} STRENGTH: {medFromAPI.strength}
                            </div>
                        )
                    }) 
                    : null }
                    <label htmlFor="dosage">Directions:</label>
                    <input name="dosage" id="dosage" type="text" 
                    // value={medication_name} onChange={manageMedication}
                    />
                    <label htmlFor="providers">Select Prescribing Provider:</label>
                    <select type="dropdown" id="profile-dropdown-provider" 
                    // onChange={handleSetOther}
                    >
                    {medicationProviders.length > 1 && medicationProviders.map((provider) => {
                    return <option key={medicationProviders.provider_name} value={medicationProviders.provider_name}>{provider.provider_name}</option>
                    })} 
                </select>
                    <button>Add Medication Form</button>
                </form>
                :
                null}
            </div>
        </div>
    )
}

export default Medications;