import React, { useState } from "react";
import "./acountSetting.css";

function AccountSettings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pfp, setPfp] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Updated user data:", { username, email });
    //replace with backend
  };

  return (
    <div className="form-container">
      <div className="form-heading">
        <h2>Account Settings</h2>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <div className="form-info">
            <div>
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                className="form-input"
                placeholder="guest"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                className="form-input"
                placeholder="user@exemple.dz"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="profile-pic">
            <img
              src="https://placehold.co/150x150"
              alt="Profile Picture"
              height={150}
              width={150}
            />
            <label htmlFor="upload" className="upload-btn">
              choose image
            </label>
            <input type="file" name="upload" id="upload" />
          </div>
        </div>
        <div>
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountSettings;
