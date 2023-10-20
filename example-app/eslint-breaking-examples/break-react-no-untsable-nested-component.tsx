// This should trigger one error breaking no-unstable-nested-components:
// react/no-unstable-nested-components

const MainComponent = () => {
  const NestedComponent = () => {
    return <View>Test</View>;
  };
  return <NestedComponent />;
};
MainComponent;
