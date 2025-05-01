import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert ,FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Trash2, Edit2 } from 'lucide-react-native' // Make sure to install lucide-react-native

const Test1 = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [isEditing,setIsEditing] = useState(false);
    const [editingIndex,setEditingIndex] = useState(null);
 

    const add=()=>
    {
        if(isEditing)
        {
            const newData=[...data];
            newData[editingIndex]=title;
            setData(newData);
            setIsEditing(false);
            setEditingIndex(null);
            alert("data updated success");
        }
        else
        {
            setData([...data,title]);
        setTitle('');
        }
    }

    const remove=(idx)=>
    {
        setData(data.filter((_,i)=>i!==idx));
        alert("data removed success");

    }

    const handleUpdate=(title,idx)=>
    {
        setTitle(title);
        setIsEditing(true);
        setEditingIndex(idx)


    }
  

  



    return (
        <View style={{
            flex: 1,
            backgroundColor: '#F8FAFC',
            padding: 20,
            paddingTop: StatusBar.currentHeight + 20
        }}>
            {/* <Text>Hello {value}</Text> */}
            {/* Input Container */}
            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 4,
                shadowColor: '#64748B',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 4,
                marginBottom: 20
            }}>
                <TextInput
                    placeholder='Enter title'
                    value={title}
                    onChangeText={setTitle}
                    style={{
                        padding: 16,
                        fontSize: 16,
                        color: '#1E293B'
                    }}
                    placeholderTextColor="#94A3B8"
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
                style={{
                    backgroundColor: '#4F46E5',
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginBottom: 32,
                    shadowColor: '#4F46E5',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 4
                }}
                onPress={add}
            >
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '600'
                }}>
                    Submit
                </Text>
            </TouchableOpacity>

            {/* Data Container */}
            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 20,
                shadowColor: '#64748B',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 4,
                flex: 1
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1E293B',
                    marginBottom: 16
                }}>
                    Recent Data
                </Text>

                
                <FlatList
                data={data}
                renderItem={({item,index})=>
                (
                    <View key={index} style={{
                        backgroundColor: '#F8FAFC',
                        padding: 16,
                        borderRadius: 12,
                        marginBottom: 12,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#334155',
                                flex: 1
                            }}>
                                {item}
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                gap: 12
                            }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#EEF2FF',
                                        padding: 8,
                                        borderRadius: 8
                                    }}
                                    onPress={()=>handleUpdate(item, index)}

                                >
                                    <Edit2 size={18} color="#4F46E5" />
                                </TouchableOpacity>
                                <TouchableOpacity

                                    style={{
                                        backgroundColor: '#FEE2E2',
                                        padding: 8,
                                        borderRadius: 8
                                    }}
                                    onPress={()=>remove(index)}
                                >
                                    <Trash2 size={18} color="#DC2626" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                />
            </View>
        </View>
    )
}

export default Test1
