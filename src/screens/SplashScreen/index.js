import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Logo from '../../assets/images/logo.png';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={{width: 160, height: 54}} />
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F202E',
  },
});
