import React from 'react';
function PrivacyPolicy() {




  return (
      <div style={containerStyle}>
        <h1 style={headingStyle}>Datenschutzerklärung</h1>
        <p style={paragraphStyle}>
          Bei IndiLearn legen wir großen Wert auf Ihre Privatsphäre und verpflichten uns, Ihre persönlichen Informationen zu schützen. Diese Datenschutzerklärung beschreibt, wie wir Ihre Daten erfassen, verwenden und offenlegen, wenn Sie unsere Website und Dienste nutzen.
        </p>
        <h2 style={subHeadingStyle}>Erhobene Informationen</h2>
        <p style={paragraphStyle}>
          Wir können personenbezogene Informationen wie Ihren Benutzernamen erfassen, wenn Sie bei uns ein Konto registrieren.
        </p>
        <h2 style={subHeadingStyle}>Verwendung Ihrer Informationen</h2>
        <p style={paragraphStyle}>
          Wir verwenden Ihre personenbezogenen Informationen, um unsere Dienste bereitzustellen und zu verbessern, Ihr Benutzererlebnis anzupassen und mit Ihnen über unsere Produkte und Aktualisierungen zu kommunizieren.
        </p>
        <h2 style={subHeadingStyle}>Datensicherheit</h2>
        <p style={paragraphStyle}>
          Wir nehmen den Datenschutz ernst und ergreifen angemessene Maßnahmen, um Ihre Informationen vor unbefugtem Zugriff, Änderungen oder Offenlegung zu schützen.
        </p>
        <h2 style={subHeadingStyle}>Dienste von Dritten</h2>
        <p style={paragraphStyle}>
          Wir können Dienste von Drittanbietern wie Analyse- und Werbeanbietern verwenden, um die Funktionalität unserer Website zu verbessern.
        </p>
        <h2 style={subHeadingStyle}>Ihre Auswahlmöglichkeiten</h2>
        <p style={paragraphStyle}>
          Sie können Ihr Konto und Ihre persönlichen Informationen jederzeit aus unserer Datenbank löschen.
        </p>
        <h2 style={subHeadingStyle}>Änderungen der Datenschutzerklärung</h2>
        <p style={paragraphStyle}>
          Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren, um Änderungen unserer Praktiken oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen widerzuspiegeln. Wir werden Sie über wesentliche Änderungen informieren, indem wir die aktualisierte Datenschutzerklärung auf unserer Website veröffentlichen oder auf andere geeignete Weise.
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
  textAlign: 'center'
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
