import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import interestCategories from '../data/interests';

const InterestTag = ({ interest, selected, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(interest)}
    className={`rounded-full py-2 px-4 mr-2 mb-2 ${
      selected ? 'bg-primary' : 'bg-lightGray'
    }`}
  >
    <Text
      className={`text-sm ${selected ? 'text-white' : 'text-dark'}`}
    >
      {interest.label}
    </Text>
  </TouchableOpacity>
);

const CategorySection = ({ category, selectedInterests, onInterestPress }) => (
  <View className="mb-4">
    <Text className="text-dark font-semibold mb-2">{category.name}</Text>
    <View className="flex-row flex-wrap">
      {category.interests.map((interest) => (
        <InterestTag
          key={interest.id}
          interest={interest}
          selected={selectedInterests.some((i) => i.id === interest.id)}
          onPress={onInterestPress}
        />
      ))}
    </View>
  </View>
);

const InterestSelector = ({ selectedInterests = [], onChange, maxSelections = 5 }) => {
  const [activeTab, setActiveTab] = useState(interestCategories[0].id);

  const handleInterestPress = (interest) => {
    // Check if already selected
    const isSelected = selectedInterests.some((i) => i.id === interest.id);
    
    if (isSelected) {
      // Remove from selection
      onChange(selectedInterests.filter((i) => i.id !== interest.id));
    } else {
      // Check if max selections reached
      if (selectedInterests.length >= maxSelections) {
        // Replace the first selected interest with the new one
        const newSelected = [...selectedInterests.slice(1), interest];
        onChange(newSelected);
      } else {
        // Add to selection
        onChange([...selectedInterests, interest]);
      }
    }
  };

  const activeCategory = interestCategories.find((cat) => cat.id === activeTab);

  return (
    <View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        {interestCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setActiveTab(category.id)}
            className={`py-2 px-4 mr-2 rounded-full ${
              activeTab === category.id
                ? 'bg-primary'
                : 'bg-lightGray'
            }`}
          >
            <Text
              className={`${
                activeTab === category.id ? 'text-white' : 'text-dark'
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text className="text-gray-500 mb-2">
        {selectedInterests.length}/{maxSelections} interests selected
      </Text>

      {activeCategory && (
        <CategorySection
          category={activeCategory}
          selectedInterests={selectedInterests}
          onInterestPress={handleInterestPress}
        />
      )}

      {selectedInterests.length > 0 && (
        <View className="mt-4">
          <Text className="text-dark font-semibold mb-2">Your Interests</Text>
          <View className="flex-row flex-wrap">
            {selectedInterests.map((interest) => (
              <InterestTag
                key={interest.id}
                interest={interest}
                selected={true}
                onPress={handleInterestPress}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default InterestSelector; 