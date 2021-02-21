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

const FilterPage = () => {
  const [years, setYears] = useState([]);
  const [dataCuti, setDataCuti] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    // getFilter();
    getYears();
  }, []);

  const getYears = () => {
    let currentYear = new Date().getFullYear();
    let startYear = '';
    let years = [];
    startYear = 2021 - 5 || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    setYears(years);
  };

  const getFilter = () => {
    database()
      .ref('cuti/')
      .orderByChild('start_cuti')
      .on('value', (snapshot) => {
        let data = [];
        snapshot.forEach((c) => {
          let i = c.val();

          if (i.createdAt) {
            console.log(i.createdAt);
            let getYear = i.createdAt.split('-').pop();
            console.log(getYear);
            if (getYear == selectedValue) {
              data.push(i);
              console.log('cuti', i);
            }
          }
        });
        setDataCuti(data);
      });
  };

  console.log('list cuti', dataCuti);
  return (
    <View style={customStyle.container}>
      <View>
        <Picker
          note
          mode="dialog"
          selectedValue={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}>
          <Picker.Item label="Pilih Tahun" value="" />
          {years.map((el, i) => {
            let text = el.toString();
            console.log('isi el', text);
            return <Picker.Item key={i} label={text} value={text} />;
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

export default FilterPage;

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
