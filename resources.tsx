import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { BookOpen, Search, BookMarked, FileText, Link as LinkIcon } from 'lucide-react-native';

const SAMPLE_RESOURCES = [
  {
    id: '1',
    title: 'Study Techniques',
    description: 'Effective study methods and time management strategies',
    type: 'guide',
    link: 'https://example.com/study-techniques',
  },
  {
    id: '2',
    title: 'Math Formulas',
    description: 'Common mathematical formulas and their applications',
    type: 'notes',
    link: 'https://example.com/math-formulas',
  },
  {
    id: '3',
    title: 'Programming Basics',
    description: 'Introduction to programming concepts and syntax',
    type: 'tutorial',
    link: 'https://example.com/programming-basics',
  },
];

export default function ResourcesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = SAMPLE_RESOURCES.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIconForType = (type: string) => {
    switch (type) {
      case 'guide':
        return <BookOpen size={24} color="#6366F1" />;
      case 'notes':
        return <FileText size={24} color="#10B981" />;
      case 'tutorial':
        return <BookMarked size={24} color="#F59E0B" />;
      default:
        return <BookOpen size={24} color="#6366F1" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop' }}
        style={styles.backgroundImage}
      />
      
      <Text style={styles.title}>Study Resources</Text>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryButton}>
          <BookOpen size={24} color="#6366F1" />
          <Text style={styles.categoryText}>Guides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <FileText size={24} color="#10B981" />
          <Text style={styles.categoryText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <BookMarked size={24} color="#F59E0B" />
          <Text style={styles.categoryText}>Tutorials</Text>
        </TouchableOpacity>
      </View>

      {filteredResources.map(resource => (
        <View key={resource.id} style={styles.resourceCard}>
          <View style={styles.resourceHeader}>
            {getIconForType(resource.type)}
            <View style={styles.resourceTitleContainer}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceType}>{resource.type}</Text>
            </View>
          </View>
          <Text style={styles.resourceDescription}>{resource.description}</Text>
          <TouchableOpacity style={styles.resourceLink}>
            <LinkIcon size={16} color="#6366F1" />
            <Text style={styles.resourceLinkText}>Open Resource</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  categoryText: {
    color: '#F8FAFC',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
  },
  resourceCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  resourceTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#F8FAFC',
  },
  resourceType: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
    textTransform: 'capitalize',
  },
  resourceDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
    marginBottom: 16,
  },
  resourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resourceLinkText: {
    color: '#6366F1',
    fontFamily: 'Inter_600SemiBold',
  },
});