import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardCuti from '../../components/CardCuti';
import database from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';
import LoadingPanel from '../../components/LoadingPanel';
import EmptyCuti from '../../components/EmptyCuti';

const Cuti = ({navigation}) => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [jabatan, setJabatan] = useState('');
  const user = Auth().currentUser;
  const isEmpty = data.length == 0;

  useEffect(() => {
    getDataCuti();
    getCurrentUser();

    if (user) {
      setUserId(user.uid);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      getDataCuti();
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const getDataCuti = () => {
    database()
      .ref('/cuti')
      .on('value', (snapshot) => {
        const items = Array.from(Object.values(snapshot.val()));
        setData(items);
        setLoading(false);
      });
  };

  const getCurrentUser = () => {
    database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then((snapshot) => {
        let data = snapshot.val();
        setJabatan(data.jabatan);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {loading ? (
        <LoadingPanel />
      ) : (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity
              style={styles.btnAjukan}
              onPress={() => navigation.navigate('AjukanCuti')}>
              <Text style={styles.textBtn}>Ajukan Cuti</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCutiKaryawan}
              onPress={() => navigation.navigate('CutiKaryawan')}>
              <Text style={styles.textBtn}>Cuti Karyawan</Text>
            </TouchableOpacity>
            {jabatan == 'Leader' || jabatan == 'Operation' ? (
              <TouchableOpacity
                style={styles.btnCutiApproval}
                onPress={() =>
                  jabatan == 'Operation'
                    ? navigation.navigate('ApprovalOpt')
                    : navigation.navigate('ApprovalLeader')
                }>
                <Text style={styles.textBtn}>Approval Cuti</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{height: 24}} />
          {isEmpty ? (
            <EmptyCuti />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {data.map((el, idx) => {
                if (user.uid == el.id_user) {
                  return (
                    <CardCuti
                      key={idx}
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
                }
              })}
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
};

export default Cuti;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  btnAjukan: {
    backgroundColor: 'salmon',
    width: '25%',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    elevation: 4,
  },
  btnCutiKaryawan: {
    backgroundColor: 'skyblue',
    width: '35%',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    elevation: 4,
    marginLeft: 6,
  },
  btnCutiApproval: {
    backgroundColor: 'grey',
    width: '35%',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    elevation: 4,
    marginLeft: 6,
  },
  textBtn: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '400',
    fontSize: 12,
  },
});
