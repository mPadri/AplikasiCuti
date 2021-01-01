import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const EmptyCuti = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Anda Belum Memiliki History Cuti</Text>
    </View>
  );
};

export default EmptyCuti;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
  },
});
