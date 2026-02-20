import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const getTimestamp = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const getBotResponse = (input: string): string => {
  const lower = input.toLowerCase();

  if (lower.includes('headache') || lower.includes('sakit ng ulo')) {
    return 'For headaches, you can try Biogesic (Paracetamol) 500mg every 4-6 hours. Available at ₱5.50 per tablet. For severe headaches, Flanax (Naproxen) 550mg may help. Would you like me to check stock at nearby branches?';
  }
  if (lower.includes('fever') || lower.includes('lagnat')) {
    return 'For fever, Paracetamol (Biogesic) 500mg every 4-6 hours is recommended. For adults, Ibuprofen 200-400mg is also effective. Stay hydrated and rest. If fever persists beyond 3 days, please consult a doctor.';
  }
  if (lower.includes('cough') || lower.includes('ubo')) {
    return 'For dry cough, try Robitussin DM Syrup. For wet/productive cough, Solmux (Carbocisteine) 500mg capsule helps loosen mucus. Available at your nearest Mercury Drug branch.';
  }
  if (lower.includes('allergy')) {
    return 'Cetirizine 10mg is a popular antihistamine for allergies. Take once daily. Available OTC at ₱4.50/tablet. For more severe allergies, consult your doctor about prescription options.';
  }
  if (lower.includes('generic')) {
    return 'Generic medicines have the same active ingredients as branded ones but cost 30-60% less! Mercury Drug carries a wide range of generics. I can help you find generic alternatives for any medicine.';
  }
  if (lower.includes('pain') || lower.includes('masakit')) {
    return 'What type of pain are you experiencing? For general pain: Paracetamol or Mefenamic Acid (Dolfenal). For muscle/joint pain: Naproxen (Flanax). For stomach pain with acidity: Kremil-S.';
  }
  if (lower.includes('pharmacy') || lower.includes('branch') || lower.includes('nearest') || lower.includes('store')) {
    return 'I can help you find the nearest Mercury Drug branch! Use our Store Locator feature to see branches near you, check operating hours, and view stock availability. Would you like me to take you there?';
  }
  if (lower.includes('side effect')) {
    return 'I can provide side effect information for common medicines. Which medicine would you like to know about? For example: Paracetamol, Ibuprofen, Cetirizine, Amoxicillin, or Losartan.';
  }

  return "I can help you with medicine recommendations, dosage info, side effects, and finding nearby pharmacies. Try asking about a specific symptom or medicine!";
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Kumusta! I'm your Mercury+ Health Assistant. I can help you with medicine information, dosage queries, side effects, and health tips. How can I help you today?",
    isUser: false,
    timestamp: '9:00 AM',
  },
  {
    id: '2',
    text: 'What can I take for a headache?',
    isUser: true,
    timestamp: '9:01 AM',
  },
  {
    id: '3',
    text: 'For headaches, you can try Biogesic (Paracetamol) 500mg every 4-6 hours. Available at ₱5.50 per tablet. For severe headaches, Flanax (Naproxen) 550mg may help. Would you like me to check stock at nearby branches?',
    isUser: false,
    timestamp: '9:01 AM',
  },
];

const QUICK_REPLIES = [
  "What's good for headache?",
  'Generic alternatives',
  'Side effects',
  'Find nearest pharmacy',
];

function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createBounce = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -6, duration: 250, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 250, useNativeDriver: true }),
        ])
      );

    const anim1 = createBounce(dot1, 0);
    const anim2 = createBounce(dot2, 150);
    const anim3 = createBounce(dot3, 300);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.typingRow}>
      <View style={styles.avatarSmall}>
        <Text style={styles.avatarText}>M+</Text>
      </View>
      <View style={styles.typingBubble}>
        <Animated.View style={[styles.typingDot, { transform: [{ translateY: dot1 }] }]} />
        <Animated.View style={[styles.typingDot, { transform: [{ translateY: dot2 }] }]} />
        <Animated.View style={[styles.typingDot, { transform: [{ translateY: dot3 }] }]} />
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'PH'>('EN');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const delay = 1000 + Math.random() * 500;
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        isUser: false,
        timestamp: getTimestamp(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageRow, item.isUser ? styles.messageRowUser : styles.messageRowBot]}>
      {!item.isUser && (
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarText}>M+</Text>
        </View>
      )}
      <View style={{ maxWidth: '75%' }}>
        <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.botBubble]}>
          <Text style={[styles.messageText, item.isUser ? styles.userText : styles.botText]}>
            {item.text}
          </Text>
        </View>
        <Text
          style={[
            styles.timestamp,
            { textAlign: item.isUser ? 'right' : 'left', marginLeft: item.isUser ? 0 : 4, marginRight: item.isUser ? 4 : 0 },
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitle}>M+ Health Assistant</Text>
            <View style={styles.aiBadge}>
              <Ionicons name="sparkles" size={10} color="#FFFFFF" />
              <Text style={styles.aiBadgeText}>AI</Text>
            </View>
          </View>
          <Text style={styles.headerSubtitle}>Online - Ready to help</Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        />

        {/* Quick Replies */}
        {!isTyping && (
          <View style={styles.quickRepliesContainer}>
            <FlatList
              data={QUICK_REPLIES}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.quickRepliesList}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.quickReplyChip} onPress={() => handleQuickReply(item)}>
                  <Text style={styles.quickReplyText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TouchableOpacity
            style={styles.langToggle}
            onPress={() => setLanguage((l) => (l === 'EN' ? 'PH' : 'EN'))}
          >
            <Text style={styles.langToggleText}>{language === 'EN' ? '🇺🇸' : '🇵🇭'}</Text>
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your health question..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              onSubmitEditing={() => sendMessage(inputText)}
              returnKeyType="send"
            />
          </View>
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A86B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#00A86B',
    marginTop: 1,
  },
  headerAction: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  messageRowBot: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  avatarSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  avatarText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  botBubble: {
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#00A86B',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },
  botText: {
    color: '#1A1A2E',
  },
  userText: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    gap: 5,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
  },
  quickRepliesContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  quickRepliesList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickReplyChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00A86B',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  quickReplyText: {
    fontSize: 13,
    color: '#00A86B',
    fontWeight: '500',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
  },
  langToggle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  langToggleText: {
    fontSize: 18,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 4,
    maxHeight: 100,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 15,
    color: '#1A1A2E',
    maxHeight: 80,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
});
