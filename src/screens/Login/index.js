import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {getDataAction} from '../../redux/reducers/DataUser';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import Logo from '../../assets/images/logo.png';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();

  const doSignIn = (email, password) => {
    setLoading(true);
    Auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        let jabatan = '';
        let status = '';
        // let dataUser = {};
        database()
          .ref(`/users/${res.user.uid}`)
          .once('value', (snapshot) => {
            const data = snapshot.val();
            if (data.status == 'tidak-aktif') {
              // alert('Email atau Password salah');
              showMessage({
                message: 'Email atau Password salah !',
                type: 'danger',
                autoHide: false,
              });
            }
            status = data.status;
            jabatan = data.jabatan;
            // dataUser = data;
          })
          .then(() => {
            if (status == 'tidak-aktif') {
              jabatan = '';
              status = '';
              setLoading(false);
            } else if (jabatan == 'Staff' && status == 'aktif') {
              setLoading(false);
              navigation.replace('StaffApp');
              showMessage({
                message: 'Success !',
                type: 'success',
              });
            } else if (jabatan == 'HRD' && status == 'aktif') {
              // dispatch(getDataAction({dataUser}));
              setLoading(false);
              navigation.replace('MainApp');
              showMessage({
                message: 'Success !',
                type: 'success',
              });
            } else if (jabatan == 'Leader' && status == 'aktif') {
              setLoading(false);
              navigation.replace('LeaderApp');
              showMessage({
                message: 'Success !',
                type: 'success',
              });
            } else if (jabatan == 'Operation' && status == 'aktif') {
              setLoading(false);
              navigation.replace('LeaderApp');
              showMessage({
                message: 'Success !',
                type: 'success',
              });
            }
          });
      })
      .catch((err) => {
        setLoading(false);
        showMessage({
          message: 'Email atau Password salah !',
          type: 'danger',
        });
      });
  };
  return (
    <View style={{marginHorizontal: 16, justifyContent: 'center', flex: 1}}>
      <View style={{marginTop: -50}}>
        {/* <Image source={Logo} style={{width: 160, height: 54}} /> */}
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Login</Text>
        </View>
        <View style={{margin: 10}}>
          <TextInput
            placeholder="Email"
            underlineColorAndroid="#d4d4d4"
            value={email}
            onChangeText={(value) => setEmail(value)}
            keyboardType='email-address'
          />
          <TextInput
            placeholder="Password"
            underlineColorAndroid="#d4d4d4"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <View style={styles.wrapButton}>
          <TouchableOpacity
            style={{
              backgroundColor: loading ? 'grey' : '#1F202E',
              width: '20%',
              paddingVertical: 4,
              borderRadius: 4,
              elevation: 2,
            }}
            disabled={loading}
            onPress={() => doSignIn(email, password)}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
              }}>
              LOGIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.text}>Lupa Password ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  wrapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 11,
    color: '#CD9543',
  },
});
