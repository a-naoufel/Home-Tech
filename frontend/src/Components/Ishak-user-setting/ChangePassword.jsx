import React, { useState } from "react";
import "./acountSetting.css"; function ChangePassword() { const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage((m) => "password and password confirmation aren't matching");
    } else {
      console.log("Updated user data:", { newPassword });
      //replace with backend
    }
  };

  return (
    <div className="form-container">
      <div className="form-heading">
        <h2>change password</h2>
        <hr />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <div className="form-info">
            <div className="input-group">
              <label htmlFor="CurrentPassword" className="form-label">
                Current Password:
              </label>
              <input
                className="form-input"
                placeholder="Password"
                type="password"
                id="currentpassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="newpassword" className="form-label">
                New Password:
              </label>
              <input
                className="form-input"
                placeholder="new password"
                type="password"
                id="newpassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div>
                {newPassword !== confirmPassword && (
                  <div className="error-msg">{message}</div>
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="confirmpassword" className="form-label">
                Confirm New Password:
              </label>
              <input
                className="form-input"
                placeholder="confirm password"
                type="password"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
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

export default ChangePassword;
