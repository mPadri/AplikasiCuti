import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';

const CardCuti = ({
  nama,
  status,
  dept,
  tglCuti,
  cuti,
  jenisCuti,
  id,
  userId,
}) => {
  const user = Auth().currentUser;
  const [jabatan, setJabatan] = useState('');

  useEffect(() => {
    getCurrentUser();
  }, []);
  const handleAccept = (id, userId) => {
    Alert.alert(
      'ACCEPT',
      'Apakah Anda Yakin ?',
      [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => {
            database()
              .ref(`/cuti/`)
              .child(id)
              .update({status_cuti: 'APPROVED'})
              .then(() => {
                updateCutiUser(userId);
              })
              .catch((err) => console.log(err));
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  const handleReject = (id) => {
    Alert.alert(
      'REJECT',
      'Apakah Anda Yakin ?',
      [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: () => {
            database()
              .ref(`/cuti/`)
              .child(id)
              .update({status_cuti: 'UNAPPROVED'})
              .then(() => {
                console.log('Rejected');
              })
              .catch((err) => console.log(err));
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const updateCutiUser = (userId) => {
    database()
      .ref(`users/${userId}`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        let sisaCuti = data.cutiTahunan - cuti;

        database()
          .ref(`/users/`)
          .child(userId)
          .update({cutiTahunan: sisaCuti})
          .then(() => {
            console.log('update');
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const getCurrentUser = () => {
    database()
      .ref(`users/${user.uid}`)
      .once('value')
      .then((snapshot) => {
        let data = snapshot.val();
        console.log('🚀 ~ file: index.js ~ line 60 ~ .then ~ data', data);
        setJabatan(data.jabatan);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.wrapTitle}>
          <Text>{nama}</Text>
          <Text>{status}</Text>
        </View>
        <Text style={styles.textDept}>{dept}</Text>
        <View style={styles.wrapCuti}>
          <Text style={styles.textCuti}>{tglCuti}</Text>
          <Text style={styles.textCuti}>{cuti} Hari</Text>
        </View>
        <Text style={styles.textJenisCuti}>{jenisCuti}</Text>
      </View>
      <View style={{height: 12}} />
    </>
  );
};

export default CardCuti;

const styles = StyleSheet.create({
  textBtn: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '400',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 6,
    elevation: 2,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapCuti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDept: {
    fontSize: 12,
    color: 'grey',
    marginVertical: 4,
  },
  textCuti: {
    fontSize: 11,
    marginVertical: 4,
  },
  textJenisCuti: {
    fontSize: 12,
  },
  wrapBtnApprov: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnAccept: {
    backgroundColor: 'pink',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  btnReject: {
    backgroundColor: 'skyblue',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
