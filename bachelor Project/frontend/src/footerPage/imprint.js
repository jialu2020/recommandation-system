import React from 'react';

function Imprint() {
  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headingStyle = {
    marginTop: '40px',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
  };

  return (
      <div style={containerStyle}>
        <h1 style={headingStyle}>Impressum</h1>

        <p style={paragraphStyle}>
          Die Universität Duisburg-Essen (UDE) ist eine vom Land Nordrhein-Westfalen getragene, rechtsfähige Körperschaft des öffentlichen Rechts. Sie trägt den Namen „Universität Duisburg-Essen“ und führt diesen Namen in ihrem Logo.
        </p>

        <p style={paragraphStyle}>
          Zuständige Aufsichtsbehörde ist das Ministerium für Kultur und Wissenschaft des Landes Nordrhein-Westfalen,
         </p>
         <span style={{ color: 'darkblue' }}>
         Völklinger Straße 49, 40221 Düsseldorf.
         </span>




        <p style={paragraphStyle}>
          Diese Website wird unterstützt von: <br/>
          Prof. Dr. Stefan Schneegaß und seinem Team.<br/><br/>
        </p>
      </div>
  );
}

export default Imprint;
