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
import {Picker} from 'native-base';

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
  const [listJabatan, setListJabatan] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);

  useEffect(() => {
    getListJabatan();
    getListDepartment();
  }, []);

  const getListJabatan = () => {
    database()
      .ref(`jabatan/`)
      .once('value')
      .then((snapshot) => {
        let data = snapshot.val();
        let arr = Object.values(data);
        setListJabatan(arr);
      })
      .catch((err) => console.log(err));
  };
  const getListDepartment = () => {
    database()
      .ref(`department/`)
      .once('value')
      .then((snapshot) => {
        let data = snapshot.val();
        let arr = Object.values(data);
        setListDepartment(arr);
      })
      .catch((err) => console.log(err));
  };

  const tambahData = (email, password) => {
    console.log('isi data', dataUser);
    if (
      dataUser.nama &&
      dataUser.jabatan &&
      dataUser.dept &&
      dataUser.cutiTahunan &&
      dataUser.email &&
      dataUser.password
    ) {
      Auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
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
              showMessage({
                message: 'Success added !',
                type: 'success',
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      showMessage({
        message: 'Silahkan Lengkapi Data Anda !',
        type: 'danger',
      });
    }
  };
  console.log('selected', dataUser.jabatan);
  console.log('list', listJabatan);
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

        <Picker
          note
          mode="dialog"
          selectedValue={dataUser.jabatan}
          onValueChange={(value) => setDataUser({...dataUser, jabatan: value})}>
          <Picker.Item label="Pilih Jabatan" value="" />
          {/* {listJabatan.map((el) => {
            console.log(el);
            return <Picker.Item key={el._id} label={el.nama} value={el.nama} />;
          })} */}
        </Picker>
        <Text style={styles.title}>Departemen</Text>

        <Picker
          note
          mode="dialog"
          selectedValue={dataUser.dept}
          onValueChange={(value) => setDataUser({...dataUser, dept: value})}>
          <Picker.Item label="Pilih Department" value="" />
          {listDepartment.map((el) => {
            return <Picker.Item key={el._id} label={el.nama} value={el.nama} />;
          })}
        </Picker>
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
            secureTextEntry={true}
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
          color="#CD9543"
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
