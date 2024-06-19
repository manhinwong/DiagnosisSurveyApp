import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import surveyData from '../surveyData.json';

const ResultScreen = ({ route }) => {
  const { responses } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Diagnosis</Text>
      <Text>{surveyData.DIAGNOSIS}</Text>

      <Text style={styles.header}>Treatment</Text>
      <FlatList
        data={surveyData.TREATMENT}
        renderItem={({ item }) => (
          <View style={styles.treatmentItem}>
            <Text>{item.text}</Text>
            {item.explanation && <Text style={styles.explanation}>{item.explanation}</Text>}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.header}>Follow-Up</Text>
      <Text>{surveyData.FOLLOWUP}</Text>

      <Text style={styles.header}>Prevention</Text>
      <Text>{surveyData.PREVENTION}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  treatmentItem: {
    marginVertical: 10,
  },
  explanation: {
    fontStyle: 'italic',
    color: 'gray',
  },
});

export default ResultScreen;
