import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context
const ChatContext = createContext();

// Mock data for initial state
const initialConversations = [
  {
    id: '1',
    name: 'Sarah',
    lastMessage: 'Hey, how are you?',
    timestamp: '2m ago',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    unread: true,
    lastMessageTime: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: '2',
    name: 'Mike',
    lastMessage: 'Would love to meet up!',
    timestamp: '1h ago',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    unread: false,
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    name: 'Emma',
    lastMessage: 'That sounds great!',
    timestamp: '2h ago',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    unread: false,
    lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
  }
];

const initialMessages = {
  '1': [
    {
      id: '1',
      text: 'Hey, how are you?',
      timestamp: '10:30 AM',
      isSent: false,
      status: 'read',
    },
    {
      id: '2',
      text: 'I\'m good, thanks! How about you?',
      timestamp: '10:31 AM',
      isSent: true,
      status: 'read',
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Hi there!',
      timestamp: '9:15 AM',
      isSent: false,
      status: 'read',
    },
    {
      id: '2',
      text: 'Would love to meet up!',
      timestamp: '9:20 AM',
      isSent: true,
      status: 'read',
    },
  ],
  '3': [
    {
      id: '1',
      text: 'How was your weekend?',
      timestamp: '8:45 AM',
      isSent: false,
      status: 'read',
    },
    {
      id: '2',
      text: 'That sounds great!',
      timestamp: '9:00 AM',
      isSent: true,
      status: 'read',
    },
  ],
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState({});

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
    
    // Simulate real-time updates (in a real app, this would be a WebSocket connection)
    const interval = setInterval(() => {
      simulateIncomingMessage();
    }, 20000); // Simulate a new message every 20 seconds
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [conversations, messages, isLoading]);

  const loadData = async () => {
    try {
      // Load conversations
      const storedConversations = await AsyncStorage.getItem('conversations');
      const loadedConversations = storedConversations 
        ? JSON.parse(storedConversations) 
        : initialConversations;
      
      // Load messages
      const storedMessages = await AsyncStorage.getItem('messages');
      const loadedMessages = storedMessages 
        ? JSON.parse(storedMessages) 
        : initialMessages;
      
      setConversations(loadedConversations);
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading chat data:', error);
      setConversations(initialConversations);
      setMessages(initialMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('conversations', JSON.stringify(conversations));
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving chat data:', error);
    }
  };

  const simulateIncomingMessage = () => {
    // Randomly select a conversation to update
    if (conversations.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * conversations.length);
    const conversation = conversations[randomIndex];
    
    // Create a new message
    const newMessage = {
      id: Date.now().toString(),
      text: `This is a simulated message from ${conversation.name}`,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isSent: false,
      status: 'read',
    };
    
    // Update messages for this conversation
    const updatedMessages = {
      ...messages,
      [conversation.id]: [
        ...(messages[conversation.id] || []),
        newMessage
      ]
    };
    
    // Update conversation
    const updatedConversations = [...conversations];
    updatedConversations[randomIndex] = {
      ...conversation,
      lastMessage: newMessage.text,
      timestamp: 'Just now',
      unread: true,
      lastMessageTime: new Date().toISOString(),
    };
    
    // Sort conversations by last message time (most recent first)
    updatedConversations.sort((a, b) => 
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );
    
    setMessages(updatedMessages);
    setConversations(updatedConversations);
  };

  const sendMessage = (conversationId, text) => {
    if (!text.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isSent: true,
      status: 'sent',
    };
    
    // Update messages
    const updatedMessages = {
      ...messages,
      [conversationId]: [
        ...(messages[conversationId] || []),
        newMessage
      ]
    };
    
    // Update conversation
    const conversationIndex = conversations.findIndex(conv => conv.id === conversationId);
    if (conversationIndex !== -1) {
      const updatedConversations = [...conversations];
      updatedConversations[conversationIndex] = {
        ...updatedConversations[conversationIndex],
        lastMessage: newMessage.text,
        timestamp: 'Just now',
        unread: false,
        lastMessageTime: new Date().toISOString(),
      };
      
      // Sort conversations by last message time (most recent first)
      updatedConversations.sort((a, b) => 
        new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
      );
      
      setConversations(updatedConversations);
    }
    
    setMessages(updatedMessages);
    
    // Simulate message status updates
    setTimeout(() => {
      updateMessageStatus(conversationId, newMessage.id, 'delivered');
    }, 1000);
    
    setTimeout(() => {
      updateMessageStatus(conversationId, newMessage.id, 'read');
    }, 3000);
    
    return newMessage;
  };

  const sendImageMessage = (conversationId, imageUri) => {
    const newMessage = {
      id: Date.now().toString(),
      image: imageUri,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isSent: true,
      status: 'sent',
    };
    
    // Update messages
    const updatedMessages = {
      ...messages,
      [conversationId]: [
        ...(messages[conversationId] || []),
        newMessage
      ]
    };
    
    // Update conversation
    const conversationIndex = conversations.findIndex(conv => conv.id === conversationId);
    if (conversationIndex !== -1) {
      const updatedConversations = [...conversations];
      updatedConversations[conversationIndex] = {
        ...updatedConversations[conversationIndex],
        lastMessage: 'Image',
        timestamp: 'Just now',
        unread: false,
        lastMessageTime: new Date().toISOString(),
      };
      
      // Sort conversations by last message time (most recent first)
      updatedConversations.sort((a, b) => 
        new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
      );
      
      setConversations(updatedConversations);
    }
    
    setMessages(updatedMessages);
    
    // Simulate message status updates
    setTimeout(() => {
      updateMessageStatus(conversationId, newMessage.id, 'delivered');
    }, 1000);
    
    setTimeout(() => {
      updateMessageStatus(conversationId, newMessage.id, 'read');
    }, 3000);
    
    return newMessage;
  };

  const updateMessageStatus = (conversationId, messageId, newStatus) => {
    const conversationMessages = messages[conversationId] || [];
    const updatedMessages = conversationMessages.map(msg => 
      msg.id === messageId ? { ...msg, status: newStatus } : msg
    );
    
    setMessages({
      ...messages,
      [conversationId]: updatedMessages
    });
  };

  const markConversationAsRead = (conversationId) => {
    const updatedConversations = conversations.map(conv => 
      conv.id === conversationId ? { ...conv, unread: false } : conv
    );
    
    setConversations(updatedConversations);
  };

  const setTypingStatus = (conversationId, userId, isTyping) => {
    setTypingUsers(prev => ({
      ...prev,
      [conversationId]: isTyping ? userId : null
    }));
  };

  const getMessages = (conversationId) => {
    return messages[conversationId] || [];
  };

  const getConversation = (conversationId) => {
    return conversations.find(conv => conv.id === conversationId);
  };

  const getUnreadCount = () => {
    return conversations.filter(conv => conv.unread).length;
  };

  const value = {
    conversations,
    getMessages,
    getConversation,
    sendMessage,
    sendImageMessage,
    updateMessageStatus,
    markConversationAsRead,
    setTypingStatus,
    typingUsers,
    getUnreadCount,
    isLoading,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext; 