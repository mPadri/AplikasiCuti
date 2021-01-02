import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigations';
import {Provider} from 'react-redux';
import {store} from './src/redux/reducers/DataUser';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
