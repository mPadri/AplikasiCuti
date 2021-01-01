import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CardUser = ({nama, jabatan, sisaCuti, onPress}) => {
  return (
    <View
      style={{
        elevation: 2,
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 5,
        padding: 5,
      }}>
      <View>
        <View>
          <Text>{nama}</Text>
        </View>
        <Text style={{fontSize: 12, color: 'grey'}}>{jabatan}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              paddingVertical: 2,
              paddingHorizontal: 4,
              borderRadius: 5,
            }}
            onPress={onPress}>
            <Text style={{fontSize: 12, color: '#fff'}}>DELETE</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 12, fontWeight: '400'}}>
          Sisa Cuti : {sisaCuti}
        </Text>
      </View>
    </View>
  );
};

export default CardUser;
