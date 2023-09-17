import React from 'react';

function Contact() {
  return (
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h1 style={headingStyle}>Kontakt</h1>
          <p style={paragraphStyle}>Wenn Sie Anregungen oder Fragen haben, zögern Sie nicht, mich zu kontaktieren:</p>
          <p style={emailStyle}>jia.lu.2@stud.uni-due.de</p>
          <p style={paragraphStyle}>Sie können mir auch auf den sozialen Medien folgen:</p>
          <a style={socialMediaStyle} href="https://www.instagram.com/luuujia" target="_blank" rel="noopener noreferrer">Instagram: @luuujia</a>
        </div>

        <div style={sectionStyle}>
          <h1 style={headingStyle}>Unterstützt von</h1>
          <p style={authorStyle}>Prof. Dr. Stefan Schneegaß</p>
          <p style={paragraphStyle}>paluno - The Ruhr Institute for Software Technology</p>
          <p style={paragraphStyle}>Institut für Informatik und Wirtschaftsinformatik (ICB)</p>
          <p style={paragraphStyle}>Mensch-Computer Interaktion</p>
          <p style={paragraphStyle}>Schützenbahn 70</p>
          <p style={paragraphStyle}>Raum SM 208</p>
          <p style={paragraphStyle}>45127 Essen</p>
        </div>
      </div>


  );
}

const containerStyle = {

  justifyContent: 'space-between',
  padding: '20px',
  backgroundColor: 'white',
  gap: '20px',
};

const sectionStyle = {
  flexBasis: '40%',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const subHeadingStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const authorStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
};


const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '1.5',
};

const emailStyle = {
  fontSize: '16px',
  color: 'darkblue',
  marginBottom: '10px',
};

const socialMediaStyle = {
  fontSize: '16px',
  color: 'darkblue',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '10px',
};

export default Contact;
