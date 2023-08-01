// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/image-requires-accessible-prop

import { Image, View } from "react-native";

const MyComponent = () => {
  return (
    <>
      <Image source={{ uri: "" }} accessibilityIgnoresInvertColors />
      <Image source={{ uri: "" }} accessibilityIgnoresInvertColors />
      <Image source={{ uri: "random" }} accessibilityIgnoresInvertColors />
      <OtherImage source={{ uri: "random" }} accessibilityIgnoresInvertColors />
      <NotReallyAnImage></NotReallyAnImage>
    </>
  );
};

const OtherImage = Image;
const NotReallyAnImage = View;
export default MyComponent;
