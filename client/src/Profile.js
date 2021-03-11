import React, { useState, useEffect } from "react";

const Profile = ({ auth }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    auth.getProfile((profile, error) => {
      setProfile(profile);
      setError(error);
    });
  }, []);

  return profile ? (
    <>
      <h1>Profile</h1>
      <p>{profile.nickname}</p>
      <img
        style={{ maxWidth: 50, maxheight: 50 }}
        src={profile.picture}
        alt="profile pic"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  ) : null;
};

export default Profile;
