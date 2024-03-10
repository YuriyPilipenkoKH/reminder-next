function UserProfile({params}:any) {
    return (
      <>
       <h1>User Profile</h1>
       <p>Profile page {params.id}</p>
      </>
    )
  }
  
  export default UserProfile
  