import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StorageService } from '@/services/storage';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await StorageService.clearTokenData();
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.content}>
        <ThemedView style={styles.profileSection}>
          <IconSymbol size={80} name="person.circle.fill" color="#0a7ea4" />
          <ThemedText type="subtitle" style={styles.userName}>User Profile</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.buttonText}>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  userName: {
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 40,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});