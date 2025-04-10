import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    location: 'New York, NY',
    distance: 5,
    bio: 'Adventurous spirit looking for someone to explore the city with.',
    interests: ['hiking', 'photography', 'cooking'],
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    age: 32,
    location: 'Brooklyn, NY',
    distance: 7,
    bio: 'Coffee enthusiast and weekend hiker. Looking for someone with similar interests.',
    interests: ['coffee', 'hiking', 'movies'],
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    age: 25,
    location: 'Manhattan, NY',
    distance: 3,
    bio: 'Artist and musician looking for creative connections.',
    interests: ['art', 'music', 'reading'],
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '4',
    name: 'James Chen',
    age: 30,
    location: 'Queens, NY',
    distance: 10,
    bio: 'Tech entrepreneur who loves outdoor activities and good food.',
    interests: ['technology', 'running', 'cooking'],
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '5',
    name: 'Olivia Parker',
    age: 27,
    location: 'Jersey City, NJ',
    distance: 12,
    bio: 'Yoga instructor and avid reader looking for deep connections.',
    interests: ['yoga', 'reading', 'travel'],
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: '6',
    name: 'Daniel Taylor',
    age: 35,
    location: 'Hoboken, NJ',
    distance: 15,
    bio: 'Finance professional by day, foodie by night. Love to explore new restaurants.',
    interests: ['food', 'fitness', 'travel'],
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '7',
    name: 'Sophia Martinez',
    age: 29,
    location: 'Bronx, NY',
    distance: 8,
    bio: 'Veterinarian who loves animals and nature. Looking for adventure buddies.',
    interests: ['animals', 'nature', 'hiking'],
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '8',
    name: 'Ryan Brown',
    age: 31,
    location: 'Manhattan, NY',
    distance: 2,
    bio: 'Marketing professional with a passion for photography and travel.',
    interests: ['photography', 'travel', 'food'],
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
];

// Available interests for filtering
const availableInterests = [
  'hiking', 'photography', 'cooking', 'coffee', 'movies', 
  'art', 'music', 'reading', 'technology', 'running', 
  'yoga', 'travel', 'food', 'fitness', 'animals', 'nature'
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [ageRange, setAgeRange] = useState({ min: 18, max: 50 });
  const [maxDistance, setMaxDistance] = useState(50);
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);
  
  // Filter users when search term or filters change
  useEffect(() => {
    if (users.length === 0) return;
    
    const filtered = users.filter(user => {
      // Filter by search term (name or location)
      const searchMatch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by age range
      const ageMatch = 
        user.age >= ageRange.min && user.age <= ageRange.max;
      
      // Filter by distance
      const distanceMatch = user.distance <= maxDistance;
      
      // Filter by selected interests
      const interestsMatch = 
        selectedInterests.length === 0 || 
        selectedInterests.some(interest => user.interests.includes(interest));
      
      return searchMatch && ageMatch && distanceMatch && interestsMatch;
    });
    
    setFilteredUsers(filtered);
  }, [searchTerm, users, ageRange, maxDistance, selectedInterests]);
  
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
        setFilteredUsers(parsedUsers);
      } else {
        // Use mock data if no stored users
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        await AsyncStorage.setItem('users', JSON.stringify(mockUsers));
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewProfile = (user) => {
    navigation.navigate('Profile', { userId: user.id });
  };
  
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const resetFilters = () => {
    setAgeRange({ min: 18, max: 50 });
    setMaxDistance(50);
    setSelectedInterests([]);
    setSearchTerm('');
  };
  
  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => handleViewProfile(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <View style={styles.nameAgeRow}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userAge}>{item.age}</Text>
        </View>
        <Text style={styles.userLocation}>
          <Ionicons name="location-outline" size={14} color="#666" />
          {' '}{item.location} • {item.distance} miles away
        </Text>
        <View style={styles.interestsContainer}>
          {item.interests.slice(0, 3).map(interest => (
            <View key={interest} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or location"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm ? (
            <TouchableOpacity onPress={() => setSearchTerm('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons 
            name={showFilters ? "options" : "options-outline"} 
            size={24} 
            color="#007AFF" 
          />
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Age Range</Text>
              <View style={styles.ageRangeContainer}>
                <Text style={styles.ageRangeText}>{ageRange.min}</Text>
                <Text style={styles.ageRangeSeparator}>to</Text>
                <Text style={styles.ageRangeText}>{ageRange.max}</Text>
              </View>
              <View style={styles.sliderContainer}>
                <TouchableOpacity 
                  style={styles.ageButton}
                  onPress={() => setAgeRange({ ...ageRange, min: Math.max(18, ageRange.min - 1) })}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <View style={styles.ageSlider}>
                  <View style={styles.ageSliderFill} />
                </View>
                <TouchableOpacity 
                  style={styles.ageButton}
                  onPress={() => setAgeRange({ ...ageRange, min: Math.min(ageRange.max - 1, ageRange.min + 1) })}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sliderContainer}>
                <TouchableOpacity 
                  style={styles.ageButton}
                  onPress={() => setAgeRange({ ...ageRange, max: Math.max(ageRange.min + 1, ageRange.max - 1) })}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <View style={styles.ageSlider}>
                  <View style={styles.ageSliderFill} />
                </View>
                <TouchableOpacity 
                  style={styles.ageButton}
                  onPress={() => setAgeRange({ ...ageRange, max: Math.min(100, ageRange.max + 1) })}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Max Distance</Text>
              <Text style={styles.distanceText}>{maxDistance} miles</Text>
              <View style={styles.sliderContainer}>
                <TouchableOpacity 
                  style={styles.ageButton}
                  onPress={() => setMaxDistance(Math.max(1, maxDistance - 5))}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <View style={styles.ageSlider}>
                  <View style={[styles.ageSliderFill, { width: `${(maxDistance / 100) * 100}%` }]} />
                </View>
                <TouchableOpacity 
                  style={styles.ageButton}
                  onPress={() => setMaxDistance(Math.min(100, maxDistance + 5))}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={[styles.filterSection, { width: 300 }]}>
              <Text style={styles.filterTitle}>Interests</Text>
              <View style={styles.interestsGrid}>
                {availableInterests.map(interest => (
                  <TouchableOpacity
                    key={interest}
                    style={[
                      styles.interestOption,
                      selectedInterests.includes(interest) && styles.interestOptionSelected
                    ]}
                    onPress={() => toggleInterest(interest)}
                  >
                    <Text 
                      style={[
                        styles.interestOptionText,
                        selectedInterests.includes(interest) && styles.interestOptionTextSelected
                      ]}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetFilters}
          >
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.usersList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No users match your search</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetSearchText}>Reset search</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterSection: {
    padding: 16,
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 8,
    width: 200,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  ageRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  ageRangeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  ageRangeSeparator: {
    marginHorizontal: 8,
    color: '#666',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ageButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageSlider: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  ageSliderFill: {
    height: '100%',
    width: '50%',
    backgroundColor: '#007AFF',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  interestOptionSelected: {
    backgroundColor: '#007AFF',
  },
  interestOptionText: {
    color: '#666',
    fontSize: 14,
  },
  interestOptionTextSelected: {
    color: '#fff',
  },
  resetButton: {
    margin: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  usersList: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  nameAgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userAge: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  interestsContainer: {
    flexDirection: 'row',
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  interestText: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    marginBottom: 8,
  },
  resetSearchText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SearchScreen; 