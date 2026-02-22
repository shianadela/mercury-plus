import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function SignUpScreen() {
  const { signUp, loading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'patient' | 'caregiver' | null>(null);
  const [localLoading, setLocalLoading] = useState(false);

  const isLoading = loading || localLoading;

  async function handleCreateAccount() {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match. Please try again.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return;
    }

    setLocalLoading(true);
    try {
      await signUp(email.trim(), password, fullName.trim());
      // AuthGate in _layout.tsx will redirect to onboarding automatically
    } catch (error) {
      Alert.alert('Sign Up Failed', 'Could not create account. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton} disabled={isLoading}>
              <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
            </Pressable>
            <Text style={styles.headerTitle}>Create Account</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#6B7280"
                />
              </Pressable>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#6B7280"
                />
              </Pressable>
            </View>
          </View>

          {/* Role Selection */}
          <Text style={styles.roleLabel}>I am a...</Text>
          <View style={styles.roleContainer}>
            <Pressable
              style={[
                styles.roleCard,
                selectedRole === 'patient' && styles.roleCardSelected,
              ]}
              onPress={() => setSelectedRole('patient')}
              disabled={isLoading}
            >
              <View style={[
                styles.roleIconCircle,
                selectedRole === 'patient' && styles.roleIconCircleSelected,
              ]}>
                <Ionicons
                  name="person"
                  size={28}
                  color={selectedRole === 'patient' ? '#FFFFFF' : '#6B7280'}
                />
              </View>
              <Text style={[
                styles.roleTitle,
                selectedRole === 'patient' && styles.roleTitleSelected,
              ]}>
                Patient
              </Text>
              <Text style={styles.roleSubtitle}>Managing my own health</Text>
              {selectedRole === 'patient' && (
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                </View>
              )}
            </Pressable>

            <Pressable
              style={[
                styles.roleCard,
                selectedRole === 'caregiver' && styles.roleCardSelected,
              ]}
              onPress={() => setSelectedRole('caregiver')}
              disabled={isLoading}
            >
              <View style={[
                styles.roleIconCircle,
                selectedRole === 'caregiver' && styles.roleIconCircleSelected,
              ]}>
                <Ionicons
                  name="people"
                  size={28}
                  color={selectedRole === 'caregiver' ? '#FFFFFF' : '#6B7280'}
                />
              </View>
              <Text style={[
                styles.roleTitle,
                selectedRole === 'caregiver' && styles.roleTitleSelected,
              ]}>
                Caregiver
              </Text>
              <Text style={styles.roleSubtitle}>Managing someone else's health</Text>
              {selectedRole === 'caregiver' && (
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                </View>
              )}
            </Pressable>
          </View>

          {/* Create Account Button */}
          <Pressable
            style={[styles.createButton, isLoading && styles.buttonDisabled]}
            onPress={handleCreateAccount}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.createButtonText}>Create Account</Text>
            )}
          </Pressable>

          {/* Sign In Link */}
          <Pressable onPress={() => router.back()} style={styles.signInLink} disabled={isLoading}>
            <Text style={styles.signInLinkText}>
              Already have an account? <Text style={styles.signInLinkBold}>Sign In</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  form: {
    paddingHorizontal: 24,
    gap: 14,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
  },
  eyeButton: {
    padding: 4,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginTop: 28,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  roleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  roleCardSelected: {
    borderColor: '#00A86B',
    backgroundColor: '#F0FDF9',
  },
  roleIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  roleIconCircleSelected: {
    backgroundColor: '#00A86B',
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  roleTitleSelected: {
    color: '#00A86B',
  },
  roleSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  checkCircle: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#00A86B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  createButton: {
    backgroundColor: '#00A86B',
    marginHorizontal: 24,
    marginTop: 28,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  signInLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  signInLinkText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signInLinkBold: {
    color: '#00A86B',
    fontWeight: '700',
  },
});
