// This should trigger one error breaking no-unused-prop-types:
// react/no-unused-prop-types

import { Text } from "react-native";

interface NotUsedPropComponentProps {
  name: string;
  surname: string;
}

const NotUsedPropComponent = (props: NotUsedPropComponentProps) => {
  return <Text>{`Hello ${props.name} I refuse to use the surname prop`}</Text>;
};
NotUsedPropComponent;
