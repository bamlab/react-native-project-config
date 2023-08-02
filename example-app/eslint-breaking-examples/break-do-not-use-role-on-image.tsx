// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/do-not-use-role-on-image

import { Image } from "react-native";

export const MyComponent = () => {
  return (
    <>
      <Image
        source={{ uri: "" }}
        accessibilityIgnoresInvertColors
        accessible
        role="button"
      />
      <Image
        source={{ uri: "" }}
        accessibilityIgnoresInvertColors
        accessible
        role="img"
      />
    </>
  );
};

