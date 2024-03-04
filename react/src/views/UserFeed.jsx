import { Link } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserFeed() {
  const suggestionRef = createRef();
  const commentRef = createRef();
  const { user, setUser } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      comment: commentRef.current.value,
      suggestion: suggestionRef.current.value,
    };

    axiosClient
      .post('/submit-comments-suggestions', payload)
      .then((response) => {
        const { data } = response;
        // Use the 'data' variable as needed
        console.log(data);
      })      
      .catch((error) => {
        // Handle error
        setSuccessMessage(null); // Clear success message on error
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="profile-container">
      <section className="profile-info">
          <img
            src="https://placekitten.com/200/200" // Replace with your profile image URL
            alt="Profile"
            className="profile-picture"
          />
          <div className="user-details">
            <h2>{user.name}</h2>
            <p>Web Developer</p>
            <p>Location: City, Country</p>
          </div>
        </section>
        <section className="profile-bio">
          <h2>About Me</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            accumsan, est a dapibus ultrices, mauris lorem feugiat turpis.
          </p>
        </section>
        <section className="profile-skills">
          <h2>Skills</h2>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>React</li>
            {/* Add more skills as needed */}
          </ul>
        </section>
        {/* Add more sections for projects, education, etc. */}

      <form onSubmit={onSubmit}>
        {/* show errors */}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        
        {/* show success message */}
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        <input ref={commentRef} type="text" placeholder="Comment" />
        <input ref={suggestionRef} type="text" placeholder="Suggestion" />
        <button className="btn btn-block">Submit</button>
      </form>
    </div>
  );
}
