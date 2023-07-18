import React from 'react';

function Contact() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact</h1>
      <p style={paragraphStyle}>If you have any suggestions or questions, please feel free to contact me at:</p>
      <p style={emailStyle}>jia.lu.2@stud.uni-due.de</p>
      <p style={paragraphStyle}>You can also follow me on social media:</p>
      <a style={socialMediaStyle} href="https://www.instagram.com/luuujia" target="_blank" rel="noopener noreferrer">Instagram: @luuujia</a>
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
};

const emailStyle = {
  fontSize: '16px',
  color: 'blue',
  marginBottom: '20px',
};

const socialMediaStyle = {
  fontSize: '16px',
  color: 'blue',
  textDecoration: 'underline', // Optional: Add underline to indicate it's a link
};

export default Contact;
