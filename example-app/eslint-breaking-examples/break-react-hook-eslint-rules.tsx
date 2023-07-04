// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-react-hooks:
// react-hooks/exhaustive-deps

import { useState, useEffect } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []);

  return <></>;
};

export default MyComponent;
