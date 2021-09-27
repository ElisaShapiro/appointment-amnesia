import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Medications() {
    const history = useHistory()
    const [medications, setMedications] = useState([])
    const [showMedicationForm, setShowMedicationForm] = useState(false)
    const [genericMedication, setGenericMedication] = useState(false)
    const [medicationName, setMedicationName] = useState("")
    const [medicationsFromAPI, setMedicationsFromAPI] = useState([])
    const [medicationProviders, setMedicationProviders] = useState([])
    const [radioSelectedOption, setRadioSelectedOption] = useState("")
    const [medicationFormData, setMedicationFormData] = useState({
        dosage: "",
        provider_name: ""
    })

    useEffect(() => {
        fetch('/medications')
        .then(response => response.json())
        .then(data => setMedications(data))
    }, [])

    useEffect(() => {
        fetch('/providers')
        .then(response => response.json())
        .then(dataProviders => {
            setMedicationFormData({...medicationFormData, provider_name: dataProviders[0].provider_name})
            setMedicationProviders(dataProviders)
        })
    }, [])

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
                let savedBrandInfo = data.results[0].products.map((product) => {
                    return product.active_ingredients[0]
                })
                setMedicationsFromAPI(savedBrandInfo)
            })
        }
    }

    function manageMedicationFormData(e){
        let key = e.target.name
        let value = e.target.value
        setMedicationFormData({
            ...medicationFormData,
            [key]: value
        })
    }

    function handleMedicationSubmit(e){
        e.preventDefault()
        const selectedMedication = medicationsFromAPI.filter((medication) => medication.strength == radioSelectedOption)[0]
        const selectedProvider = medicationProviders.filter((provider) => provider.provider_name == medicationFormData.provider_name)[0]
        let newMedicationFormData = {...medicationFormData, provider_id: selectedProvider.id, medication_name: selectedMedication.name}
        fetch(`/medications`, {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMedicationFormData)
        })
        .then(response => response.json())
        .then(data => {
            setShowMedicationForm(!showMedicationForm)
            history.go('/medications')
        })
    }

    //DELETE medications
    function handleDeleteMedication(e){
        fetch(`/medications/${e.target.value}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        history.go("/medications")
    }

    return(
        <div>
            <div style={{backgroundColor: "yellow"}}> 
                My Medications: {medications.map((medication) => {
                    return (
                        <div key={medication.id}>
                            Medicine: {medication.medication_name}
                            Dosage: {medication.dosage}
                            Prescribed by: {medication.provider.provider_name}
                            <button value={medication.id} onClick={handleDeleteMedication}>
                                DELETE
                            </button>
                        </div>
                    )
                })}
                <button onClick={() => setShowMedicationForm(!showMedicationForm)}>Add Medication</button>
                {showMedicationForm ?
                <form onSubmit={handleMedicationSubmit}>
                    <label htmlFor="switch-api-search">Generic?</label>
                    <input type="checkbox" id="switch-api-search" checked={genericMedication} 
                        onChange={() => setGenericMedication(!genericMedication)} />
                    <label htmlFor="medicationName">Search Database by Medication Name:</label>
                    <input name="medicationName" id="medication" type="text" 
                        value={medicationName} onChange={(e) => setMedicationName(e.target.value)} />
                    <button onClick={searchMedicationsOnAPI}>Search Medications</button>
                    {medicationsFromAPI.length > 0 ?
                    <div>
                        {medicationsFromAPI.map((medFromAPI) => {
                            return (
                                    <label key={medFromAPI}>
                                        <input type="radio" value={medFromAPI.strength} name="radioMedications" 
                                            onChange={(e)=>setRadioSelectedOption(e.target.value)}/>
                                        NAME: {medFromAPI.name} STRENGTH: {medFromAPI.strength} <br />
                                    </label>
                            )
                        })} 
                    </div>
                    : null } <br />
                    <label htmlFor="dosage">Directions:</label>
                    <input name="dosage" id="dosage" type="text" 
                    value={medicationFormData.medication_name} onChange={manageMedicationFormData}/>
                    <label htmlFor="providers">Prescribing Provider:</label>
                    <select type="dropdown" id="medication-dropdown-provider" name="provider_name"
                        value={medicationFormData.provider_name} onChange={manageMedicationFormData}>
                        {medicationProviders.length > 1 && medicationProviders.map((provider) => {
                            return (
                                <option key={medicationProviders.provider_name} value={medicationProviders.provider_name}>
                                    {provider.provider_name}
                                </option>
                            )
                        })} 
                    </select>
                <button>Add Medication Form</button>
                </form>
                : null}
            </div>
        </div>
    )
}

export default Medications;