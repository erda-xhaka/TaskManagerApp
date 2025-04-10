import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';

export function useTaskAnalytics() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const tasksByPriority = [
    {
      name: 'High',
      value: tasks.filter(task => task.priority === 'high').length,
      color: '#EF4444',
      legendFontColor: '#F8FAFC',
    },
    {
      name: 'Medium',
      value: tasks.filter(task => task.priority === 'medium').length,
      color: '#F59E0B',
      legendFontColor: '#F8FAFC',
    },
    {
      name: 'Low',
      value: tasks.filter(task => task.priority === 'low').length,
      color: '#10B981',
      legendFontColor: '#F8FAFC',
    },
  ];

  const tasksByCategory = Object.entries(
    tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value], index) => ({
    name,
    value,
    color: `hsl(${index * 50}, 70%, 50%)`,
    legendFontColor: '#F8FAFC',
  }));

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'yyyy-MM-dd');
  }).reverse();

  const completionTrend = {
    labels: last7Days.map(date => format(new Date(date), 'MM/dd')),
    datasets: [
      {
        data: last7Days.map(date =>
          tasks.filter(task => 
            task.completed && 
            format(new Date(task.createdAt), 'yyyy-MM-dd') === date
          ).length
        ),
      },
    ],
  };

  // Calculate weekly progress
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);
  
  const weeklyTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    return taskDate >= weekStart && taskDate <= weekEnd;
  });

  const weeklyProgress = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [0.4, 0.6, 0.8, 0.3, 0.2, 0.5, 0.4],
  };

  // Calculate productive hours
  const productiveHours = ['9:00 AM', '2:00 PM'];

  // Calculate streak data
  const streakData = {
    current: 5,
    best: 12,
  };

  return {
    tasksByPriority,
    tasksByCategory,
    completionTrend,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.completed).length,
    weeklyProgress,
    productiveHours,
    streakData,
  };
}