import React from 'react';
import './EditorialBoard.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const EditorialBoard = () => {
  const chiefEditor = {
    name: "Dr. C. Mythili",
    position: "Assistant Professor and Head",
    department: "Department of Electrical and Electronics Engineering",
    institution: "University College of Engineering Nagercoil, Tamil Nadu, India",
    email: "mythili@ucen.ac.in"
  };

  const editorialMembers = [
    {
      name: "Dr. S. Durgadevi",
      position: "Associate Professor",
      department: "Department of Electronics and Instrumentation Engineering",
      institution: "Sri Sairam Engineering College, Chennai, Tamil Nadu, India",
      email: "durgadevi.ei@sairam.edu.in"
    },
    {
      name: "Dr. S. Chitraselvi",
      position: "Assistant Professor",
      department: "Department of Electrical and Electronics Engineering",
      institution: "University College of Engineering Dindigul, Tamil Nadu, India",
      email: "dr.s.chitraselvi@auucedgl.ac.in"
    },
    {
      name: "Dr. R. Mukesh",
      position: "Professor",
      department: "Department of Electronics and Communication Engineering",
      institution: "Saranathan College of Engineering, Trichy, Tamil Nadu, India",
      email: "mukesh7131@saranathan.ac.in"
    },
    {
      name: "Dr. A.R. Anandha Krishnaveni",
      position: "Principal",
      department: "",
      institution: "Arulmigu Kalasalingam College of Education, Krishnankoil, Tamil Nadu, India",
      email: "anandhakrishnaveni@akceducation.org"
    },
    {
      name: "Dr. R. S. Balasenthil",
      position: "Associate Professor",
      department: "Department of Management Studies",
      institution: "K.L.N. College of Engineering, Sivagangai, Tamil Nadu, India",
      email: "balasenthil.rs@klnce.edu"
    }
  ];

  const internationalMembers = [
    {
      name: "Dr. Karthik Srinivasan",
      position: "Assistant Professor",
      department: "Department of Information Technology, College of Computing and Informatics",
      institution: "Saudi Electronic University, Riyadh, Saudi Arabia",
      email: "k.parimala@seu.edu.sa"
    },
    {
      name: "Dr. Peeyush Dwivedi",
      position: "Lecturer",
      department: "College of Commerce and Business Administration",
      institution: "University of Technology and Applied Science, Salalah, Sultanate of Oman",
      email: "peeyush.dwivedi@utas.edu.om"
    },
    {
      name: "Dr. M. Senapathy",
      position: "Associate Professor",
      department: "Department of Rural Development and Agricultural Extension",
      institution: "Wolaita Sodo University, Ethiopia",
      email: "drsenapathy@wsu.edu.et"
    }
  ];

  const MemberCard = ({ member, isChief = false }) => (
    <div className={`editorial-board-member-card ${isChief ? 'editorial-board-chief-editor-card' : ''}`}>
      <h3 className="editorial-board-member-name">{member.name}</h3>
      <p className="editorial-board-member-position">{member.position}</p>
      {member.department && (
        <p className="editorial-board-member-department">{member.department}</p>
      )}
      <p className="editorial-board-member-institution">{member.institution}</p>
      <a href={`mailto:${member.email}`} className="editorial-board-member-email">
        {member.email}
      </a>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="editorial-board-main-wrapper">
        <div className="editorial-board-content-container">
          <header className="editorial-board-page-header">
            <h1 className="editorial-board-main-heading">Editorial Board</h1>
          </header>

          <section className="editorial-board-chief-editor-section">
            <h2 className="editorial-board-section-heading">Chief Editor</h2>
            <div className="editorial-board-members-grid">
              <MemberCard member={chiefEditor} isChief={true} />
            </div>
          </section>

          <section className="editorial-board-members-section">
            <h2 className="editorial-board-section-heading">Editorial Board Members</h2>
            <div className="editorial-board-members-grid">
              {editorialMembers.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </div>
          </section>

          <section className="editorial-board-international-section">
            <h2 className="editorial-board-section-heading">International Editorial Members</h2>
            <div className="editorial-board-members-grid">
              {internationalMembers.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditorialBoard;