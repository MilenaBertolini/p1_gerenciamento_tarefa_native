import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const TaskItem = ({ task, onEdit, onDelete }) => {

  const getPriorityColor = (priority) => {

    switch (priority) {
      case 'Alta':
        return '#ff1744';
      case 'Média':
        return '#ff9100';
      case 'Baixa':
        return '#4caf50';
      default:
        return '#000';
    }
  };

  return (
    <View style={styles.item}>

      <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(task.priority) }]} />

      <View style={styles.details}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      <View style={styles.actions}>

        <Pressable onPress={onEdit} style={styles.actionButton}>
          <Text style={styles.actionText}>Editar</Text>
        </Pressable>

        <Pressable onPress={onDelete} style={styles.actionButton}>
          <Text style={styles.actionText}>Excluir</Text>
        </Pressable>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },

  priorityIndicator: {
    width: 10,
    height: '100%',
    marginRight: 10,
  },

  details: {
    flex: 1,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  description: {
    color: '#666',
  },

  actions: {
    flexDirection: 'row',
  },

  actionButton: {
    marginHorizontal: 5,
  },
  
  actionText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});

export default TaskItem;
