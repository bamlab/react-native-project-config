// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/require-named-effect

import { useEffect } from "react";

const MyComponent = () => {
  const doAThing = (t: number) => t;
  const doNothing = () => {};
  const initializeStuff = () => Promise.resolve();

  useEffect(() => {
    const abc = 1;
    doAThing(abc);
  }, []);

  // Does not trigger an error:
  useEffect(() => doNothing(), []);
  useEffect(() => void initializeStuff(), []);

  return <></>;
};

export default MyComponent;
