import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import {Picker} from 'native-base';
import CardCuti from '../../components/CardCuti';

const FilterNama = () => {
  const [dataCuti, setDataCuti] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataUsers();
  }, []);

  const getFilter = () => {
    database()
      .ref('cuti/')
      .orderByChild('start_cuti')
      .on('value', (snapshot) => {
        let data = [];
        snapshot.forEach((c) => {
          let i = c.val();
          if (i.nama == selectedValue) {
            data.push(i);
            console.log('cuti', i);
          }
        });
        setDataCuti(data);
      });
  };

  const getDataUsers = () => {
    database()
      .ref('/users')
      .on('value', (snapshot) => {
        const items = Array.from(Object.values(snapshot.val()));
        let data = [];
        items.map((el) => {
          if (el.status == 'aktif') {
            data.push(el.nama);
          }
        });
        setData(data);
      });
  };

  return (
    <View style={customStyle.container}>
      <View>
        <Picker
          note
          mode="dialog"
          selectedValue={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}>
          <Picker.Item label="Pilih Nama Karyawan" value="" />
          {data.map((el, i) => {
            return <Picker.Item key={i} label={el} value={el} />;
          })}
        </Picker>
        <TouchableOpacity style={customStyle.btn} onPress={() => getFilter()}>
          <Text style={customStyle.textBtn}>Cari</Text>
        </TouchableOpacity>
        <View style={{height: 24}} />
        <ScrollView>
          {dataCuti.map((el, i) => {
            return (
              <CardCuti
                key={i}
                id={el._id}
                userId={el.id_user}
                nama={el.nama}
                status={el.status_cuti}
                dept={el.dept}
                tglCuti={`${el.start_cuti} s/d ${el.end_cuti}`}
                cuti={el.jumlah_hari}
                jenisCuti={el.jenis_cuti}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default FilterNama;

const customStyle = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f6f0',
    flex: 1,
    justifyContent: 'flex-start',
  },
  btn: {
    backgroundColor: '#009bd4',
    width: 64,
    padding: 8,
    borderRadius: 5,
    elevation: 2,
    marginTop: 16,
  },
  textBtn: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
