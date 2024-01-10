import "./App.css";
import React, { useEffect, useState } from "react";
import { Logo } from "./Components/Logo/Logo";
import { Convertor } from "./Components/Convertor/Convertor";

function App() {
  const [displayLogoElement, setdisplayLogoElement] = useState(true);

  useEffect(() => {
    const visibilityDuration = 900;

    const timeoutId = setTimeout(() => {
      setdisplayLogoElement(false);
    }, visibilityDuration);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Change body background color after one second
    const timeoutId = setTimeout(() => {
      document.body.style.backgroundColor = "#9c9c9c";
    }, 900);

    return () => clearTimeout(timeoutId); // Cleanup function to avoid memory leaks
  }, []); // Empty dependency array ensures that the effect runs once on mount

  return (
    <div className="App">
      {displayLogoElement && <Logo />}
      {!displayLogoElement && <Convertor />}
    </div>
  );
}

export default App;
