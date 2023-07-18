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
      <h1 style={headingStyle}>Imprint</h1>
      <p style={paragraphStyle}>
        Die Universität Duisburg-Essen (UDE) ist eine vom Land Nordrhein-Westfalen getragene, rechtsfähige Körperschaft des öffentlichen Rechts. Sie trägt den Namen „Universität Duisburg-Essen“ und führt diesen Namen in ihrem Logo.
      </p>
      <p style={paragraphStyle}>
        Zuständige Aufsichtsbehörde ist das Ministerium für Kultur und Wissenschaft des Landes Nordrhein-Westfalen, Völklinger Straße 49, 40221 Düsseldorf.
      </p>
    </div>
  );
}

export default Imprint;
