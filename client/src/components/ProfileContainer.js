import Profile from './Profile'

function ProfileContainer({ user, setHasUpdate, hasUpdate }){
    return(
        <div>
            {/* You're Logged in! Select an option from the navigation bar above! */}
            <Profile user={user} setHasUpdate={setHasUpdate} hasUpdate={hasUpdate}/>
        </div>
    )
}

export default ProfileContainer;