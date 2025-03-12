import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next/client';// If you're using axios for API calls

const UserProfiles = () => {
  const [isEditing, setIsEditing] = useState(false); // Toggle editing state
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
    researchInterests: [],
    projectContributions: ["AI Research on Autonomous Cars", "Renewable Energy in Urban Areas", "Renewable Energy in Urban Areas"],
    connections: ["Dr Jane Doe", "Dr Farrell Smith"],
    academicHistory: [],
  });
  const [currentUserID, setCurrUserID] = useState(false);

  useEffect(() => {
    // Get the current user ID from the cookie
    setCurrUserID(getCookie("user_id"));
  }, []);
  useEffect(() => {
    fetchUserProfile();
  }, [currentUserID]);

  const fetchUserProfile = async () => {
    if (currentUserID) {
    try {
      
      const response = await fetch(`/api/user/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUserID,
        }),
      });

      // Assuming your API response has the data structure you want
      const {name, email, bio, researchInterests, projectTitles} = await response.json();
      let curr_research_interests = [...userData.researchInterests, researchInterests];
      let curr_proj_titles = [...userData.projectContributions, projectTitles];
      let curr_conns = [...userData.connections];
      console.log({name:name,
        email:email,
        bio:bio,
        researchInterests:researchInterests,
        projectContributions: curr_proj_titles,
        connections: curr_conns,
        academicHistory:["PhD in MIT", "MS in Stanford University"]});
      // Update the state with the fetched data
      setUserData({
        name:name,
        email:email,
        bio:bio,
        researchInterests:researchInterests,
        projectContributions: curr_proj_titles,
        connections: curr_conns,
        academicHistory:["PhD in MIT", "MS in Stanford University"]
      });


    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };      
}

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const updateBio = async () => {
    const response = await fetch(`/api/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUserID,
        bio: userData.bio,
        name: userData.name,
        researchInterests:userData.researchInterests,
      }),
    });
  };

  // Toggle editing state
  const toggleEdit = () => {
    if(isEditing){
      updateBio();
    }
    setIsEditing(!isEditing);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-400">User Profile</h2>

      {/* Profile Information */}
      <div className="mt-10 flex items-center bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50 mb-10">
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="input input-bordered bg-neutral-focus text-neutral-content w-full mb-2"
              />
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                className="textarea textarea-bordered bg-neutral-focus text-neutral-content w-full"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-200">{userData.name}</h2>
              <p className="text-gray-400">{userData.bio}</p>
            </>
          )}
          <p className="text-gray-500 mt-2">Email: {userData.email}</p>
        </div>
        <button
          onClick={toggleEdit}
          className="ml-auto btn btn-sm bg-cyan-400 hover:bg-cyan-500 text-white"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Research Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
          <h3 className="text-2xl font-bold text-gray-200 mb-4">Research Interests</h3>
          {isEditing ? (
            <textarea
              name="researchInterests"
              value={userData.researchInterests.join(', ')}
              onChange={(e) => setUserData({
                ...userData,
                researchInterests: e.target.value.split(',').map(item => item.trim()),
              })}
              className="textarea textarea-bordered bg-neutral-focus text-neutral-content w-full"
            />
          ) : (
            <ul className="list-disc list-inside text-gray-400">
              {userData.researchInterests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Other profile sections... */}
        {/* Project Contributions Card */}
        <div className="bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
          <h3 className="text-2xl font-bold text-gray-200 mb-4">Project Contributions</h3>
          <ul className="text-gray-400">
            {userData.projectContributions.map((project, index) => (
              <li key={index}>
                {project}
              </li>
            ))}
          </ul>
        </div>

        {/* Connections Card */}
        <div className="bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
          <h3 className="text-2xl font-bold text-gray-200 mb-4">Connections</h3>
          <ul className="text-gray-400">
            {userData.connections.map((connection, index) => (
              <li key={index}>{connection}
                {/* <a href={connection.link} className="text-cyan-400 hover:underline"></a> */}
              </li>
            ))}
          </ul>
        </div>

        {/* Academic History Card */}
        <div className="bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
          <h3 className="text-2xl font-bold text-gray-200 mb-4">Academic History</h3>
          <ul className="text-gray-400">
            {userData.academicHistory.map((history, index) => (
              <li key={index}>
                {history}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserProfiles;


