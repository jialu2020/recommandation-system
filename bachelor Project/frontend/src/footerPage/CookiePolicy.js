import React from 'react';

function CookiePolicy() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Cookie Policy</h1>
      <p style={paragraphStyle}>
        We use cookies on our website to enhance your experience and provide personalized content. By using our website, you agree to the use of cookies as outlined in this policy.
      </p>
      <h2 style={subHeadingStyle}>What are Cookies?</h2>
      <p style={paragraphStyle}>
        Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
      </p>
      <h2 style={subHeadingStyle}>How We Use Cookies</h2>
      <p style={paragraphStyle}>
        We use cookies to store some of the user's login information.==
      </p>
      <h2 style={subHeadingStyle}>Types of Cookies We Use</h2>
      <p style={paragraphStyle}>
        - Essential cookies: These cookies are necessary for the website to function properly and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
      </p>
      <h2 style={subHeadingStyle}>Managing Cookies</h2>
      <p style={paragraphStyle}>
        You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. You can also delete cookies from your browser settings after visiting our website.
      </p>
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

const subHeadingStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '20px',
  marginBottom: '10px',
};

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
};

export default CookiePolicy;
