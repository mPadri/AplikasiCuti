import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import database from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const EditProfile = ({navigation}) => {
  const [dataUser, setDataUser] = useState({
    nama: '',
    jabatan: '',
    email: '',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const userId = Auth().currentUser;

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    database()
      .ref(`users/${userId.uid}`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        let user = {
          nama: data.nama,
          jabatan: data.jabatan,
          email: data.email,
        };
        setDataUser(user);
      })
      .catch((err) => console.log(err));
  };

  const reauthenticate = (currentPassword) => {
    let cred = Auth.EmailAuthProvider.credential(userId.email, currentPassword);
    return userId.reauthenticateWithCredential(cred);
  };

  const changePassword = (currentPassword, newPassword) => {
    reauthenticate(currentPassword)
      .then(() => {
        userId
          .updatePassword(newPassword)
          .then(() => {
            console.log('password updated');
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (userId) => {
    database()
      .ref(`/users/`)
      .child(userId)
      .update(dataUser)
      .then(() => {
        console.log('update');
        if (currentPassword !== '' && newPassword !== '') {
          changePassword(currentPassword, newPassword);
        }
        navigation.goBack();
        // console.log(currentPassword);
        // console.log(newPassword);
        showMessage({message: 'Success Updated', type: 'success'});
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={{margin: 12}}>
      <Text style={styles.title}>Nama</Text>
      <TextInput
        underlineColorAndroid="grey"
        style={{
          padding: 4,
        }}
        placeholder="Nama"
        value={dataUser.nama}
        onChangeText={(value) => setDataUser({...dataUser, nama: value})}
      />
      <View style={{height: 12}} />
      <Text style={styles.title}>Jabatan</Text>
      <TextInput
        underlineColorAndroid="grey"
        style={{
          padding: 4,
        }}
        placeholder="Jabatan"
        value={dataUser.jabatan}
        onChangeText={(value) => setDataUser({...dataUser, jabatan: value})}
      />
      <View style={{height: 12}} />
      <Text style={styles.title}>Email</Text>
      <TextInput
        underlineColorAndroid="grey"
        style={{
          padding: 4,
        }}
        keyboardType="email-address"
        placeholder="Email"
        value={dataUser.email}
        editable={false}
      />
      <View style={{height: 12}} />
      <Text style={styles.title}>Password Lama</Text>
      <KeyboardAwareScrollView>
        <TextInput
          underlineColorAndroid="grey"
          style={{
            padding: 4,
          }}
          placeholder="Password"
          value={currentPassword}
          onChangeText={(value) => setCurrentPassword(value)}
        />
      </KeyboardAwareScrollView>

      <View style={{height: 12}} />
      <Text style={styles.title}>Password Baru</Text>
      <KeyboardAwareScrollView>
        <TextInput
          underlineColorAndroid="grey"
          style={{
            padding: 4,
          }}
          placeholder="Password"
          value={newPassword}
          onChangeText={(value) => setNewPassword(value)}
        />
      </KeyboardAwareScrollView>

      <View style={{height: 10}} />
      <Button title="SIMPAN" onPress={() => updateUser(userId.uid)} />
    </View>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
});
