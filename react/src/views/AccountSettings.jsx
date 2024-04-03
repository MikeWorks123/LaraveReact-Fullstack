import { useState, useRef } from 'react';
// import './AccountSettings.css'; // Import your CSS file for styling

export default function AccountSettings() {
    // State variables for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [address, setAddress] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    // Ref for the file input
    const fileInputRef = useRef(null);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform the update or submit data to the server
        // You can use a state management library or make an API call here

        // Reset the file input value
        fileInputRef.current.value = '';
    };

    return (
        <div className="account-settings-container">
            <h1><center><strong>Account Settings</strong></center></h1>
            <form onSubmit={handleSubmit}>
                <div className="profile-picture-container">
                    <label htmlFor="profilePicture" className="profile-picture-label">Profile Picture:</label>
                    <input
                        type="file"
                        id="profilePicture"
                        accept="image/*"
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                        ref={fileInputRef}
                    />
                    {profilePicture && (
                        <div className="profile-picture-preview">
                            <img
                                src={URL.createObjectURL(profilePicture)}
                                alt="Profile Preview"
                                className="profile-picture-img"
                            />
                        </div>
                    )}
                </div>

                {/* About Me */}
                <div className="form-group">
                    <label htmlFor="aboutMe">About Me:</label><br/>
                    <textarea
                        id="aboutMe"
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                        className="form-control"
                    ></textarea>
                </div>

                {/* Name */}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Occupation */}
                <div className="form-group">
                    <label htmlFor="occupation">Occupation:</label>
                    <input
                        type="text"
                        id="occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Address */}
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Submit Button */}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    );
}
