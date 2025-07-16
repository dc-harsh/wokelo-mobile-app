import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StorageService } from '@/services/storage';

interface ListItem {
  id: string;
  title: string;
  description: string;
}

export default function ListScreen() {
  const [items, setItems] = useState<ListItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Sample data - replace with actual API call
    const sampleItems: ListItem[] = [
      { id: '1', title: 'Item 1', description: 'Description for item 1' },
      { id: '2', title: 'Item 2', description: 'Description for item 2' },
      { id: '3', title: 'Item 3', description: 'Description for item 3' },
      { id: '4', title: 'Item 4', description: 'Description for item 4' },
      { id: '5', title: 'Item 5', description: 'Description for item 5' },
    ];
    
    setItems(sampleItems);
  }, []);

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

  const renderItem = ({ item }: { item: ListItem }) => (
    <ThemedView style={styles.itemContainer}>
      <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
      <ThemedText style={styles.description}>{item.description}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Items List</ThemedText>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  description: {
    marginTop: 4,
    opacity: 0.7,
  },
});