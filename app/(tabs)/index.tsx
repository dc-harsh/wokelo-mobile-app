import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface Notebook {
  id: string;
  title: string;
  createdDate: string;
  type: string;
  status: 'Viewed' | 'Unread';
}

const mockNotebooks: Notebook[] = [
  {
    id: '1',
    title: 'Oracle',
    createdDate: '2024-01-15',
    type: 'Company Research',
    status: 'Viewed',
  },
  {
    id: '2',
    title: 'Healthcare',
    createdDate: '2024-01-12',
    type: 'Industry Research',
    status: 'Unread',
  },
  {
    id: '3',
    title: 'Microsoft',
    createdDate: '2024-01-10',
    type: 'Company Research',
    status: 'Viewed',
  },
  {
    id: '4',
    title: 'Technology Trends',
    createdDate: '2024-01-08',
    type: 'Industry Research',
    status: 'Unread',
  },
];

export default function NotebooksScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notebooks] = useState<Notebook[]>(mockNotebooks);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<TextInput>(null);
  const searchAnimation = useRef(new Animated.Value(0)).current;

  const filteredNotebooks = notebooks.filter(notebook =>
    notebook.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    
    Animated.timing(searchAnimation, {
      toValue: isSearchExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (!isSearchExpanded) {
        searchInputRef.current?.focus();
      }
    });
  };

  const closeSearch = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
    
    Animated.timing(searchAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderNotebook = ({ item }: { item: Notebook }) => (
    <ThemedView style={styles.notebookCard}>
      <ThemedView style={styles.notebookContent}>
        <ThemedView style={styles.leftColumn}>
          <ThemedText type="defaultSemiBold" style={styles.notebookTitle}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.createdDate}>
            Created: {new Date(item.createdDate).toLocaleDateString()}
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.middleColumn}>
          <ThemedText style={styles.notebookType}>{item.type}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.rightColumn}>
          <View style={[
            styles.statusBadge,
            item.status === 'Viewed' ? styles.viewedBadge : styles.unreadBadge
          ]}>
            <ThemedText style={[
              styles.statusText,
              item.status === 'Viewed' ? styles.viewedText : styles.unreadText
            ]}>
              {item.status}
            </ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.topBar}>
          <ThemedView style={styles.leftHeader}>
            <IconSymbol size={24} name="line.horizontal.3" color="#333" />
            <ThemedText type="title" style={styles.headerTitle}>Notebooks</ThemedText>
          </ThemedView>
          <ThemedView style={styles.rightHeader}>
            <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
              <IconSymbol size={24} name="magnifyingglass" color="#333" />
            </TouchableOpacity>
            <View style={styles.notificationContainer}>
              <IconSymbol size={24} name="bell.fill" color="#333" />
              <View style={styles.notificationDot} />
            </View>
          </ThemedView>
        </ThemedView>
        
        {/* Expandable Search Bar */}
        <Animated.View style={[
          styles.expandableSearchContainer,
          {
            height: searchAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 60],
            }),
            opacity: searchAnimation,
          }
        ]}>
          <ThemedView style={styles.searchInputContainer}>
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search notebooks by name"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={closeSearch} style={styles.closeButton}>
              <IconSymbol size={20} name="xmark" color="#666" />
            </TouchableOpacity>
          </ThemedView>
        </Animated.View>
      </ThemedView>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Welcome Banner */}
        <LinearGradient
          colors={['#E3F2FD', '#F3E5F5']}
          style={styles.welcomeBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ThemedText type="title" style={styles.welcomeTitle}>
            Welcome, User!
          </ThemedText>
          <ThemedText style={styles.welcomeSubtext}>
            How about starting with a new workflow?
          </ThemedText>
        </LinearGradient>

        {/* Section Title */}
        <ThemedView style={styles.contentSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Notebooks</ThemedText>
          
          {/* Notebook List */}
          <ThemedView style={styles.notebookContainer}>
            {filteredNotebooks.map((item) => (
              <ThemedView key={item.id} style={styles.notebookCard}>
                <ThemedView style={styles.notebookContent}>
                  <ThemedView style={styles.leftColumn}>
                    <ThemedText type="defaultSemiBold" style={styles.notebookTitle}>
                      {item.title}
                    </ThemedText>
                    <ThemedText style={styles.createdDate}>
                      Created: {new Date(item.createdDate).toLocaleDateString()}
                    </ThemedText>
                  </ThemedView>
                  
                  <ThemedView style={styles.middleColumn}>
                    <ThemedText style={styles.notebookType}>{item.type}</ThemedText>
                  </ThemedView>
                  
                  <ThemedView style={styles.rightColumn}>
                    <View style={[
                      styles.statusBadge,
                      item.status === 'Viewed' ? styles.viewedBadge : styles.unreadBadge
                    ]}>
                      <ThemedText style={[
                        styles.statusText,
                        item.status === 'Viewed' ? styles.viewedText : styles.unreadText
                      ]}>
                        {item.status}
                      </ThemedText>
                    </View>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
  },
  searchButton: {
    padding: 4,
  },
  expandableSearchContainer: {
    overflow: 'hidden',
    marginTop: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
  stickySearchContainer: {
    position: 'relative',
    zIndex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flex: 1,
  },
  welcomeBanner: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#666',
    lineHeight: 20,
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notebookContainer: {
    gap: 16,
  },
  notebookCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
  },
  notebookContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 2,
  },
  middleColumn: {
    flex: 1,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  notebookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  createdDate: {
    fontSize: 12,
    color: '#666',
  },
  notebookType: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewedBadge: {
    backgroundColor: '#e8f5e8',
  },
  unreadBadge: {
    backgroundColor: '#ffe8e8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewedText: {
    color: '#2d7d32',
  },
  unreadText: {
    color: '#d32f2f',
  },
});
