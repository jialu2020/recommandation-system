import React from 'react';

function PrivacyPolicy() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Privacy Policy</h1>
      <p style={paragraphStyle}>
        At IndiLearn, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and disclose your data when you use our website and services.
      </p>
      <h2 style={subHeadingStyle}>Information We Collect</h2>
      <p style={paragraphStyle}>
        We may collect personal information, such as your name, email address, and username when you register an account with us. We also collect non-personal information, such as your IP address and browser type, for analytical purposes.
      </p>
      <h2 style={subHeadingStyle}>How We Use Your Information</h2>
      <p style={paragraphStyle}>
        We use your personal information to provide and improve our services, customize your user experience, and communicate with you about our products and updates. We may also use non-personal information for analytical purposes to understand how users interact with our website.
      </p>
      <h2 style={subHeadingStyle}>Data Security</h2>
      <p style={paragraphStyle}>
        We take data security seriously and employ appropriate measures to protect your information from unauthorized access, alteration, or disclosure.
      </p>
      <h2 style={subHeadingStyle}>Third-Party Services</h2>
      <p style={paragraphStyle}>
        We may use third-party services, such as analytics and advertising providers, to enhance our website's functionality. These third parties may collect information about your use of our website through cookies and similar technologies.
      </p>
      <h2 style={subHeadingStyle}>Your Choices</h2>
      <p style={paragraphStyle}>
        You can update your account information and communication preferences by accessing your account settings. You may also delete your account and personal information from our database at any time.
      </p>
      <h2 style={subHeadingStyle}>Changes to the Privacy Policy</h2>
      <p style={paragraphStyle}>
        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the updated Privacy Policy on our website or by other appropriate means.
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

export default PrivacyPolicy;
