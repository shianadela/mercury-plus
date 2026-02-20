import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const recentPrescriptions = [
  {
    id: '1',
    doctor: 'Dr. Maria Santos',
    date: 'Feb 15, 2026',
    items: 3,
    status: 'Filled',
  },
  {
    id: '2',
    doctor: 'Dr. Jose Reyes',
    date: 'Jan 28, 2026',
    items: 2,
    status: 'Filled',
  },
  {
    id: '3',
    doctor: 'Dr. Ana Lim',
    date: 'Jan 10, 2026',
    items: 1,
    status: 'Expired',
  },
];

export default function PrescriptionScanScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAnalyzing) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Rotate animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Progress animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  }, [isAnalyzing]);

  const pickImage = async (useCamera: boolean) => {
    let result;

    if (useCamera) {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return;

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: true,
      });
    } else {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return;

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: true,
      });
    }

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const analyzePrescription = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setSelectedImage(null);
      router.push('/prescription/results');
    }, 2800);
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Scan Prescription</Text>
          <View style={styles.headerRight}>
            <Pressable style={styles.helpButton}>
              <Ionicons name="help-circle-outline" size={24} color={Colors.light.textSecondary} />
            </Pressable>
          </View>
        </View>

        {/* AI Badge */}
        <View style={styles.aiBadgeContainer}>
          <View style={styles.aiBadge}>
            <Ionicons name="sparkles" size={16} color="#00A86B" />
            <Text style={styles.aiBadgeText}>Powered by Mercury+ AI</Text>
          </View>
        </View>

        {/* Camera / Upload Area */}
        {isAnalyzing ? (
          <View style={styles.analyzingContainer}>
            <Animated.View style={[styles.analyzingIconContainer, { transform: [{ scale: pulseAnim }] }]}>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Ionicons name="scan" size={48} color="#00A86B" />
              </Animated.View>
            </Animated.View>
            <Text style={styles.analyzingTitle}>AI is reading your prescription...</Text>
            <Text style={styles.analyzingSubtext}>Identifying medicines, dosages, and frequencies</Text>
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, { width: progressWidth as any }]} />
            </View>
            <View style={styles.analyzingSteps}>
              <View style={styles.stepRow}>
                <Ionicons name="checkmark-circle" size={20} color="#00A86B" />
                <Text style={styles.stepText}>Image quality verified</Text>
              </View>
              <View style={styles.stepRow}>
                <Ionicons name="checkmark-circle" size={20} color="#00A86B" />
                <Text style={styles.stepText}>Text extracted via OCR</Text>
              </View>
              <View style={styles.stepRow}>
                <ActivityIndicator size="small" color="#00A86B" />
                <Text style={styles.stepText}>Matching medicines in database...</Text>
              </View>
            </View>
          </View>
        ) : selectedImage ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            <Pressable style={styles.removeImageButton} onPress={() => setSelectedImage(null)}>
              <Ionicons name="close-circle" size={32} color="#FFF" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.uploadArea}>
            <View style={styles.uploadIconContainer}>
              <Ionicons name="document-text-outline" size={48} color="#00A86B" />
            </View>
            <Text style={styles.uploadTitle}>Scan Your Prescription</Text>
            <Text style={styles.uploadSubtext}>Take a clear photo of your prescription</Text>

            <View style={styles.uploadButtons}>
              <Pressable style={styles.cameraButton} onPress={() => pickImage(true)}>
                <Ionicons name="camera" size={22} color="#FFF" />
                <Text style={styles.cameraButtonText}>Take Photo</Text>
              </Pressable>
              <Pressable style={styles.galleryButton} onPress={() => pickImage(false)}>
                <Ionicons name="images-outline" size={22} color="#00A86B" />
                <Text style={styles.galleryButtonText}>Upload from Gallery</Text>
              </Pressable>
            </View>

            <View style={styles.tipsContainer}>
              <View style={styles.tipRow}>
                <Ionicons name="sunny-outline" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.tipText}>Use good lighting</Text>
              </View>
              <View style={styles.tipRow}>
                <Ionicons name="crop-outline" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.tipText}>Keep flat and centered</Text>
              </View>
              <View style={styles.tipRow}>
                <Ionicons name="text-outline" size={16} color={Colors.light.textSecondary} />
                <Text style={styles.tipText}>Ensure text is readable</Text>
              </View>
            </View>
          </View>
        )}

        {/* Analyze Button */}
        {selectedImage && !isAnalyzing && (
          <View style={styles.analyzeSection}>
            <Pressable style={styles.analyzeButton} onPress={analyzePrescription}>
              <Ionicons name="sparkles" size={20} color="#FFF" />
              <Text style={styles.analyzeButtonText}>Analyze Prescription</Text>
            </Pressable>
          </View>
        )}

        {/* Recent Prescriptions */}
        {!isAnalyzing && (
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recent Prescriptions</Text>
            {recentPrescriptions.map((rx) => (
              <Pressable
                key={rx.id}
                style={styles.recentCard}
                onPress={() => router.push('/prescription/results')}
              >
                <View style={styles.recentIconContainer}>
                  <Ionicons name="document-text" size={22} color="#00A86B" />
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentDoctor}>{rx.doctor}</Text>
                  <Text style={styles.recentMeta}>
                    {rx.date} &middot; {rx.items} item{rx.items > 1 ? 's' : ''}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    rx.status === 'Filled' ? styles.filledBadge : styles.expiredBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      rx.status === 'Filled' ? styles.filledText : styles.expiredText,
                    ]}
                  >
                    {rx.status}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </Pressable>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  helpButton: {
    padding: 4,
  },
  aiBadgeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E6F7EF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  aiBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00A86B',
  },
  uploadArea: {
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#E6F7EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 6,
  },
  uploadSubtext: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 24,
  },
  uploadButtons: {
    width: '100%',
    gap: 12,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#00A86B',
    paddingVertical: 14,
    borderRadius: 14,
  },
  cameraButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#00A86B',
  },
  galleryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A86B',
  },
  tipsContainer: {
    marginTop: 24,
    gap: 10,
    width: '100%',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  previewContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 320,
    resizeMode: 'contain',
  },
  removeImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  analyzeSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#00A86B',
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  analyzeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },
  analyzingContainer: {
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  analyzingIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E6F7EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  analyzingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 6,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00A86B',
    borderRadius: 3,
  },
  analyzingSteps: {
    width: '100%',
    gap: 14,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  recentSection: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 14,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  recentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E6F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recentDoctor: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
  },
  recentMeta: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  filledBadge: {
    backgroundColor: '#D1FAE5',
  },
  expiredBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  filledText: {
    color: '#059669',
  },
  expiredText: {
    color: '#DC2626',
  },
});
