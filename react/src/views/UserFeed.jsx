import { createRef, useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserFeed() {
  const suggestionRef = createRef();
  const commentRef = createRef();
  const { user, setUser } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { comments, setComments } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
  
    const payload = {
      comment: commentRef.current.value,
      suggestion: suggestionRef.current.value,
    };
  
    axiosClient
      .post('/comments', payload) // Updated endpoint for Laravel API
      .then((response) => {
        const { data } = response;
        console.log(data);
        setComments(data);
        setErrors(null);
        // setSuccessMessage('Comment and suggestion submitted successfully!');
        // Clear form fields using the form reset method
        ev.target.reset();
      })
      .catch((error) => {
        setSuccessMessage(null);
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // Clear success and error messages after 5 seconds
    const timer = setTimeout(() => {
      setSuccessMessage(null);
      setErrors(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage, errors]);

  return (
    <div className="profile-container">
      <section className="profile-info">
          <img
            src="src/images/cat-transparent-gif-9.png" // Replace with your profile image URL
            alt="Profile"
            className="profile-picture"
          />
          <div className="user-details">
            <h2>{user.name}</h2>
            <p>{user.occupation}</p>
            <p>Location: {user.address}</p>
          </div>
        </section>
        <section className="profile-bio">
          <h2>About Me</h2>
          <p>
            This is an unfinished webpage and still working on more features but I would love to hear your Comments and Suggestion on what other Features should i add next 😊.<br></br><br></br>
            I will be able to see your Comments and Suggestions on my Dashboard. Thank you!!
          </p>
        </section>
        <section className="profile-skills">
          <h2>Skills</h2>
          <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>PHP</li>
            <li>Laravel</li>
            <li>Node</li>
            <li>API</li>
            <li>MVC</li>
            <li>Python</li>
            <li>Git/Github</li>
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
        <button className="btn btn-block" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
