import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
                setProviders([...providers, data])
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
                setCategories([...categories, data])
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
        <div>
            <div className="demographic-info" style={{backgroundColor: "red"}}>
                Name: {user.name} 
                Age: {user.age}
                Summary: {user.summary}
                Avatar: <img alt="user profile pictre" src={user.avatar} 
                    style={{marginTop:"0px", maxHeight: '150px', maxWidth: '150px', padding: "5px"}}/>
                <button onClick={()=>setShowDemographicForm(!showDemographicForm)}>
                    Edit Personal Info
                </button>
                {showDemographicForm ?
                <form onSubmit={handleDemographicSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input name="email" id="email" type="text" 
                        value={demographicFormData.email} onChange={manageDemographicFormData}/>
                    <label htmlFor="name">Name:</label>
                    <input name="name" id="name" type="text" 
                        value={demographicFormData.name} onChange={manageDemographicFormData}/>
                    <label htmlFor="age">Age:</label>
                    <input name="age" id="age" type="number" 
                        value={demographicFormData.age} onChange={manageDemographicFormData}/>
                    <label htmlFor="summary">Personal Summary:</label>
                    <textarea name="summary" id="summary" rows="5" cols="50" style={{ width: "400px", height: "100px" }}
                        value={demographicFormData.summary} onChange={manageDemographicFormData}/>
                    <label htmlFor="avatar">Avatar URL:</label>
                    <input name="avatar" id="avatar" type="text" 
                        value={demographicFormData.avatar} onChange={manageDemographicFormData}/>
                    <button>Update Demographics</button>
                </form>
                : null}
            </div>
            <div style={{backgroundColor: "orange"}}> 
                My Providers: {providers.map((provider) => {
                    return (
                        <div key={provider.id}>
                            {provider.provider_name}
                            {provider.phone_number}
                            {provider.address}
                            <button id={provider.id} onClick={setEditProvider}>Edit Provider</button>
                        </div>
                     )
                })}
                <button onClick={() => setShowProviderForm(!showProviderForm)}>Add Provider to List</button>
                {showProviderForm ?
                <form onSubmit={handleProviderSubmit}>
                    <label htmlFor="provider_name">Provider Name:</label>
                    <input name="provider_name" id="provider_name" type="text" 
                        value={providerFormData.provider_name} onChange={manageProviderFormData}/>
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input name="phone_number" id="phone_number" type="text" 
                        value={providerFormData.phone_number} onChange={manageProviderFormData}/>
                    <label htmlFor="address">Address:</label>
                    <textarea name="address" id="address" type="text" rows="5" cols="50" style={{ width: "200px", height: "50px" }}
                        value={providerFormData.address} onChange={manageProviderFormData}/>
                    <button >Add Provider</button>
                </form>
                :
                null}
            </div>
            <div style={{backgroundColor: "green"}}>
                My Categories: {categories.map((category) => {
                    return (
                        <div key={category.id}>
                            {category.category_name}
                            <button id={category.id} value={category.category_name} 
                                onClick={setEditCategory}>Edit Category</button>
                        </div>
                    )
                })}
                <button onClick={() => setShowCategoryForm(!showCategoryForm)}>Add Category to List</button>
                {showCategoryForm ?
                <form onSubmit={handleCategorySubmit}>
                    <label htmlFor="category">Add Category</label>
                    <input name="category_name" id="category" type="text" 
                        value={categoryFormData.category_name} onChange={manageCategoryFormData}/>
                    <button >Add Category</button>
                </form>
                : null}
            </div>
        </div>
    )

}

export default Profile;