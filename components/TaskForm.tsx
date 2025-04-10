import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { format } from 'date-fns';
import { Calendar, Clock, Tag, CircleAlert as AlertCircle } from 'lucide-react-native';

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    category: string;
  }) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    onSubmit({
      title,
      description,
      dueDate,
      priority,
      category,
    });

    setTitle('');
    setDescription('');
    setDueDate(format(new Date(), 'yyyy-MM-dd'));
    setPriority('medium');
    setCategory('');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      />
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.inputContainer}>
          <Tag size={20} color="#94A3B8" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { paddingLeft: 40 }]}
            placeholder="Category (e.g., Study, Project)"
            value={category}
            onChangeText={setCategory}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.inputContainer}>
          <Calendar size={20} color="#94A3B8" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { paddingLeft: 40 }]}
            placeholder="Due Date (YYYY-MM-DD)"
            value={dueDate}
            onChangeText={setDueDate}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.priorityContainer}>
          <Text style={styles.label}>Priority Level</Text>
          <View style={styles.priorityButtons}>
            {(['low', 'medium', 'high'] as const).map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  priority === p && styles.priorityButtonActive,
                  { backgroundColor: p === 'low' ? '#10B981' : p === 'medium' ? '#F59E0B' : '#EF4444' },
                ]}
                onPress={() => setPriority(p)}
              >
                <AlertCircle size={16} color="white" style={styles.priorityIcon} />
                <Text style={styles.priorityButtonText}>{p.charAt(0).toUpperCase() + p.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Clock size={20} color="white" style={styles.submitIcon} />
          <Text style={styles.submitButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
  },
  formContent: {
    padding: 24,
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 12,
    color: '#F8FAFC',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
    color: '#F8FAFC',
    fontSize: 16,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    opacity: 0.8,
  },
  priorityButtonActive: {
    opacity: 1,
  },
  priorityIcon: {
    marginRight: 6,
  },
  priorityButtonText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#6366F1',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
});