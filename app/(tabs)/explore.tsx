import { StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Create Workflow</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.content}>
        <ThemedView style={styles.iconContainer}>
          <IconSymbol size={80} name="plus.circle.fill" color="#0a7ea4" />
        </ThemedView>
        
        <ThemedView style={styles.formContainer}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Workflow Name
            </ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter workflow name"
              placeholderTextColor="#999"
              value={workflowName}
              onChangeText={setWorkflowName}
            />
          </ThemedView>
          
          <ThemedView style={styles.inputContainer}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Description (Optional)
            </ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter workflow description"
              placeholderTextColor="#999"
              value={workflowDescription}
              onChangeText={setWorkflowDescription}
              multiline
              numberOfLines={4}
            />
          </ThemedView>
          
          <TouchableOpacity style={styles.createButton} onPress={handleCreateWorkflow}>
            <ThemedText style={styles.buttonText}>Create Workflow</ThemedText>
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
