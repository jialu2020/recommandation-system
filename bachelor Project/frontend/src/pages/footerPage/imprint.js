import React, { useEffect } from 'react';

function Imprint() {

  useEffect(() => {
    // Redirects to the specified URL
    window.location.href = 'https://www.uni-due.de/de/impressum.shtml';
  }, []);

  // Render nothing or a loading indicator since the page will redirect
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default Imprint;
