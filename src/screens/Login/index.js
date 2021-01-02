import React, {useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {getDataAction} from '../../redux/reducers/DataUser';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';

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
            console.log('User data: ', snapshot.val());
            const data = snapshot.val();
            console.log('doSignIn -> data', data.status);
            if (data.status == 'tidak-aktif') {
              // alert('Email atau Password salah');
              showMessage({
                message: 'Email atau Password salah !',
                type: 'danger',
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
      .catch((err) => console.log(err));
  };
  return (
    <View style={{marginHorizontal: 16, justifyContent: 'center', flex: 1}}>
      <View style={{marginTop: -50}}>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Login</Text>
        </View>
        <View style={{margin: 10}}>
          <TextInput
            placeholder="Email"
            underlineColorAndroid="#d4d4d4"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            placeholder="Password"
            underlineColorAndroid="#d4d4d4"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: loading ? 'grey' : 'skyblue',
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
      </View>
    </View>
  );
};

export default Login;
