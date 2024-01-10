import logo from "../../logo.svg";
import React, { useEffect, useState } from "react";

export function Logo() {
  const [intialLogoSpeed, setIntialLogoSpeed] = useState(10000);
  useEffect(() => {
    const interval = setInterval(() => {
      setIntialLogoSpeed((prevSpeed) => Math.max(prevSpeed - 100, 1500));
    }, 10);

    return () => clearInterval(interval); // Cleanup function to clear the interval on component unmount
  }, []);

  const stringSpeedOfLogo = intialLogoSpeed + "ms";

  const logoStyle = {
    animation: `App-logo-spin infinite ${stringSpeedOfLogo} linear`, // Replace with your animation
  };

  return (
    <div className="App-header">
      <img style={logoStyle} src={logo} className="App-logo" alt="logo" />
    </div>
  );
}
