import Profile from './Profile'

function ProfileContainer({ user }){
    return(
        <div>
            You're Logged in! Select an option from the navigation bar above!
            <Profile user={user}/>
        </div>
    )
}

export default ProfileContainer;