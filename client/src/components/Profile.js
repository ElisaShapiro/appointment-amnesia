import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Drawer, FormControl, Grid, TextField, Toolbar, Typography } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import PersonAddAlt1SharpIcon from '@mui/icons-material/PersonAddAlt1Sharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';


function Profile({ user, setHasUpdate, hasUpdate,
    universalCategories, setUniversalCategories, universalProviders, setUniversalProviders}){
    const history = useHistory()
    
    const [showDemographicForm, setShowDemographicForm] = useState(false)
    const [demographicFormData, setDemographicFormData] = useState({
        email: user.email,
        name: user.name,
        age: user.age,
        summary: user.summary,
        avatar: user.avatar 
    })
    
    const [providers, setProviders] = useState(user.user_providers)
    const [isEditProviders, setIsEditProviders] = useState(false)
    const [providerFormData, setProviderFormData] = useState({ 
        provider_name: "",
        phone_number: "",
        address: "" 
    })

    const [categories, setCategories] = useState(user.user_categories)
    const [isEditCategories, setisEditCategories] = useState(false)
    const [categoryFormData, setCategoryFormData] = useState({ category_name: "" })
    
    //DEMOGRAPHICS RU
    function manageDemographicFormData(e){
        let key = e.target.name
        let value = e.target.value
        setDemographicFormData({
            ...demographicFormData,
            [key]: value
        })
    }
    function handleDemographicSubmit(e){
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(demographicFormData)
        }).then(response=>response.json())
        .then(data=>{
            //setUser needed?
            setShowDemographicForm(!showDemographicForm)
            history.go('/profile')
        })
    }

    //PROVIDERS CRU
    function manageProviderFormData(e){
        let key = e.target.name
        let value = e.target.value
        if (isEditProviders) {
            setProviderFormData({
                ...providerFormData,
                [key]: value,
                id: providerFormData.id
            })
        } else {
            setProviderFormData({
                ...providerFormData,
                [key]: value
            })
        }
    }
    async function handleProviderSubmit(e){
        e.preventDefault()
        if (!providerFormData.provider_name || !providerFormData.address || !providerFormData.phone_number){
            alert("Please complete the form before submitting!")
        } 
        else {
            if (isEditProviders) {
                fetch(`/providers/${providerFormData.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(providerFormData)
                })
                .then(response=>response.json())
                .then(data => {
                    // setProviders([...providers, data]) this made a duplicate then upon refresh didnt
                    setIsEditProviders(false)
                    setProviderFormData({ 
                        provider_name: "",
                        phone_number: "",
                        address: "" 
                    })
                    // history.go('/')
                })
            } else {
                await fetch(`/providers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(providerFormData)
                })
                .then(response => response.json())
                .then(data => {
                    setProviderFormData({ 
                        provider_name: "",
                        phone_number: "",
                        address: "" 
                    })
                    setHasUpdate(!hasUpdate)
                })
            }
        }
    }
    function setEditProvider(e){
        let currentProvider = providers.filter(provider => provider.id == e.target.id)[0]
        setProviderFormData({
            id: e.target.id, 
            provider_name: currentProvider.provider_name,
            phone_number: currentProvider.phone_number,
            address: currentProvider.address
        })
        setIsEditProviders(true)
    }

    //CATEGORIES CRU
    function manageCategoryFormData(e){
        let key = e.target.name
        let value = e.target.value
        if (isEditCategories) {
            setCategoryFormData({
                [key]: value,
                id: categoryFormData.id
            })
        } else {
            setCategoryFormData({
                [key]: value
            })
        }
    }
    async function handleCategorySubmit(e){
        e.preventDefault()
        if (!categoryFormData.category_name) {
            alert("Please complete the form before submitting!")
        } else {
            if (isEditCategories) {
                fetch(`/categories/${categoryFormData.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoryFormData)
                }).then(response=>response.json())
                .then(data=>{
                    // setUniversalCategories([data, ...universalCategories]) //needs refresh
                    // setCategories([data, ...categories]) //needs refresh
                    setisEditCategories(false)
                    setCategoryFormData({ category_name: "" })
                    // history.go('/')
                })
            } else {
                await fetch(`/categories`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(categoryFormData)
                })
                .then(response => response.json())
                .then(data => {
                    // setCategories([...categories, data]) this adds wrongly then removes upon refresh
                    setCategoryFormData({ category_name: "" })
                    setHasUpdate(!hasUpdate)
                })
            }
        }   
    }
    function setEditCategory(e){
        setCategoryFormData({id: e.target.id, category_name: e.target.value})
        setisEditCategories(true)
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
                <Grid
                        container
                        spacing={0}
                        direction='column'
                        alignItems='center'
                        justify='center'
                    >
                <Container>  
                    <Typography><AddBoxSharpIcon />Provider Form</Typography>
                    <form onSubmit={handleProviderSubmit}>
                        <FormControl>
                            <TextField
                                id='provider_name'
                                label='Provider Name'
                                name='provider_name'
                                style={{minWidth: 200}}
                                value={providerFormData.provider_name}
                                onChange={manageProviderFormData}
                                sx={{background: '#9dbbae'}}
                                margin='dense'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id='phone_number'
                                label='Phone Number'
                                name='phone_number'
                                style={{minWidth: 200}}
                                value={providerFormData.phone_number}
                                onChange={manageProviderFormData}
                                sx={{background: '#9dbbae'}}
                                margin='dense'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                multiline
                                rows={3}
                                id='address'
                                label='Address'
                                name='address'
                                value={providerFormData.address}
                                onChange={manageProviderFormData}
                                sx={{background: '#9dbbae', minWidth: 200}}
                                margin='dense'
                            />
                            <Button type='submit'>{isEditProviders ? <EditSharpIcon/> : <AddSharpIcon />} Provider</Button>
                        </FormControl>
                    </form>
                    </Container>
                    </Grid>
                    <Divider />
                    <Grid
                        container
                        spacing={0}
                        direction='column'
                        alignItems='center'
                        justify='center'
                    >
                    <Container>
                    <Typography><AddBoxSharpIcon />Category Form</Typography>
                    <form onSubmit={handleCategorySubmit}>
                        <FormControl style={{minWidth: 200}}>
                            <TextField
                                id='category'
                                label='Category'
                                name='category_name'
                                value={categoryFormData.category_name}
                                onChange={manageCategoryFormData}
                                sx={{background: '#9dbbae'}}
                                margin='dense'
                            />
                            <Button type='submit'>{isEditCategories ? <EditSharpIcon/> : <AddSharpIcon />}Category</Button>
                        </FormControl>
                    </form>
                    </Container>
                    </Grid>
                    <Divider />
                </Box>
            </Drawer>
            <Container>
                <Container>
                    <Typography variant='h3' color='text.secondary' paddingTop='20px'>
                        My Info: 
                    </Typography>
                    {showDemographicForm ?
                    <Grid container
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='flex-start'
                       
                    >
                        <Grid item>
                            <Card sx={{ width: 740 }}>
                                <form onSubmit={handleDemographicSubmit}>
                                    <CardContent>
                                        <TextField
                                            id='email'
                                            label='Email'
                                            name='email'
                                            value={demographicFormData.email}
                                            onChange={manageDemographicFormData}
                                            sx={{background: '#9dbbae'}}
                                        />
                                        <TextField
                                            id='name'
                                            label='Name'
                                            name='name'
                                            value={demographicFormData.name}
                                            onChange={manageDemographicFormData}
                                            sx={{background: '#9dbbae'}}
                                        />
                                        <TextField
                                            id='age'
                                            label='Age'
                                            name='age'
                                            value={demographicFormData.age}
                                            onChange={manageDemographicFormData}
                                            sx={{background: '#9dbbae'}}
                                        />
                                        <TextField
                                            id='avatar'
                                            label='Avatar URL'
                                            name='avatar'
                                            value={demographicFormData.avatar}
                                            onChange={manageDemographicFormData}
                                            sx={{background: '#9dbbae'}}
                                        />
                                        <TextField
                                            multiline
                                            rows={5}
                                            style={{width: 522}}
                                            id='summary'
                                            label='Bio/Summary'
                                            name='summary'
                                            value={demographicFormData.summary}
                                            onChange={manageDemographicFormData}
                                            sx={{background: '#9dbbae'}}
                                            margin='dense' 
                                        />
                                        <Button type='submit'><PersonAddAlt1SharpIcon />Demographics</Button>
                                    </CardContent>
                                </form>
                            </Card>
                        </Grid>
                    </Grid>
                    :
                    <Grid container
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='flex-start'
                    >
                        <Grid item>
                            <Card sx={{ width: 740 }}>
                                <CardContent>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Box>
                                            <Typography gutterBottom variant='h5' component='div' >
                                                {user.name} 
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                Age: {user.age}
                                            </Typography>
                                        </Box>
                                        <CardMedia
                                            component='img'
                                            image={user.avatar ? user.avatar : "https://i.imgur.com/9UfDphN.jpg"}
                                            sx={{height: '80px', width: 'auto'}}
                                            alt='user profile picture'
                                        />
                                    </Box>
                                    <Typography variant='body2' color='text.secondary'>
                                        Bio: {user.summary}
                                    </Typography>
                                </CardContent>                   
                                <CardActions>
                                    <Button size='small' color='primary' onClick={()=>setShowDemographicForm(!showDemographicForm)}>
                                        <EditSharpIcon/> Demographic Info
                                    </Button>
                                </CardActions>               
                            </Card>
                        </Grid>
                    </Grid>}
                </Container>
                <Container >
                    <Typography variant='h3' color='text.secondary' paddingTop='32px'>
                        My Providers: 
                    </Typography>
                    {providers.length > 0 ?
                    <Grid container 
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='flex-start'
                        spacing={4}
                    >
                        {providers.map((provider) => {
                            return (
                                <Grid item xs={3}>
                                    <Card key={provider.id} sx={{minHeight: 318, display: 'flex', flexDirection: 'column', padding: '14px'}}>
                                        <Typography variant='h5' component='div'>{provider.provider_name}</Typography>
                                        <Typography variant='body2' color='text.secondary'>{provider.phone_number}</Typography>
                                        <Typography sx={{flexGrow: 1}} variant='body2' color='text.secondary'>{provider.address}</Typography>
                                        <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                                            <Button id={provider.id} onClick={setEditProvider}><EditSharpIcon/> Provider</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    : 
                    <Typography variant='h5' color='text.secondary'><ArrowBackSharpIcon /> Add Providers (will not appear here until associated with Event/Appointment/Medication)</Typography>
                    }
                </Container>
                    <Container>
                    <Typography variant='h3' color='text.secondary' paddingTop='32px'>
                        My Categories: 
                    </Typography>
                    {categories.length >0 ? 
                    <Grid container 
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='flex-start'
                        spacing={4}
                    >
                    {categories.map((category) => {
                        return (
                            <Grid item xs={3}>
                                <Card key={category.id} sx={{minHeight: 130, display: 'flex', flexDirection: 'column', padding: '14px'}}>
                                    <Typography sx={{flexGrow: 1}} variant='body2' color='text.secondary'>{category.category_name}</Typography>
                                    <CardActions  sx={{display: 'flex', justifyContent: 'center'}}>
                                        <Button id={category.id} value={category.category_name} onClick={setEditCategory}><EditSharpIcon />Category</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                    </Grid>
                    :
                    <Typography variant='h5' color='text.secondary'><ArrowBackSharpIcon /> Add Categories (will not appear here until associated with Event/Appointment/Medication)</Typography>
                    }
                </Container>
            </Container>
        </Box>
    )

}

export default Profile;