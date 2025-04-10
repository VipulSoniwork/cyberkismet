// Interest categories for user profiles
export const interestCategories = [
  {
    id: 'activities',
    name: 'Activities',
    interests: [
      { id: 'hiking', label: 'Hiking' },
      { id: 'yoga', label: 'Yoga' },
      { id: 'running', label: 'Running' },
      { id: 'swimming', label: 'Swimming' },
      { id: 'cycling', label: 'Cycling' },
      { id: 'gym', label: 'Gym' },
      { id: 'dancing', label: 'Dancing' },
      { id: 'sports', label: 'Sports' },
      { id: 'travel', label: 'Travel' },
      { id: 'photography', label: 'Photography' },
      { id: 'cooking', label: 'Cooking' },
      { id: 'baking', label: 'Baking' },
    ],
  },
  {
    id: 'arts',
    name: 'Arts & Entertainment',
    interests: [
      { id: 'movies', label: 'Movies' },
      { id: 'tv', label: 'TV Shows' },
      { id: 'music', label: 'Music' },
      { id: 'reading', label: 'Reading' },
      { id: 'writing', label: 'Writing' },
      { id: 'art', label: 'Art' },
      { id: 'theater', label: 'Theater' },
      { id: 'concerts', label: 'Concerts' },
      { id: 'museums', label: 'Museums' },
      { id: 'gaming', label: 'Gaming' },
    ],
  },
  {
    id: 'food',
    name: 'Food & Drink',
    interests: [
      { id: 'coffee', label: 'Coffee' },
      { id: 'wine', label: 'Wine' },
      { id: 'beer', label: 'Beer' },
      { id: 'foodie', label: 'Foodie' },
      { id: 'vegan', label: 'Vegan' },
      { id: 'vegetarian', label: 'Vegetarian' },
      { id: 'baking', label: 'Baking' },
      { id: 'brunch', label: 'Brunch' },
    ],
  },
  {
    id: 'social',
    name: 'Social',
    interests: [
      { id: 'parties', label: 'Parties' },
      { id: 'nightlife', label: 'Nightlife' },
      { id: 'karaoke', label: 'Karaoke' },
      { id: 'networking', label: 'Networking' },
      { id: 'volunteering', label: 'Volunteering' },
      { id: 'languages', label: 'Languages' },
    ],
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    interests: [
      { id: 'pets', label: 'Pets' },
      { id: 'family', label: 'Family' },
      { id: 'outdoors', label: 'Outdoors' },
      { id: 'fitness', label: 'Fitness' },
      { id: 'wellness', label: 'Wellness' },
      { id: 'spirituality', label: 'Spirituality' },
      { id: 'mindfulness', label: 'Mindfulness' },
      { id: 'environmentalism', label: 'Environmentalism' },
    ],
  },
  {
    id: 'career',
    name: 'Career & Education',
    interests: [
      { id: 'tech', label: 'Technology' },
      { id: 'business', label: 'Business' },
      { id: 'science', label: 'Science' },
      { id: 'education', label: 'Education' },
      { id: 'engineering', label: 'Engineering' },
      { id: 'healthcare', label: 'Healthcare' },
      { id: 'finance', label: 'Finance' },
      { id: 'arts', label: 'Arts' },
      { id: 'entrepreneurship', label: 'Entrepreneurship' },
    ],
  },
];

// Flattened list of all interests across categories
export const allInterests = interestCategories.reduce((acc, category) => {
  return [...acc, ...category.interests];
}, []);

export default interestCategories; 