import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Auth from '@react-native-firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const forgot = () => {
    setLoading(true);
    Auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Silahkan cek email anda !');
        setLoading(false);
        setEmail('');
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Text>Lupa Password</Text>
      <TextInput
        placeholder="Email"
        underlineColorAndroid="#d4d4d4"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: loading ? 'grey' : 'skyblue',
          width: '20%',
          paddingVertical: 4,
          borderRadius: 4,
          elevation: 2,
        }}
        disabled={loading}
        onPress={() => forgot()}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}>
          KIRIM
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});
