import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

const TaskForm = ({ addOrEditTask, taskToEdit }) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Média');

  useEffect(() => {

    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    }

  }, [taskToEdit]);

  const handleSubmit = () => {

    if (!name.trim()) return; 
    addOrEditTask(name, description, priority);
    setName('');
    setDescription('');
    setPriority('Média');

  };

  return (

    <View style={styles.form}>

      <TextInput
        style={styles.input}
        placeholder="Nome da Tarefa"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição da Tarefa"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.priorityGroup}>

        {['Alta', 'Média', 'Baixa'].map((level) => (
          <Pressable
            key={level}
            style={[styles.priorityButton, priority === level && styles.prioritySelected]}
            onPress={() => setPriority(level)}
          >
            <Text style={styles.priorityText}>{level}</Text>
          </Pressable>
        ))}

      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>{taskToEdit ? 'Salvar' : 'Adicionar'}</Text>
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  priorityGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  prioritySelected: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    marginTop: 10,
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TaskForm;
