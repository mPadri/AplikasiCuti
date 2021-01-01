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
import CardCutiApproval from '../../components/CardCutiApproval';

const ApprovalLeader = ({navigation}) => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [dept, setDept] = useState('');
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
        console.log('cuti data: ', snapshot.val());
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
        console.log('🚀 ~ file: index.js ~ line 59 ~ .then ~ data', data);
        setDept(data.dept);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {loading ? (
        <LoadingPanel />
      ) : (
        <View style={styles.container}>
          {isEmpty ? (
            <EmptyCuti />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {data.map((el, idx) => {
                if (dept == el.dept && el.jabatan == 'Staff') {
                  return (
                    <CardCutiApproval
                      key={idx}
                      id={el._id}
                      userId={el.id_user}
                      nama={el.nama}
                      status={el.status_cuti}
                      dept={el.dept}
                      tglCuti={`${el.start_cuti} s/d ${el.end_cuti}`}
                      cuti={el.jumlah_hari}
                      jenisCuti={el.jenis_cuti}
                      jabatan={el.jabatan}
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

export default ApprovalLeader;
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
  textBtn: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '400',
  },
});
