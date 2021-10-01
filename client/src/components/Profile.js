import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Container, Divider, Drawer, Grid, TextField, Toolbar, Typography } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import PersonAddAlt1SharpIcon from '@mui/icons-material/PersonAddAlt1Sharp';


function Profile({ user, setHasUpdate, hasUpdate }){
    const history = useHistory()
    const [isEdit, setIsEdit] = useState(false)

    const [showDemographicForm, setShowDemographicForm] = useState(false)
    const [demographicFormData, setDemographicFormData] = useState({
        email: user.email,
        name: user.name,
        age: user.age,
        summary: user.summary,
        avatar: user.avatar 
    })

    const [providers, setProviders] = useState(user.user_providers)
    const [showProviderForm, setShowProviderForm] = useState(false)
    const [providerFormData, setProviderFormData] = useState({ 
        provider_name: "",
        phone_number: "",
        address: "" 
    })

    const [categories, setCategories] = useState(user.user_categories)
    const [showCategoryForm, setShowCategoryForm] = useState(false)
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
            setShowCategoryForm(!showCategoryForm)
            history.go('/profile')
        })
    }

    //PROVIDERS CRU
    function manageProviderFormData(e){
        let key = e.target.name
        let value = e.target.value
        if (isEdit) {
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
        if (isEdit) {
            fetch(`/providers/${providerFormData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(providerFormData)
            })
            .then(response=>response.json())
            .then(data => {
                setIsEdit(false)
                setShowProviderForm(!showProviderForm)
                history.go('/profile')
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
                // setProviders([...providers, data])
                setShowProviderForm(!showProviderForm)
                setHasUpdate(!hasUpdate)
            })
        }
    }
    function setEditProvider(e){
        setShowProviderForm(!showProviderForm)
        let currentProvider = providers.filter(provider => provider.id == e.target.id)[0]
        setProviderFormData({
            id: e.target.id, 
            provider_name: currentProvider.provider_name,
            phone_number: currentProvider.phone_number,
            address: currentProvider.address
        })
        setIsEdit(true)
    }

    //CATEGORIES CRU
    function manageCategoryFormData(e){
        let key = e.target.name
        let value = e.target.value
        if (isEdit) {
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
        if (isEdit) {
            fetch(`/categories/${categoryFormData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoryFormData)
            }).then(response=>response.json())
            .then(data=>{
                setIsEdit(false)
                setShowCategoryForm(!showCategoryForm)
                history.go('/')
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
                // setCategories([...categories, data])
                setShowCategoryForm(!showCategoryForm)
                setHasUpdate(!hasUpdate)
            })
        }
    }
    function setEditCategory(e){
        setShowCategoryForm(!showCategoryForm)
        setCategoryFormData({id: e.target.id, category_name: e.target.value})
        setIsEdit(true)
    }

    return(
        <Box sx={{display: 'flex'}}>
            <Drawer
                variant="permanent"
                sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar /> 
                <Box sx={{ overflow: 'auto' }}> <br />
                <Typography><AddBoxSharpIcon />Provider Form</Typography>
                <form onSubmit={handleProviderSubmit}>
                    <TextField
                        id="provider_name"
                        label="Provider Name"
                        name="provider_name"
                        value={providerFormData.provider_name}
                        onChange={manageProviderFormData}
                        />
                    <TextField
                        id="phone_number"
                        label="Phone Number"
                        name="phone_number"
                        value={providerFormData.phone_number}
                        onChange={manageProviderFormData}
                        />
                    <TextField
                        multiline
                        rows={3}
                        id="address"
                        label="Address"
                        name="address"
                        value={providerFormData.address}
                        onChange={manageProviderFormData}
                        />
                     <Button type="submit"><AddSharpIcon />Provider</Button>
                </form>
                    <Divider />
                    <Typography><AddBoxSharpIcon />Category Form</Typography>
                    <form onSubmit={handleCategorySubmit}>
                    <TextField
                        id="category"
                        label="category"
                        name="category_name"
                        value={categoryFormData.category_name}
                        onChange={manageCategoryFormData}
                        />
                        <Button type="submit"><AddSharpIcon />Category</Button>
                </form>
                </Box>
            </Drawer>
            <Container>
            <Container>
                <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={user.avatar}
                            alt="user profile picture"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {user.name} 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Age: {user.age}<br />
                            Bio: {user.summary}
                        </Typography>
                        </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={()=>setShowDemographicForm(!showDemographicForm)}>
                            <EditSharpIcon/> Demographic Info
                        </Button>
                    </CardActions>
                    </Card>
                <div>
                    {showDemographicForm ?
                    <form onSubmit={handleDemographicSubmit}>
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            value={demographicFormData.email}
                            onChange={manageDemographicFormData}
                        />
                        <TextField
                            id="name"
                            label="Name"
                            name="name"
                            value={demographicFormData.name}
                            onChange={manageDemographicFormData}
                        />
                        <TextField
                            id="age"
                            label="Age"
                            name="age"
                            value={demographicFormData.age}
                            onChange={manageDemographicFormData}
                        />
                        <TextField
                            multiline
                            rows={5}
                            id="summary"
                            label="Bio/Summary"
                            name="summary"
                            value={demographicFormData.summary}
                            onChange={manageDemographicFormData}
                        />
                        <TextField
                            id="avatar"
                            label="Avatar URL"
                            name="avatar"
                            value={demographicFormData.avatar}
                            onChange={manageDemographicFormData}
                        />
                        <Button type="submit"><PersonAddAlt1SharpIcon />Demographics</Button>
                    </form>
                    : null}
                </div>
            </Container>
            <Container>
                <CardContent>
                    <Typography variant="h2" color="text.secondary">
                        My Providers: 
                    <Grid container 
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                    {providers.map((provider) => {
                    return (
                        <Card key={provider.id}>
                        <Typography variant="h5" component="div">
                            {provider.provider_name}
                        </Typography>
                        <Typography>
                            {provider.phone_number}
                            <br />{provider.address}
                        </Typography>
                        <CardActions>
                            <Button id={provider.id} onClick={setEditProvider}><EditSharpIcon/> Provider</Button>
                        </CardActions>
                        </Card>
                     )
                    })}
                    </Grid>
                    </Typography>
                {/* <Button onClick={() => setShowProviderForm(!showProviderForm)}><AddBoxSharpIcon />Provider Form</Button> */}
                </CardContent>
                {/* <div> 
                {showProviderForm ?
                <form onSubmit={handleProviderSubmit}>
                    <TextField
                        id="provider_name"
                        label="Provider Name"
                        name="provider_name"
                        value={providerFormData.provider_name}
                        onChange={manageProviderFormData}
                        />
                    <TextField
                        id="phone_number"
                        label="Phone Number"
                        name="phone_number"
                        value={providerFormData.phone_number}
                        onChange={manageProviderFormData}
                        />
                    <TextField
                        multiline
                        rows={3}
                        id="address"
                        label="Address"
                        name="address"
                        value={providerFormData.address}
                        onChange={manageProviderFormData}
                        />
                     <Button type="submit"><AddSharpIcon />Provider</Button>
                </form>
                :
                null}
            </div> */}
            </Container>
            <Container>
                <CardContent>
                <Typography variant="h2" color="text.secondary">
                My Categories: 
                <Grid container 
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                {categories.map((category) => {
                    return (
                        <Card key={category.id}>
                        <Typography variant="h5" component="div">
                            {category.category_name}
                        </Typography>
                        <CardActions>
                            <Button id={category.id} value={category.category_name} onClick={setEditCategory}><EditSharpIcon />Category</Button>
                        </CardActions>
                        </Card>
                    )
                })}
                </Grid>
                    </Typography>
                {/* <Button onClick={() => setShowCategoryForm(!showCategoryForm)}><AddBoxSharpIcon />Category Form</Button>     */}
                </CardContent>
                {/* <div>
                {showCategoryForm ?
                <form onSubmit={handleCategorySubmit}>
                    <TextField
                        id="category"
                        label="category"
                        name="category_name"
                        value={categoryFormData.category_name}
                        onChange={manageCategoryFormData}
                        />
                        <Button type="submit"><AddSharpIcon />Category</Button>
                </form>
                : null}
            </div> */}
            </Container>
            </Container>
        </Box>
    )

}

export default Profile;