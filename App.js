import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  const [name,setName]=useState('')
  const [items,setItems]=useState([])
  const [data,setData]=useState([]);

  const create = async () => {
    try {
      
    const getData=await AsyncStorage.getItem('data');
    await AsyncStorage.setItem('data',JSON.stringify([...JSON.parse(getData),name]));
    alert('Data added');
      
    } catch (error) {
      alert('Data not added');
      console.error('Error saving data:', error);
    }
  }

  const getData=async()=>
  {
    const res=await AsyncStorage.getItem('data');
    setData(JSON.parse(res));
  }

  useEffect(()=>
  {
    getData();
  },[])

  console.log("data is-->", data);

  const update=async(index)=>
  {
    const getData=await AsyncStorage.getItem('data');
    const updateData=JSON.parse(getData);
    updateData[index]=name;
    await AsyncStorage.setItem('data', JSON.stringify(updateData));
    alert('Data updated');
    getData();
  }
  

  
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 20
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20
      }}>This is a crud app</Text>
      
      <View style={{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }}>
        <TextInput 
          placeholder="Enter name"
          value={name}
          onChangeText={(text)=>setName(text)}
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            fontSize: 16
          }}
        />
       
      </View>

      <TouchableOpacity 
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
          alignItems: 'center'
        }}
        onPress={create}
        >
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600'
        }}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App
