import {Picker} from 'native-base';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-datepicker';
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

const AjukanCutiHamil = ({navigation}) => {
  const [selected, setSelected] = useState('Cuti Hamil');
  const [dateAkhir, setDateAkhir] = useState('');
  const [dateAwal, setDateAwal] = useState('');
  const [dataUser, setDataUser] = useState({
    uid: '',
    nama: '',
    jabatan: '',
    dept: '',
    jenis_kelamin: '',
  });
  const [cuti, setCuti] = useState(0);
  const [cutiUid, setCutiUid] = useState('');
  const userId = Auth().currentUser;

  useEffect(() => {
    getCurrentUser();
    makeUid();
  }, []);

  const makeUid = () => {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 9; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCutiUid(result);
  };

  const getCurrentUser = () => {
    database()
      .ref(`users/${userId.uid}`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        let user = {
          uid: data._id,
          nama: data.nama,
          jabatan: data.jabatan,
          dept: data.dept,
          jenis_kelamin: data.jenis_kelamin,
        };
        setDataUser(user);
        setCuti(data.cutiTahunan);
      })
      .catch((err) => console.log(err));
  };

  const getTotalHari = () => {
    let date = new Date(dateAwal);
    // add a day
    let tgl = date.setDate(date.getDate() + 90);
    let a = new Date(tgl);
    let days = a.toISOString().substr(0, 10);

    // if (days <= cuti) {
    //   let sisaCuti = cuti - days;
    //   if (sisaCuti >= 0) {
    addCuti(days);
    //   } else {
    //     alert('cuti anda sudah habis');
    //   }
    // } else {
    //   alert('cuti anda tidak cukup');
    // }
  };

  const addCuti = (days) => {
    let data = {
      _id: cutiUid,
      id_user: dataUser.uid,
      nama: dataUser.nama,
      jabatan: dataUser.jabatan,
      dept: dataUser.dept,
      jumlah_hari: 90,
      start_cuti: dateAwal,
      end_cuti: days,
      status_cuti: 'PENDING',
      jenis_cuti: selected,
    };

    database()
      .ref(`/cuti/${cutiUid}`)
      .set(data)
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = () => {
    getTotalHari();
    // if (dateAwal && dateAkhir) {
    //   getTotalHari();
    // } else {
    //   alert('inputan tidak terisi');
    // }
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
        editable={false}
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
        editable={false}
      />
      <View style={{height: 12}} />
      <Text style={styles.title}>Departmen</Text>
      <TextInput
        underlineColorAndroid="grey"
        style={{
          padding: 4,
        }}
        placeholder="Departmen"
        value={dataUser.dept}
        editable={false}
      />
      <View style={{height: 12}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.title}>Tangga Cuti</Text>

          <DatePicker
            date={dateAwal}
            mode="date"
            placeholder="select date"
            format="YYYY/MM/DD"
            minDate={new Date()}
            onDateChange={(newDate) => setDateAwal(newDate)}
          />
        </View>
        {/* <View>
          <Text style={styles.title}>Akhir Cuti</Text>

          <DatePicker
            date={dateAkhir}
            mode="date"
            placeholder="select date"
            format="YYYY/MM/DD"
            minDate={new Date()}
            onDateChange={(newDate) => setDateAkhir(newDate)}
          />
        </View> */}
      </View>

      <View style={{height: 12}} />
      <Text style={styles.title}>Jenis Cuti</Text>
      <TextInput
        underlineColorAndroid="grey"
        style={{
          padding: 4,
        }}
        value={selected}
        editable={false}
      />

      <View style={{height: 10}} />
      <Button title="SIMPAN" onPress={() => onSubmit()} />
    </View>
  );
};

export default AjukanCutiHamil;

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
});
