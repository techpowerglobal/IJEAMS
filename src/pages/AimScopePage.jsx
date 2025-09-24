import React from 'react';
import './AimScope.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AimScopePage = () => {
  const engineeringFields = [
    {
      title: "Civil Engineering",
      topics: [
        "Structures", "Earthquake", "Environment", "Transportation", 
        "Geo Techniques", "Water Resources", "Hydraulic and Hydraulic Structures", 
        "Construction Management and Construction Materials"
      ]
    },
    {
      title: "Mechanical Engineering", 
      topics: [
        "Biomechanics", "Dynamics and Control", "Materials and Structures",
        "Design and Manufacturing", "Combustion and Energy System",
        "Aerodynamics and Fluid Mechanics", "Vibrations, Acoustics and Fluid Structure Interaction"
      ]
    },
    {
      title: "Electronics & Communication Engineering",
      topics: [
        "Semiconductors", "Electron Devices", "Signal Processing", "Electromagnetics",
        "Nano Electronics", "Image Processing", "Transmission Lines", "Telecommunications",
        "Communication Theory", "Wave Propagation Theory", "Analog and Digital Devices",
        "Biomedical and Instrumentation"
      ]
    },
    {
      title: "Electrical and Electronics Engineering",
      topics: [
        "HVDC", "Microgrids", "Facts Devices", "Power Systems", "Electric Vehicles",
        "Power Electronics", "Smart Grid System", "Electrical Machines",
        "Solid State Technology", "High Voltage Engineering", "Special Electrical Machines",
        "Electrical Insulation System", "Renewable Power Generation"
      ]
    },
    {
      title: "Computer Science and Engineering & Information Technology",
      topics: [
        "Big Data", "Data Mining", "Cryptography", "5G Technology", "Cloud Computing",
        "Image Processing", "Internet of Things", "Artificial Intelligence",
        "Block Chain Technology", "Communication Network", "Augmented and Virtual Reality",
        "Database Management and Information Retrieval"
      ]
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="jaems-aim-scope-container">
      <div className="jaems-content-wrapper">
        <header className="jaems-page-header">
          <h1 className="jaems-main-title">Aim & Scope</h1>
          <div className="jaems-title-underline"></div>
        </header>

        <section className="jaems-aim-section">
          <div className="jaems-section-header">
            <h2 className="jaems-section-title">Aim</h2>
            <div className="jaems-section-icon">🎯</div>
          </div>
          <div className="jaems-content-card">
            <p className="jaems-aim-text">
              The aim of <strong>International Journal of Advanced Engineering and Management System</strong> is to foster creativity and innovation within the fields of Engineering studies. It aims to recognize and promote original and inventive ideas by publishing related papers online. The journal's goal is to highlight the valuable contributions of the scientific community and respected editors, thus enhancing the collective knowledge and resources available in these domains.
            </p>
          </div>
        </section>
   

        <section className="jaems-scope-section">
          <div className="jaems-section-header">
            <h2 className="jaems-section-title">Scope</h2>
            <div className="jaems-section-icon">🔬</div>
          </div>
          <div className="jaems-content-card">
            <p className="jaems-scope-intro">
              The scope of the journal encompasses a wide range of subjects within the realms of engineering. It includes various topics such as:
            </p>
          </div>
         
          <div className="jaems-fields-grid">
            {engineeringFields.map((field, index) => (
              <div key={index} className="jaems-field-card">
                <h3 className="jaems-field-title">{field.title}</h3>
                <div className="jaems-topics-container">
                  {field.topics.map((topic, topicIndex) => (
                    <span key={topicIndex} className="jaems-topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AimScopePage;