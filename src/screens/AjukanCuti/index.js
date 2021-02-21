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
import {showMessage} from 'react-native-flash-message';
import LoadingPanel from '../../components/LoadingPanel';

const AjukanCuti = ({navigation}) => {
  const [selected, setSelected] = useState('Cuti Tahunan');
  const [dateAkhir, setDateAkhir] = useState('');
  const [dateAwal, setDateAwal] = useState('');
  const [loading, setLoading] = useState(true);
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
    // setTimeout(()=>{

    // },3000)
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
        setLoading(false);
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
        makeUid();
      })
      .catch((err) => console.log(err));
  };

  const getTotalHari = () => {
    let date1 = new Date(dateAwal);
    let date2 = new Date(dateAkhir);
    let diff = (date2 - date1) / 1000;
    diff = Math.abs(Math.floor(diff));

    let days = Math.floor(diff / (24 * 60 * 60) + 1);
    if (days <= cuti) {
      let sisaCuti = cuti - days;
      if (sisaCuti >= 0) {
        addCuti(days, sisaCuti);
      } else {
        // alert('cuti anda sudah habis');
        showMessage({
          message: 'Cuti anda sudah habis !',
          type: 'danger',
        });
      }
    } else {
      // alert('cuti anda tidak cukup');
      showMessage({
        message: 'Cuti anda tidak cukup !',
        type: 'danger',
      });
    }
  };

  const addCuti = (days) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    let data = {
      _id: cutiUid,
      id_user: dataUser.uid,
      nama: dataUser.nama,
      jabatan: dataUser.jabatan,
      dept: dataUser.dept,
      jumlah_hari: days,
      start_cuti: dateAwal,
      end_cuti: dateAkhir,
      status_cuti: 'PROCESS',
      jenis_cuti: selected,
      createdAt: today,
    };

    database()
      .ref(`/cuti/${cutiUid}`)
      .set(data)
      .then(() => {
        navigation.goBack();
        showMessage({message: 'Success !', type: 'success'});
      })
      .catch((err) => showMessage({message: 'Failed !', type: 'danger'}));
  };

  const onSubmit = () => {
    if (dateAwal && dateAkhir) {
      getTotalHari();
    } else {
      alert('inputan tidak terisi');
    }
  };

  console.log('cutiUID', cutiUid);
  return (
    <>
      {loading ? (
        <LoadingPanel />
      ) : (
        <View style={{margin: 12}}>
          {dataUser.jenis_kelamin == 'Perempuan' && (
            <TouchableOpacity
              style={styles.btnCutiHamil}
              onPress={() => navigation.navigate('AjukanCutiHamil')}>
              <Text style={styles.textBtnHamil}>Ajukan Cuti Hamil</Text>
            </TouchableOpacity>
          )}
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
              <Text style={styles.title}>Awal Cuti</Text>

              <DatePicker
                date={dateAwal}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={new Date()}
                onDateChange={(newDate) => setDateAwal(newDate)}
              />
            </View>
            <View>
              <Text style={styles.title}>Akhir Cuti</Text>

              <DatePicker
                date={dateAkhir}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={new Date()}
                onDateChange={(newDate) => setDateAkhir(newDate)}
              />
            </View>
          </View>

          <View style={{height: 12}} />
          <Text style={styles.title}>Jenis Cuti</Text>
          {/* <Picker
          note
          mode="dialog"
          selectedValue={selected}
          onValueChange={(value) => setSelected(value)}>
          <Picker.Item label="Cuti Tahunan" value="Cuti Tahunan" />
          <Picker.Item label="Cuti Hamil" value="Cuti Hamil" />
        </Picker> */}
          <TextInput
            underlineColorAndroid="grey"
            style={{
              padding: 4,
            }}
            value={selected}
            editable={false}
          />

          <View style={{height: 10}} />
          <Button color="#CD9543" title="SIMPAN" onPress={() => onSubmit()} />
        </View>
      )}
    </>
  );
};

export default AjukanCuti;

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
  },
  btnCutiHamil: {
    backgroundColor: 'grey',
    width: '30%',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  textBtnHamil: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
