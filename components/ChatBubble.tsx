import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const colors = Colors.light;

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  typing?: boolean;
}

function TypingDots() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );

    const a1 = animateDot(dot1, 0);
    const a2 = animateDot(dot2, 200);
    const a3 = animateDot(dot3, 400);

    a1.start();
    a2.start();
    a3.start();

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.typingContainer}>
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { opacity: dot }]}
        />
      ))}
    </View>
  );
}

export default function ChatBubble({
  message,
  isUser,
  timestamp,
  typing = false,
}: ChatBubbleProps) {
  return (
    <View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowBot,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleBot,
        ]}
      >
        {typing ? (
          <TypingDots />
        ) : (
          <Text
            style={[
              styles.message,
              isUser ? styles.messageUser : styles.messageBot,
            ]}
          >
            {message}
          </Text>
        )}
      </View>
      {timestamp && (
        <Text
          style={[
            styles.timestamp,
            isUser ? styles.timestampUser : styles.timestampBot,
          ]}
        >
          {timestamp}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 4,
    paddingHorizontal: 16,
    maxWidth: '85%',
  },
  rowUser: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  rowBot: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    maxWidth: '100%',
  },
  bubbleUser: {
    backgroundColor: colors.tint,
    borderBottomRightRadius: 6,
  },
  bubbleBot: {
    backgroundColor: '#F1F3F5',
    borderBottomLeftRadius: 6,
  },
  message: {
    fontSize: 15,
    lineHeight: 21,
  },
  messageUser: {
    color: '#FFFFFF',
  },
  messageBot: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 11,
    color: colors.tabIconDefault,
    marginTop: 4,
  },
  timestampUser: {
    textAlign: 'right',
  },
  timestampBot: {
    textAlign: 'left',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
  },
});
