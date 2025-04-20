import React, { useEffect, useState } from 'react';
import './style.css';

export default function Loader() {
  const [shrunk, setShrunk] = useState(false);
  const [showCloud, setShowCloud] = useState(false);

  useEffect(() => {
    const shrinkTimeout = setTimeout(() => setShrunk(true), 300);
    const cloudTimeout = setTimeout(() => setShowCloud(true), 700);

    return () => {
      clearTimeout(shrinkTimeout);
      clearTimeout(cloudTimeout);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className={`green-circle ${shrunk ? 'shrunk' : ''}`}>
        {showCloud && (
          <div className="cloud">
            {/* Ícono de nube SVG */}
            <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="white"
  viewBox="0 0 24 24"
  width="32"
  height="32"
  
>
  <path d="M19 18H6a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.9-.9A4.5 4.5 0 0 1 19 18Z" />
</svg>
          </div>
        )}
      </div>
    </div>
  );
}
