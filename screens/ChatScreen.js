import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useChat } from '../contexts/ChatContext';

const ChatScreen = () => {
  const route = useRoute();
  const { id, name } = route.params;
  const { 
    getMessages, 
    sendMessage, 
    sendImageMessage, 
    markConversationAsRead,
    setTypingStatus,
    typingUsers,
    isLoading: isContextLoading
  } = useChat();
  
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  
  // Get messages for this conversation
  const messages = getMessages(id);
  
  // Mark conversation as read when screen is focused
  useEffect(() => {
    markConversationAsRead(id);
    
    return () => {
      // Clear typing status when leaving the screen
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setTypingStatus(id, 'user', false);
    };
  }, [id, markConversationAsRead, setTypingStatus]);
  
  // Check if the other user is typing
  useEffect(() => {
    const otherUserTyping = typingUsers[id] && typingUsers[id] !== 'user';
    setIsTyping(otherUserTyping);
  }, [typingUsers, id]);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(id, message.trim());
      setMessage('');
      setTypingStatus(id, 'user', false);
    }
  };

  const handleTyping = (text) => {
    setMessage(text);
    
    // Update typing status
    setTypingStatus(id, 'user', true);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to hide typing indicator after 2 seconds of no typing
    typingTimeoutRef.current = setTimeout(() => {
      setTypingStatus(id, 'user', false);
    }, 2000);
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setIsUploading(true);
        
        // Send image message
        sendImageMessage(id, result.assets[0].uri);
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      setIsUploading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isSent ? styles.sentMessage : styles.receivedMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.isSent ? styles.sentBubble : styles.receivedBubble
      ]}>
        {item.image ? (
          <Image 
            source={{ uri: item.image }} 
            style={styles.messageImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={[
            styles.messageText,
            item.isSent ? styles.sentMessageText : styles.receivedMessageText
          ]}>
            {item.text}
          </Text>
        )}
      </View>
      <View style={styles.messageFooter}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.isSent && (
          <View style={styles.statusContainer}>
            {item.status === 'sent' && (
              <Ionicons name="checkmark" size={16} color="#999" />
            )}
            {item.status === 'delivered' && (
              <Ionicons name="checkmark-done" size={16} color="#999" />
            )}
            {item.status === 'read' && (
              <Ionicons name="checkmark-done" size={16} color="#4CAF50" />
            )}
          </View>
        )}
      </View>
    </View>
  );

  if (isContextLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />
      
      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>{name} is typing...</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.attachButton}
          onPress={handlePickImage}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Ionicons name="image" size={24} color="#007AFF" />
          )}
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={handleTyping}
          placeholder="Type a message..."
          multiline
        />
        
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
  },
  sentBubble: {
    backgroundColor: '#007AFF',
  },
  receivedBubble: {
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: '#fff',
  },
  receivedMessageText: {
    color: '#333',
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginRight: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingIndicator: {
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  typingText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    alignItems: 'center',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatScreen; 