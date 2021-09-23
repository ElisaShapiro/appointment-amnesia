import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Profile({ user }){
    const history = useHistory()

    const [isEdit, setIsEdit] = useState(false)
    const [providers, setProviders] = useState([])
    // const [showProviderForm, setShowProviderForm] = useState(false)
    const [medications, setMedications] = useState([])
    // const [showMedicationForm, setShowMedicationForm] = useState(false)
    const [categories, setCategories] = useState([])
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const [categoryFormData, setCategoryFormData] = useState({
        category_name: ""
    })

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
    //GET categories
    useEffect(() => {
        fetch('/categories')
        .then(response => response.json())
        .then(data => setCategories(data))
    }, [])
    //POST 
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
                history.go('/profile')
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
            {/* <div className="demographic-info" style={{backgroundColor: "red"}}>
                Name: {user.name} 
                Age: {user.age}
                Summary: {user.summary}
                Avatar: <img alt="user profile pictre" src={user.avatar} style={{marginTop:"0px", maxHeight: '150px', maxWidth: '150px', padding: "5px"}}/>
                <button>Edit</button>
            </div> */}
            My Providers: {providerMap}
            My Medications: {medicationMap}
            <div style={{backgroundColor: "green"}}>
                My Categories: {categories.map((category) => {
                    return (
                        <div key={category.id}>
                            {category.category_name}
                            <button id={category.id} value={category.category_name} onClick={setEditCategory}>Edit Category</button>
                        </div>
                        )
                    })}
                <button onClick={() => setShowCategoryForm(!showCategoryForm)}>Add Category</button>
                {showCategoryForm ?
                <form onSubmit={handleCategorySubmit}>
                    <label htmlFor="category">Add Category</label>
                    <input name="category_name" id="category" type="text" value={categoryFormData.category_name} onChange={manageCategoryFormData}/>
                    <button >Add Category form</button>
                </form>
                :
                null}
            </div>
        </div>
    )

}

export default Profile;