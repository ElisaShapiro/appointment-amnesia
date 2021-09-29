import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function Medications({ user, universalProviders}) {
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
        if (user && user.user_providers.length > 0) {
            setMedicationProviders(user.user_providers)
            setMedicationFormData({...medicationFormData, provider_name: user.user_providers[0].provider_name})
        }
    }, [user])
    
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
                if (!data.error) {
                    let savedGenericInfo = data.results[0].products.map((product) => {
                        return product.active_ingredients[0]
                    })
                    setMedicationsFromAPI(savedGenericInfo)
                } else {
                    alert('Generic medication not found! Please search again.')
                }
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
                if (!data.error) {
                    let savedBrandInfo = data.results[0].products.map((product) => {
                        return product.active_ingredients[0]
                    })
                    setMedicationsFromAPI(savedBrandInfo)
                } else {
                    alert('Brand name medication not found! Please search again.')
                }
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

    function handleChangeGenericMedication(){
        setGenericMedication(!genericMedication)
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
            <div> 
                My Medications: {medications.map((medication) => {
                    return (
                        <div key={medication.id} style={{backgroundColor: "yellow"}}>
                            <p>Medicine: {medication.medication_name}
                            <br />Dosage: {medication.dosage}
                            <br />Prescribed by: {medication.provider.provider_name}</p>
                            <button value={medication.id} onClick={handleDeleteMedication}>
                                DELETE
                            </button>
                        </div>
                    )
                })}
                <br /><button onClick={() => setShowMedicationForm(!showMedicationForm)}>Show Add Medication Form</button>
                {showMedicationForm ?
                <form onSubmit={handleMedicationSubmit} style={{backgroundColor: "yellow"}}>
                    {/* <label htmlFor="switch-api-search">Generic?</label>
                    <input type="checkbox" id="switch-api-search" checked={genericMedication} 
                        onChange={() => setGenericMedication(!genericMedication)} /> */}
                    <FormGroup>
                        <FormControlLabel control={<Switch />} 
                        label="Generic?" id="medication" 
                        checked={genericMedication}
                        onChange={handleChangeGenericMedication}/>
                    </FormGroup>   
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
                    <br /><label htmlFor="providers">Prescribing Provider:</label>
                    <select type="dropdown" id="medication-dropdown-provider" name="provider_name"
                        value={medicationFormData.provider_name} onChange={manageMedicationFormData}>
                        {medicationProviders.length > 0 && medicationProviders.map((provider) => {
                            return (
                                <option key={medicationProviders.provider_name} value={medicationProviders.provider_name}>
                                    {provider.provider_name}
                                </option>
                            )
                        })} 
                    </select>
                <br /><button>Add Medication Button</button>
                </form>
                : null}
            </div>
        </div>
    )
}

export default Medications;