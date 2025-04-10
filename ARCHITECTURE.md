# Dating App - Architecture

## Architecture Overview

The Dating App follows a component-based architecture using React Native and Expo. The application is structured to separate concerns and promote reusability, maintainability, and scalability.

## Technical Stack

- **Frontend Framework**: React Native with Expo
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Navigation**: React Navigation (Native Stack)
- **State Management**: 
  - React Context API for authentication
  - Zustand for global state (ready to implement)
- **Form Handling**: React Hook Form
- **Future Backend Integration**: Prepared for Firebase/Supabase

## Directory Structure

```
/
├── assets/                  # App images and assets
├── components/              # Reusable UI components
│   ├── Button.js            # Custom button component
│   ├── Input.js             # Form input component
│   └── ProfileCard.js       # Profile display card
├── contexts/                # React Context providers
│   └── AuthContext.js       # Authentication state management
├── hooks/                   # Custom React hooks
├── navigation/              # Navigation configuration
│   └── AppNavigator.js      # Main navigation setup
├── screens/                 # App screens
│   ├── auth/                # Authentication screens
│   │   ├── LoginScreen.js   # User login
│   │   └── RegisterScreen.js # User registration
│   ├── HomeScreen.js        # Main discovery screen
│   ├── ProfileScreen.js     # Profile viewing
│   ├── MatchScreen.js       # Match notification
│   ├── EditProfileScreen.js # Profile editing
│   └── SettingsScreen.js    # App settings
├── utils/                   # Utility functions
│   └── helpers.js           # Helper utilities
├── App.js                   # Main application component
├── babel.config.js          # Babel configuration
├── global.js                # Global setup for NativeWind
├── index.js                 # Application entry point
├── tailwind.config.js       # TailwindCSS configuration
└── package.json             # Dependencies and scripts
```

## Key Components and Features

### Authentication Flow

The app uses a context-based authentication system:

1. `AuthContext.js` manages the auth state with:
   - User data storage
   - Login/logout functionality
   - Registration handling

2. Authentication screens:
   - `LoginScreen.js` - Email/password authentication
   - `RegisterScreen.js` - New user registration

### Navigation Structure

The app uses React Navigation with two main navigation stacks:

1. **Auth Stack**: Available when user is not authenticated
   - Login Screen
   - Registration Screen

2. **App Stack**: Available post-authentication
   - Home Screen (Profile Discovery)
   - Profile Screen
   - Match Screen
   - Edit Profile Screen
   - Settings Screen

### UI Components

1. **Button Component**: Customizable button with:
   - Multiple variants (primary, secondary, outline)
   - Loading state support
   - Accessibility features

2. **Input Component**: Form input fields with:
   - React Hook Form integration
   - Validation support
   - Error messaging
   - Various input types (text, password, etc.)

3. **ProfileCard Component**: Display user profiles with:
   - Profile image display
   - User details formatting
   - Match status indication

### Styling Approach

The app uses NativeWind (TailwindCSS for React Native) for styling:

1. **Consistent Design System**:
   - Predefined color scheme
   - Typography scale
   - Spacing and layout utilities

2. **Responsive Design**:
   - Adaptive to different screen sizes
   - Proper handling of device orientation

## Data Flow

1. **Authentication Data**:
   - Stored in AuthContext
   - Accessible throughout the app
   - Currently uses mock data (prepared for backend integration)

2. **User Profiles**:
   - Mock profiles in HomeScreen
   - Detailed view in ProfileScreen
   - Editable in EditProfileScreen

3. **Matches**:
   - Manual match triggering (Matchmaker scenario)
   - Match celebration screen
   - Future integration with real-time notifications

## Future Architecture Enhancements

1. **Persistent Storage**:
   - AsyncStorage for local data persistence
   - User preferences and settings

2. **Backend Integration**:
   - API service layer
   - Authentication with Firebase/Supabase
   - Real-time chat infrastructure

3. **State Management Evolution**:
   - Migration to Zustand for more complex state
   - Separation of concerns with multiple stores

4. **Performance Optimizations**:
   - List virtualization
   - Image caching
   - Lazy loading components 