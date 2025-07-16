import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DataManager, StorageService } from '@/services/storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [userData , setUserData] = useState<any>({});
  useEffect(()=>{
      DataManager.getData('user-data').then(res=>{
        if(res){
          setUserData(JSON.parse(res))
        }
      })
    },[])
    
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
          <Image
              source={{
                uri: `https://wklogo.blob.core.windows.net/logos-small/_${userData?.email?.[0]?.toLowerCase()}.png`,
              }}
              style={{ width: 60, height: 60, borderRadius: 100, marginTop:45 }}
            />
          <ThemedText type="subtitle" style={styles.headingText}>Email</ThemedText>
          <ThemedText type="subtitle" style={styles.bodyText}>{userData.email}</ThemedText>

          <ThemedView style={{display:'flex',flexDirection:'row'}}>

          <ThemedView style={{'marginRight':24}}>  
          <ThemedText type="subtitle" style={styles.headingText}>First name</ThemedText>
          <ThemedText type="subtitle" style={styles.bodyText}>{userData.first_name}</ThemedText>
          </ThemedView>

          <ThemedView>
          <ThemedText type="subtitle" style={styles.headingText}>Last name</ThemedText>
          <ThemedText type="subtitle" style={styles.bodyText}>{userData.last_name}</ThemedText>
          </ThemedView>

          </ThemedView>

          <ThemedText type="subtitle" style={styles.headingText}>Company name</ThemedText>
          <ThemedText type="subtitle" style={styles.bodyText}>{userData.org_name}</ThemedText>
          
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
  headingText:{
    color:'#ffffff',
    fontSize:18,
    fontWeight:500,
    marginTop:24
  },
  bodyText:{
    color:'#ffffff',
    fontSize:16,
    fontWeight:500,
    marginTop:8
  }
});