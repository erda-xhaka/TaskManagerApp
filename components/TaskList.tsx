import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Task } from '../types/task';
import { format } from 'date-fns';
import { CircleCheck as CheckCircle2, Circle, Calendar, Clock, Tag, Trash2 } from 'lucide-react-native';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return a.completed ? 1 : -1;
  });

  const handleDelete = (taskId: string, taskTitle: string) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${taskTitle}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDeleteTask(taskId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      {sortedTasks.map((task) => (
        <View
          key={task.id}
          style={[
            styles.taskItem,
            task.completed && styles.completedTask,
          ]}
        >
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => onToggleTask(task.id)}
          >
            {task.completed ? (
              <CheckCircle2 size={24} color="#6366F1" />
            ) : (
              <Circle size={24} color="#94A3B8" />
            )}
          </TouchableOpacity>
          
          <View style={styles.taskContent}>
            <View style={styles.taskHeader}>
              <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
                {task.title}
              </Text>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDelete(task.id, task.title)}
              >
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.taskDescription}>{task.description}</Text>
            
            <View style={styles.taskMetaContainer}>
              <View style={styles.metaItem}>
                <Tag size={16} color="#94A3B8" />
                <Text style={styles.metaText}>{task.category}</Text>
              </View>
              
              <View style={styles.metaItem}>
                <Calendar size={16} color="#94A3B8" />
                <Text style={styles.metaText}>
                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </Text>
              </View>

              <View style={[
                styles.priorityBadge,
                { backgroundColor: task.priority === 'low' ? '#10B981' : task.priority === 'medium' ? '#F59E0B' : '#EF4444' }
              ]}>
                <Clock size={14} color="white" />
                <Text style={styles.priorityText}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  completedTask: {
    opacity: 0.7,
    backgroundColor: '#0F172A',
  },
  checkbox: {
    marginRight: 12,
    justifyContent: 'center',
    padding: 4,
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#F8FAFC',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
    marginBottom: 12,
  },
  taskMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  priorityText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: 'white',
  },
});