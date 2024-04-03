import React from 'react';
// import './DevInfo.css'; // Import your CSS file for styling

export default function DevInfo() {
    // Function to handle resume download
    const downloadResume = () => {
        // Replace 'your-resume.pdf' with the path to your actual resume PDF file
        const resumeUrl = '/src/pdfs/John Michael Santosidad-Resume.pdf';
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.setAttribute('download', 'John Michael Santosidad-Resume.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="dev-info-container">
            <div className="profile-header">
                <h1>Hi! I'm John Michael Santosidad</h1>
                <p className="intro">Let's take a moment to get to know each other. Below are my details:</p>
            </div>
            <div className="developer-details">
                <div className="detail">
                    <h2>Name:</h2>
                    <p>JOHN MICHAEL B. SANTOSIDAD</p>
                </div>
                <div className="detail">
                    <h2>Location:</h2>
                    <p>1885 MODESTO ST. MALATE MANILA</p>
                </div>
                <div className="detail">
                    <h2>Skills:</h2>
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
                    </ul>
                </div>
                <div className="detail">
                    <h2>About Me:</h2>
                    <p>I'm a passionate software developer with a Bachelor's degree in Computer Engineering. I enjoy spending my free time playing computer and mobile games, as well as listening to music for relaxation and inspiration.</p>
                </div>
                <div className="detail">
                    <h2>Motto:</h2>
                    <p>SLEEP IS JUST A MYTH</p>
                </div>
            </div>
            <button className="download-resume-btn" onClick={downloadResume}>HERE'S MY RESUME</button>
        </div>
    );
}
