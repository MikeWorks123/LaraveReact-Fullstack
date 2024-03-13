import { createRef, useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function ContactMe() {
    const companyRef = createRef();
    const addressRef = createRef();
    const contactpersonRef = createRef();
    const messageRef = createRef();
    const phonenumberRef = createRef();
    const fileRef = createRef();
    const { user, setUser } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { contacts, setContacts } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
      
        const payload = {
          company: companyRef.current.value,
          address: addressRef.current.value,
          contact_person: contactpersonRef.current.value,
        //   message: messageRef.current.value,
          phone_number: phonenumberRef.current.value,
          pdf_path: fileRef.current.value,
        };
      
        axiosClient
          .post('/contacts', payload) // Updated endpoint for Laravel API
          .then((response) => {
            const { data } = response;
            console.log(data);
            setContacts(data);
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

          console.log(payload);
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
    <div>
      <h1><center>
        <strong>Kindly Drop your details 😊</strong>
      </center>
      </h1>
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
        <label>
          Company Name:
          <input type="text" ref={companyRef}/>
        </label>
        <label>
          Address:
          <input type="text" ref={addressRef} />
        </label>
        <label>
          Contact Person:
          <input type="text" ref={contactpersonRef}/>
        </label>
{/* 
        <label>
          Add Message (Optional):
          <input
            type="text"
            name="message"
            ref={contactpersonRef}
          />
        </label> */}
        <label>
          Phone Number:
          <input type="tel" ref={phonenumberRef} />
        </label>
        <label>
          Attach PDF (optional):
          <input type="file" accept=".pdf" ref={fileRef}/>
        </label>
        <button className="btn btn-block" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
