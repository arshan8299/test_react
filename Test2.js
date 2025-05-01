import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { TestContext } from './context/TestContext'
import { useSelector } from 'react-redux'


const Test2 = () => {
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  // const {value}=useContext(TestContext);
  // console.log("value context is-->", value)
  const value2=useSelector((state)=>state.counter.value);
  console.log("value 2 is-->", value2);

//   const value=useSelector((state)=>state.counter.value);
//   console.log("value is-->", value);


  const create = async () => {
    try {
      if (!name.trim()) {
        alert('Please enter a name')
        return
      }

      const existingData = await AsyncStorage.getItem('data')
      const currentData = existingData ? JSON.parse(existingData) : []
      await AsyncStorage.setItem('data', JSON.stringify([...currentData, name.trim()]))
      
      setName('')
      getData()
      alert('Data added')
    } catch (error) {
      alert('Data not added')
      console.error('Error saving data:', error)
    }
  }

  const getData = async () => {
    try {
      const res = await AsyncStorage.getItem('data')
      setData(res ? JSON.parse(res) : [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const update = async () => {
    try {
      if (!name.trim()) {
        alert('Please enter a name')
        return
      }

      const updatedData = [...data]
      updatedData[editIndex] = name.trim()
      await AsyncStorage.setItem('data', JSON.stringify(updatedData))
      
      setName('')
      setIsEditing(false)
      setEditIndex(null)
      getData()
      alert('Data updated')
    } catch (error) {
      alert('Update failed')
      console.error('Error updating data:', error)
    }
  }

  const deleteItem = async (index) => {
    try {
      const updatedData = data.filter((_, i) => i !== index)
      await AsyncStorage.setItem('data', JSON.stringify(updatedData))
      getData()
      alert('Data deleted')
    } catch (error) {
      alert('Delete failed')
      console.error('Error deleting data:', error)
    }
  }

  const handleEdit = (item, index) => {
    setName(item)
    setIsEditing(true)
    setEditIndex(index)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
   
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 20 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center',
          marginVertical: 20
        }}>CRUD App</Text>
        
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
            onChangeText={(text) => setName(text)}
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
            backgroundColor: isEditing ? '#28a745' : '#007AFF',
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
            alignItems: 'center'
          }}
          onPress={isEditing ? update : create}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600'
          }}>{isEditing ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>

        {/* Display Items */}
        {data.map((item, index) => (
          <View key={index} style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3
          }}>
            <Text style={{ fontSize: 16 }}>{item}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity 
                onPress={() => handleEdit(item, index)}
                style={{
                  backgroundColor: '#ffc107',
                  padding: 8,
                  borderRadius: 5,
                  marginRight: 10
                }}
              >
                <Text style={{ color: 'white' }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => deleteItem(index)}
                style={{
                  backgroundColor: '#dc3545',
                  padding: 8,
                  borderRadius: 5
                }}
              >
                <Text style={{ color: 'white' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Test2
