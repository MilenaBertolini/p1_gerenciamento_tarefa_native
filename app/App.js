import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput, Pressable } from 'react-native';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null); 
  const [sortOrder, setSortOrder] = useState('desc');

  const addOrEditTask = (name, description, priority) => {

    if (isEditing !== null) {

      const updatedTasks = tasks.map((task, index) =>
        index === isEditing ? { ...task, name, description, priority } : task
      );

      setTasks(updatedTasks);
      setIsEditing(null);

    } else {

      setTasks([...tasks, { name, description, priority }]);
    }
  };

  const deleteTask = (index) => {

    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const sortedTasks = [...tasks].sort((a, b) => {

    const priorities = { Alta: 3, Média: 2, Baixa: 1 };

    return sortOrder === 'desc'
      ? priorities[b.priority] - priorities[a.priority]
      : priorities[a.priority] - priorities[b.priority];

  });

  return (

    <View style={styles.container}>

      <TaskForm addOrEditTask={addOrEditTask} taskToEdit={isEditing !== null ? tasks[isEditing] : null} />

      <Pressable style={styles.sortButton} onPress={toggleSortOrder}>
        <Text style={styles.buttonText}>
          Ordenar por prioridade ({sortOrder === 'desc' ? 'Maior → Menor' : 'Menor → Maior'})
        </Text>
      </Pressable>
      
      <FlatList
        data={sortedTasks}
        renderItem={({ item, index }) => (
          <TaskItem
            task={item}
            onEdit={() => setIsEditing(index)}
            onDelete={() => deleteTask(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f8',
  },

  sortButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
  },
  
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;