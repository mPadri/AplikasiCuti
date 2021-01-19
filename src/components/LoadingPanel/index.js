import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingPanel = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#CD9543" />
    </View>
  );
};

export default LoadingPanel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
