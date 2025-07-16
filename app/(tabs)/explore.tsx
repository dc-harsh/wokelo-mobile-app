import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CreateWorkflowScreen() {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');

  const handleCreateWorkflow = () => {
    if (!workflowName.trim()) {
      Alert.alert('Error', 'Please enter a workflow name');
      return;
    }
    
    Alert.alert(
      'Success',
      `Workflow "${workflowName}" created successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setWorkflowName('');
            setWorkflowDescription('');
          }
        }
      ]
    );
  };
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Wokelo Workflows</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.iconContainer}>
          <IconSymbol size={80} name="plus.circle.fill" color="#0a7ea4" />
        </ThemedView>

        <ThemedView style={styles.formContainer}>
          {/* IP */}
          <TouchableOpacity
            style={{
              flex: 1,
              // justifyContent:'space-between',
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              backgroundColor: "#0a7ea4",
              borderRadius: 12,
            }}
            onPress={()=>{
              router.replace('/list?mode=ip')
            }}
          >
            <Image
              style={{ height: 50, width: 50 }}
              source={{
                uri: "https://wkemails.blob.core.windows.net/fe-application/industry primer.svg",
              }}
            />
            <ThemedText style={{marginLeft:12, fontWeight:'500'}}>Industry Primer</ThemedText>
          </TouchableOpacity>

          {/* CP */}
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              backgroundColor: "#0a7ea4",
              borderRadius: 12,
            }}
            onPress={()=>{
              router.replace('/list?mode=cp')
            }}
          >
            <Image
              style={{ height: 50, width: 50 }}
              source={{
                uri: "https://wkemails.blob.core.windows.net/fe-application/Company primer.svg",
              }}
            />
            <ThemedText style={{marginLeft:12, fontWeight:'500'}}>Company Primer</ThemedText>
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
