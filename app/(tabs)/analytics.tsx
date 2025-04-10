import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import { useTaskAnalytics } from '../../hooks/useTaskAnalytics';
import { Clock, Target, TrendingUp, Award } from 'lucide-react-native';

export default function AnalyticsScreen() {
  const {
    tasksByPriority,
    tasksByCategory,
    completionTrend,
    totalTasks,
    completedTasks,
    weeklyProgress,
    productiveHours,
    streakData,
  } = useTaskAnalytics();

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      />
      
      <Text style={styles.title}>Performance Analytics</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Task Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Clock size={24} color="#6366F1" />
            <Text style={styles.statNumber}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statItem}>
            <Target size={24} color="#10B981" />
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingUp size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>
              {totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Progress</Text>
        <ProgressChart
          data={weeklyProgress}
          width={screenWidth - 48}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundColor: '#1E293B',
            backgroundGradientFrom: '#1E293B',
            backgroundGradientTo: '#1E293B',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          hideLegend={false}
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Completion Trend</Text>
        <LineChart
          data={completionTrend}
          width={screenWidth - 48}
          height={220}
          chartConfig={{
            backgroundColor: '#1E293B',
            backgroundGradientFrom: '#1E293B',
            backgroundGradientTo: '#1E293B',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            labelColor: () => '#94A3B8',
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Task Distribution</Text>
        <PieChart
          data={tasksByPriority}
          width={screenWidth - 48}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Category Breakdown</Text>
        <PieChart
          data={tasksByCategory}
          width={screenWidth - 48}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Productivity Insights</Text>
        <View style={styles.insightContainer}>
          <View style={styles.insight}>
            <Clock size={20} color="#6366F1" />
            <Text style={styles.insightTitle}>Peak Hours</Text>
            <Text style={styles.insightValue}>{productiveHours.join(' - ')}</Text>
          </View>
          <View style={styles.insight}>
            <Award size={20} color="#10B981" />
            <Text style={styles.insightTitle}>Current Streak</Text>
            <Text style={styles.insightValue}>{streakData.current} days</Text>
          </View>
          <View style={styles.insight}>
            <TrendingUp size={20} color="#F59E0B" />
            <Text style={styles.insightTitle}>Best Streak</Text>
            <Text style={styles.insightValue}>{streakData.best} days</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.05,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#F8FAFC',
    marginBottom: 24,
    marginTop: 60,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#F8FAFC',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
    marginTop: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  insightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  insight: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#334155',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  insightTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#94A3B8',
    marginTop: 8,
  },
  insightValue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#F8FAFC',
    marginTop: 4,
  },
});