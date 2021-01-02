import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import database from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';
import CardUser from '../../components/CardUser';
import LoadingPanel from '../../components/LoadingPanel';
import {showMessage} from 'react-native-flash-message';

const User = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const user = Auth().currentUser;

  useEffect(() => {
    const getData = database()
      .ref('/users')
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
        const items = Array.from(Object.values(snapshot.val()));
        setData(items);
        setLoading(false);
      });

    if (user) {
      // console.log('User email: ', user.uid);
      setCurrentUserId(user.uid);
    }
  }, []);

  const deleteUser = (userId) => {
    database()
      .ref(`/users/`)
      .child(userId)
      .update({status: 'tidak-aktif'})
      .then(() => {
        // console.log('update');
        setLoading(false);
        showMessage({message: 'Success deleted !', type: 'success'});
      })
      .catch((err) => console.log(err));
  };

  console.log(data);
  // console.log('data item', dataItem);
  return (
    <>
      {loading ? (
        <LoadingPanel />
      ) : (
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <View style={{height: 24}} />
          <View style={{margin: 8}}>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() => navigation.navigate('TambahUser')}>
              <Text style={styles.btnTitle}>ADD USER</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item, i) => {
              // console.log('User -> id', item._id);
              if (item.status === 'aktif' && item._id !== currentUserId) {
                return (
                  <CardUser
                    key={i}
                    nama={item.nama}
                    jabatan={item.dept}
                    sisaCuti={item.cutiTahunan}
                    onPress={() => deleteUser(item._id)}
                  />
                );
              }
              return <View key={i} />;
            })}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default User;
const styles = StyleSheet.create({
  btnAdd: {
    backgroundColor: 'skyblue',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
    width: '30%',
  },
  btnTitle: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});
