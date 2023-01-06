// This should trigger two errors breaking eslint-plugin-react-native:
// react-native/no-color-literals
// react-native/sort-styles
const styles = StyleSheet.create({
  button: {
    width: 100,
    color: "green",
  },
});
