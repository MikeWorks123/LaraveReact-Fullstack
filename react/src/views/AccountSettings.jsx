import { useState, useRef } from 'react';

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
        <div>
            <h1><center><strong>Account Settings</strong></center></h1>
            <form onSubmit={handleSubmit}>
            <div>
                <br/>
                    <label htmlFor="profilePicture">Profile Picture:</label>
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
                                className="rounded-circle"
                            />
                        </div>
                    )}
                </div>

                {/* About Me */}
                <div>
                    <label htmlFor="aboutMe">About Me:</label><br/>
                    <textarea
                        id="aboutMe"
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                    ></textarea>
                </div><br/><br/>

                {/* Name */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Occupation */}
                <div>
                    <label htmlFor="occupation">Occupation:</label>
                    <input
                        type="text"
                        id="occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    />
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
}
