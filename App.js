import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.101:19000/api/tasks';

const App = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      axios
        .post(API_URL, { task })
        .then((response) => {
          setTaskList([...taskList, response.data]);
          setTask('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const removeTask = (index, taskId) => {
    axios
      .delete(`${API_URL}/${taskId}`)
      .then(() => {
        const updatedList = [...taskList];
        updatedList.splice(index, 1);
        setTaskList(updatedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        onChangeText={(text) => setTask(text)}
        value={task}
        placeholder="Digite uma tarefa"
      />
      <Button title="Adicionar" onPress={addTask} />
      <FlatList
        data={taskList}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ flex: 1 }}>{item.task}</Text>
            <Button title="Remover" onPress={() => removeTask(index, item.id)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default App;
