import { Image } from "react-native";

const MyComponent = () => {
  return (
    <>
      <Image source={{ uri: "" }} accessible accessibilityIgnoresInvertColors />
      <Image source={{ uri: "" }} accessible accessibilityIgnoresInvertColors />
      <Image source={{ uri: "random" }} accessibilityIgnoresInvertColors />
      <OtherImage source={{ uri: "random" }} accessibilityIgnoresInvertColors />
      <OtherImage source={{ uri: "random" }} accessibilityIgnoresInvertColors>
        <></>
      </OtherImage>
    </>
  );
};

const OtherImage = Image;
export default MyComponent;
