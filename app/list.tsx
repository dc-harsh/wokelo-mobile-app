import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface ListItem {
  id: string;
  title: string;
  description: string;
}

export default function ListScreen() {

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.h1}>Industry Primer</ThemedText>
      <ThemedView>
        <TextInput
          value=''
          style={{}}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingTop:50
  },
  h1:{
    fontWeight:500,
    fontSize:22
  }
});