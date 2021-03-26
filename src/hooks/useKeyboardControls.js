import { useRef, useEffect } from "react";

function useKeyboardControls(key, callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handleKeyDown({ code }) {
      //console.log("code:", code);
      if (key === code) {
        callbackRef.current(code);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    //document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      //document.removeEventListener("keyup", handleKeyUp);
    };
  }, [key]);
}

export default useKeyboardControls;
