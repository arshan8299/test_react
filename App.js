import React from 'react';
import { View, Text } from 'react-native';
import Test2 from './Test2';
import { TestContextProvider } from './context/TestContext';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    // Uncomment the Redux provider if needed
    <Provider store={store}>
      <TestContextProvider>
        <View style={{ flex: 1 }}>
          <Test2 />
        </View>
      </TestContextProvider>
    </Provider>
  );
};

export default App;
