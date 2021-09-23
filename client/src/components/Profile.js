function Profile({ user }){
    

    return(
        <div>
            <div className="demographic-info" style={{backgroundColor: "red"}}>
                Name: {user.name} 
                Age: {user.age}
                Summary: {user.summary}
                Avatar: <img alt="user profile pictre" src={user.avatar} style={{marginTop:"0px", maxHeight: '150px', maxWidth: '150px', padding: "5px"}}/>
                <button>Edit</button>
            </div>
        </div>
    )

}

export default Profile;