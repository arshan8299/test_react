import React, { createContext, useState } from 'react';
import { View, Text } from 'react-native';

// 1. Create the context
export const TestContext = createContext();

// 2. Create the provider component
export const TestContextProvider = ({ children }) => {
  const [value, setValue] = useState(10);

  const increment = () => {
    setValue(prev => prev + 1);
  };

  const decrement = () => {
    setValue(prev => prev - 1);
  };

  return (
    <TestContext.Provider value={{ value, increment, decrement }}>
      {children}
    </TestContext.Provider>
  );
};
