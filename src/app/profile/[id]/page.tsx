const UserProfile = ({params}:any) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p className="text-4xl">Profile Details <span className="p-2 rounded bg-blue-800 text-stone-800 ml-2 ">{params.id}</span></p>
      </div>
    );
  };
  
  export default UserProfile;
  