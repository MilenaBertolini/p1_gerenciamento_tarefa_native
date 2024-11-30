import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';

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
    setPriority('');

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

      <Text style={styles.textPriority}>Prioridade:</Text>

      <View style={styles.priorityContainer}>
        
        <RadioButton.Group
          onValueChange={value => setPriority(value)}
          value={priority}
        >
          <View style={styles.radioButtonRow}>
            <Text>Alta</Text>
            <RadioButton value="Alta" 
            style={styles.radio}/>
          </View>
          
          <View style={styles.radioButtonRow}>
            <Text>Média</Text>
            <RadioButton value="Média" />
          </View>
          
          <View style={styles.radioButtonRow}>
            <Text>Baixa</Text>
            <RadioButton value="Baixa" />
          </View>
        </RadioButton.Group>
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
    backgroundColor: '#9576FF',
    borderColor: '#9576FF',
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

  priorityContainer: {
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
  },

  textPriority: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 16,
  },

});

export default TaskForm;
