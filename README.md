# Dating App - React Native

A manual-match dating app built with React Native, Expo, and NativeWind.

## Features

- User authentication (login/registration)
- Profile creation and editing
- Browse potential matches
- Manual matchmaking system
- Match notifications
- Settings and preferences management

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - React Native toolchain
- **NativeWind** - TailwindCSS for React Native
- **React Navigation** - Navigation library
- **React Hook Form** - Form handling
- **Zustand** - State management

## Screenshots

(In a production app, screenshots would be included here)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install dependencies
```
npm install
```

3. Start the app
```
npm start
```

4. Run on a device or emulator
- For iOS: `npm run ios`
- For Android: `npm run android`
- Or scan QR code with Expo Go app on your mobile device

## Project Structure

```
├── assets/            # App assets (images, fonts, etc.)
├── components/        # Reusable UI components
├── contexts/          # React contexts (Auth, etc.)
├── hooks/             # Custom React hooks
├── navigation/        # React Navigation setup
├── screens/           # App screens
│   ├── auth/          # Authentication screens
│   └── ...            # Other screens
├── utils/             # Utility functions
├── App.js             # Main app component
├── babel.config.js    # Babel configuration
└── tailwind.config.js # TailwindCSS configuration
```

## Demo Credentials

For testing purposes, you can use any email and password combination. The app is currently using mock data and simulated authentication.

## Future Enhancements

- Real-time chat functionality
- User verification
- Push notifications
- Advanced matching algorithm
- Image upload functionality
- Video calling integration

## License

This project is licensed under the MIT License. 