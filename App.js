import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigations';
import {Provider} from 'react-redux';
import {store} from './src/redux/reducers/DataUser';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
