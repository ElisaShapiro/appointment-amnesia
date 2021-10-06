import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Card, CardContent, Container, Divider, Drawer, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Toolbar, Typography } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';

function Medications({ user, universalProviders, medications, setMedications, hasUpdate, setHasUpdate}) {
    const history = useHistory()
    // const [medications, setMedications] = useState([])
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
        if (user && user.user_providers.length > 0) {
            setMedicationProviders(user.user_providers)
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
                    alert("Generic medication not found! Please search again.")
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
                    alert("Brand name medication not found! Please search again.")
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
        if (!radioSelectedOption) {
            alert("Please search for and select a medication before submitting!")
        } else {
            const selectedMedication = medicationsFromAPI.filter((medication) => medication.strength == radioSelectedOption)[0]
            const selectedProvider = medicationProviders.filter((provider) => provider.provider_name == medicationFormData.provider_name)[0]
            if (!selectedMedication || !selectedProvider || !medicationFormData.dosage) {
                alert("Please complete the form before submitting!")
            } else {
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
                    setHasUpdate(!hasUpdate)
                    setGenericMedication()
                    setMedicationName("")
                    setRadioSelectedOption('')
                    setMedicationsFromAPI([])
                    setMedicationFormData({
                        dosage: "",
                        provider_name: ""
                    })
                })
            }
        }
    }

    //DELETE medications
    function handleDeleteMedication(medicationId){
        fetch(`/medications/${medicationId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        setHasUpdate(!hasUpdate)

        // setMedications(medications) //needs refresh
        // history.go("/medications")
    }

    return(
        <Box sx={{display: 'flex'}}>
            <Drawer
                variant='permanent'
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar /> 
                <Box sx={{ overflow: 'auto' }}> <br />
                    <Typography paddingLeft={3}><AddBoxSharpIcon />Medication Form</Typography>
                        <Grid
                            container
                            spacing={0}
                            direction='column'
                            alignItems='center'
                            justify='center'
                            paddingLeft={3}
                        >
                    <form onSubmit={handleMedicationSubmit}>
                        <FormGroup>
                            <FormControlLabel control={<Switch />} 
                                label='Generic?' id='medication' 
                                checked={genericMedication}
                                onChange={handleChangeGenericMedication}
                            />
                        </FormGroup>
                        <TextField
                            id='medication-name'
                            label='Search by Medication Name'
                            name='medication-name'
                            value={medicationName}
                            onChange={(e) => setMedicationName(e.target.value)}
                            sx={{background: '#9dbbae', minWidth: 200}}
                            margin='dense'
                        />   
                        <Button onClick={searchMedicationsOnAPI}><SearchSharpIcon />Medications</Button>         
                        {medicationsFromAPI.length > 0 ?
                        <FormControl component='fieldset'>
                            <FormLabel component='legend'>Medications from Database</FormLabel>
                            <RadioGroup
                                aria-label='medication'
                                name='controlled-radio-buttons-group'
                                value={radioSelectedOption}
                                onChange={(e)=>setRadioSelectedOption(e.target.value)}
                            >
                                {medicationsFromAPI.map((medFromAPI) => {
                                    return <FormControlLabel value={medFromAPI.strength} control={<Radio />} label={`NAME: ${medFromAPI.name} STRENGTH: ${medFromAPI.strength}`} />
                                })} 
                            </RadioGroup>
                            </FormControl>
                        : null } <br />
                        <TextField
                            id='dosage'
                            label='Directions'
                            name='dosage'
                            value={medicationFormData.dosage}
                            onChange={manageMedicationFormData}
                            sx={{background: '#9dbbae', minWidth: 200}}
                            margin='dense'
                        />
                        <FormControl style={{minWidth: 200}} margin='dense'>
                            <InputLabel id='provider-label'>Prescribing Provider</InputLabel>
                            <Select
                                labelId='provider-label'
                                id='provider_name'
                                label='Provider'
                                name='provider_name'
                                value={medicationFormData.provider_name}
                                onChange={manageMedicationFormData}
                                sx={{background: '#9dbbae'}}
                            >
                                {medicationProviders.length > 0 && medicationProviders.map((provider) => {
                                    return (
                                        <MenuItem key={medicationProviders.provider_name} value={provider.provider_name}>
                                            {provider.provider_name}
                                        </MenuItem>
                                    )
                                })} 
                            </Select>
                        </FormControl>
                        <br /><Button type='submit'><AddSharpIcon />Medication to List</Button>
                    </form>
                    </Grid>
                    <Divider />
                </Box>
            </Drawer>
            <Container> 
                <Typography variant='h3' color='#FFF' paddingTop='20px'>               
                    My Medications: 
                </Typography>
                { medications.length > 0 ?
                    <Grid container 
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={4}
                    >
                        {medications.map((medication) => {
                        return (
                            <Grid item xs={5} spacing={2}>
                            <Card key={medication.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant='body1' color='text.primary'>Medicine:</Typography> 
                                        <Typography variant='body2' color='text.secondary'>{medication.medication_name}</Typography>
                                        <Typography variant='body1' color='text.primary'>Dosage:</Typography>
                                        <Typography variant='body2' color='text.secondary'>{medication.dosage}</Typography>
                                        <Typography variant='body1' color='text.primary'>Prescribed by:</Typography> 
                                        <Typography variant='body2' color='text.secondary'>{medication.provider.provider_name}</Typography> 
                                    </CardContent>
                                    </Card>
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Button value={medication.id} onClick={()=>handleDeleteMedication(medication.id)}><DeleteSharpIcon /></Button>
                                    </div>
                                </Card>
                            </Grid>
                        )
                        })}
                    </Grid>
                :
                <Typography variant='h5' color='#FFF'><ArrowBackSharpIcon /> Add Medications</Typography>
                }
            </Container>
        </Box>
    )
}

export default Medications;