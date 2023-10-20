import { Text } from "react-native";

// Save without formatting: [⌘ + K] > [S]

// This should trigger an error because of jsx-no-useless-fragment rule
const ComponentWithUselessFragment = () => {
  return (
  <>
    <Text>Useless text</Text>
  </>
  );
};
ComponentWithUselessFragment;
