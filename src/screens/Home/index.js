import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import LoadingPanel from '../../components/LoadingPanel';
import {showMessage} from 'react-native-flash-message';

const Home = ({navigation}) => {
  // const dataUser = useSelector((state) => {
  //   return state.dataUser;
  // });

  const [user, setUser] = useState('');
  console.log('🚀 ~ file: index.js ~ line 20 ~ Home ~ user', user);
  const [loading, setLoading] = useState(true);

  const currentUser = Auth().currentUser;
  useEffect(() => {
    getCurrentUser();
    // resetCuti(2020);

    const unsubscribe = navigation.addListener('focus', () => {
      getCurrentUser();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const getCurrentUser = () => {
    database()
      .ref(`users/${currentUser.uid}`)
      .once('value')
      .then((snapshot) => {
        let data = snapshot.val();
        let tahun = new Date().getFullYear();

        if (data.expCuti !== tahun) {
          database()
            .ref(`/users/`)
            .child(currentUser.uid)
            .update({cutiTahunan: 12, expCuti: tahun})
            .then(() => {
              // console.log('update reset');
              // setUser(snapshot.val());
              getCurrentUser();
            })
            .catch((err) => console.log(err));
        } else {
          setUser(snapshot.val());
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const doSignOut = () => {
    Alert.alert(
      'Log out',
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
            Auth()
              .signOut()
              .then(() => {
                // console.log('User signed out!');
                navigation.replace('Login');
                showMessage({
                  message: 'Anda telah signed out !',
                  type: 'success',
                });
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  return (
    <>
      {loading ? (
        <LoadingPanel />
      ) : (
        <View style={styles.container}>
          <View style={{margin: 16}}>
            <View style={styles.wrapBtn}>
              <TouchableOpacity
                style={styles.btnLogout}
                onPress={() => doSignOut()}>
                <Text style={styles.btnTitle}>LOG OUT</Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 60}} />
            <View style={styles.wrapDesc}>
              <Text style={styles.greeting}>Hai,</Text>
              <Text style={styles.nama}>{user.nama}</Text>
              <Text style={styles.dept}>{user.dept}</Text>
              <View style={{height: 30}} />
              <Text style={{color: 'black'}}>
                Sisa Cuti Anda : {user.cutiTahunan} Hari
              </Text>
              <View style={{height: 30}} />
              <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.btnTitle}>EDIT PROFILE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapBtn: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  btnLogout: {
    backgroundColor: 'salmon',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: -16,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    elevation: 2,
  },
  btnTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  wrapDesc: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 18,
  },
  nama: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dept: {
    fontSize: 14,
    color: 'grey',
  },
  btnEdit: {
    backgroundColor: 'green',
    width: '25%',
    padding: 4,
    borderRadius: 5,
    elevation: 2,
  },
});
