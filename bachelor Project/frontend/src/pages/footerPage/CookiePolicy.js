import React from 'react';

function CookiePolicy() {
  return (
      <div style={containerStyle}>
        <h1 style={headingStyle}>Cookie-Richtlinie</h1>
        <p style={paragraphStyle}>
          Wir verwenden Cookies auf unserer Website, um Ihre Erfahrung zu verbessern und personalisierte Inhalte bereitzustellen. Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß dieser Richtlinie zu.
        </p>
        <h2 style={subHeadingStyle}>Was sind Cookies?</h2>
        <p style={paragraphStyle}>
          Cookies sind kleine Textdateien, die auf Ihrem Computer oder Mobilgerät platziert werden, wenn Sie eine Website besuchen. Sie werden weit verbreitet eingesetzt, um Websites effizienter zu betreiben und Informationen an die Eigentümer der Website bereitzustellen.
        </p>
        <h2 style={subHeadingStyle}>Wie wir Cookies verwenden</h2>
        <p style={paragraphStyle}>
          Wir verwenden Cookies, um einige der Anmeldeinformationen des Benutzers zu speichern.
        </p>
        <h2 style={subHeadingStyle}>Arten von verwendeten Cookies</h2>
        <p style={paragraphStyle}>
          - Wesentliche Cookies: Diese Cookies sind notwendig, damit die Website ordnungsgemäß funktioniert, und können in unseren Systemen nicht deaktiviert werden. Sie werden normalerweise nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt, die eine Anfrage nach Diensten darstellen, wie z. B. das Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder das Ausfüllen von Formularen.
        </p>
        <h2 style={subHeadingStyle}>Verwaltung von Cookies</h2>
        <p style={paragraphStyle}>
          Sie können Ihren Browser so einstellen, dass er diese Cookies blockiert oder Sie über diese Cookies informiert. Einige Teile der Website werden jedoch möglicherweise nicht funktionieren. Sie können auch Cookies aus Ihren Browsereinstellungen löschen, nachdem Sie unsere Website besucht haben.
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

export default CookiePolicy;
