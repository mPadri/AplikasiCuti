import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showMessage} from 'react-native-flash-message';

const TambahUser = ({navigation}) => {
  const [dataUser, setDataUser] = useState({
    nama: '',
    jabatan: '',
    dept: '',
    jenis_kelamin: 'Laki-laki',
    cutiTahunan: '12',
    status: 'aktif',
    _id: '',
    email: '',
    password: '',
  });

  const tambahData = (email, password) => {
    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('tambahData -> res', res);
        let tahun = new Date().getFullYear();
        const data = {
          nama: dataUser.nama,
          jabatan: dataUser.jabatan,
          dept: dataUser.dept,
          jenis_kelamin: dataUser.jenis_kelamin,
          cutiTahunan: dataUser.cutiTahunan,
          status: dataUser.status,
          _id: res.user.uid,
          email: email,
          expCuti: tahun,
        };
        database()
          .ref(`/users/${res.user.uid}`)
          .set(data)
          .then((resDB) => {
            const clearData = {
              nama: '',
              jabatan: '',
              dept: '',
              jenis_kelamin: 'Laki-laki',
              cutiTahunan: '12',
              status: 'aktif',
              _id: '',
              email: '',
              password: '',
            };
            setDataUser(clearData);
            navigation.goBack();
            showMessage({message: 'Success added !', type: 'success'});
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={{margin: 12}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Nama</Text>
        <TextInput
          underlineColorAndroid="grey"
          style={{
            padding: 4,
          }}
          value={dataUser.nama}
          onChangeText={(value) => setDataUser({...dataUser, nama: value})}
        />
        <Text style={styles.title}>Jenis kelamin</Text>
        <View style={{height: 6}} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              backgroundColor:
                dataUser.jenis_kelamin == 'Laki-laki' ? 'skyblue' : '#eaeaea',
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4,
            }}
            onPress={() =>
              setDataUser({...dataUser, jenis_kelamin: 'Laki-laki'})
            }>
            <Text style={{fontSize: 10}}>Laki-laki</Text>
          </TouchableOpacity>
          <View style={{width: 15}} />
          <TouchableOpacity
            style={{
              backgroundColor:
                dataUser.jenis_kelamin == 'Perempuan' ? 'pink' : '#eaeaea',
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4,
            }}
            onPress={() =>
              setDataUser({...dataUser, jenis_kelamin: 'Perempuan'})
            }>
            <Text style={{fontSize: 10}}>Perempuan</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 6}} />
        <Text style={styles.title}>Jabatan</Text>
        <TextInput
          underlineColorAndroid="grey"
          style={{
            padding: 4,
          }}
          value={dataUser.jabatan}
          onChangeText={(value) => setDataUser({...dataUser, jabatan: value})}
        />
        <Text style={styles.title}>Departemen</Text>
        <TextInput
          underlineColorAndroid="grey"
          style={{
            padding: 4,
          }}
          value={dataUser.dept}
          onChangeText={(value) => setDataUser({...dataUser, dept: value})}
        />
        <Text style={styles.title}>Cuti Tahunan</Text>
        <TextInput
          underlineColorAndroid="grey"
          style={{
            width: 35,
            padding: 4,
          }}
          keyboardType="number-pad"
          value={dataUser.cutiTahunan}
          onChangeText={(value) =>
            setDataUser({...dataUser, cutiTahunan: value})
          }
        />
        <Text style={styles.title}>Email</Text>
        <TextInput
          underlineColorAndroid="grey"
          style={{
            padding: 4,
          }}
          keyboardType="email-address"
          value={dataUser.email}
          onChangeText={(value) => setDataUser({...dataUser, email: value})}
        />
        <Text style={styles.title}>Password</Text>
        <KeyboardAwareScrollView>
          <TextInput
            underlineColorAndroid="grey"
            style={{
              padding: 4,
            }}
            value={dataUser.password}
            onChangeText={(value) =>
              setDataUser({...dataUser, password: value})
            }
          />
        </KeyboardAwareScrollView>

        <View style={{height: 10}} />
        <Button
          title="SIMPAN"
          onPress={() => tambahData(dataUser.email, dataUser.password)}
        />
      </ScrollView>
    </View>
  );
};

export default TambahUser;
const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
});
