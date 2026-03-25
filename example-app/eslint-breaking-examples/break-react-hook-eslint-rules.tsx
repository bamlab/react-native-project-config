// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-react-hooks:
// react-hooks/exhaustive-deps
// react-hooks/rules-of-hooks
// react-hooks/error-boundaries

import { useEffect, useState } from "react";
import { View } from "react-native";

// react-hooks/exhaustive-deps
// Missing `count` in the dependency array
const ExhaustiveDepsComponent = () => {
  const [count] = useState(0);

  useEffect(() => void String(count), []);

  return <View />;
};

// react-hooks/rules-of-hooks
// Hooks must not be called conditionally
const RulesOfHooksComponent = ({ isEnabled }: { isEnabled: boolean }) => {
  if (isEnabled) {
    const [value] = useState("conditional");
    return <View testID={value} />;
  }

  return <View />;
};

// react-hooks/error-boundaries
// Use error boundaries instead of try/catch for child component errors
const ErrorBoundaryComponent = () => {
  try {
    const result = JSON.parse("{}") as Record<string, string>;
    return <View testID={result["id"]} />;
  } catch {
    return <View testID="fallback" />;
  }
};

export {
  ErrorBoundaryComponent,
  ExhaustiveDepsComponent,
  RulesOfHooksComponent,
};
