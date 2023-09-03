import React from 'react';
import './TerminationPage.css';
import sadIcon from '../icons/sad.png';
import Footer from "../footer";

const TerminationPage = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Studie Beenden</h1>
        <img src={sadIcon} alt="Sad Icon" className="sad-icon" />

        <p className="page-text">Ich bedauere, dass Du die Studie beenden möchtest.</p>
        <p className="page-text">Bitte kontaktieren Sie uns per E-Mail, um Ihre gesammelten Informationen zu löschen:</p>
        <p className="contact-email">
          Kontakt-E-Mail: <a href="mailto:jia.lu.2@stud.uni-due.de">jia.lu.2@stud.uni-due.de</a>
        </p>
        <p className="email-instructions">Bitte geben Sie in Ihrer E-Mail an, warum Sie die Studie beenden möchten und teilen Sie uns Ihren Benutzernamen mit.</p>
      </div>

    </div>

  );
};

export default TerminationPage;
