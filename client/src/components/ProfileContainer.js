import Profile from './Profile'

function ProfileContainer({ user }){
    return(
        <div>
            i'm profile container you're logged in
            <Profile user={user}/>
        </div>
    )
}

export default ProfileContainer;