import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';
import surveyData from '../surveyData.json';



const SurveyScreen = ({ navigation, route }) => {
  const { age, gender, reason } = route.params;
  const [responses, setResponses] = useState({});
  const [surveyDataState, setSurveyDataState] = useState(surveyData);
  

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const openai_api_key = "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";
        const userData = { age, gender, reason };
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
          prompt: JSON.stringify(userData),
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.5,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openai_api_key}`,
          }
        });
        const result = JSON.parse(response.data.choices[0].text.trim());
        setSurveyDataState(result);
      } catch (error) {
        console.error('Error fetching survey data:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        Alert.alert("Error", "Failed to fetch survey data from ChatGPT API.");
      }
    };

    fetchSurveyData();
  }, [age, gender, reason]);

  const handleResponseChange = (questionIndex, answer) => {
    setResponses({ ...responses, [questionIndex]: answer });
  };

  const handleSurveySubmit = () => {
    console.log('Survey Responses:', responses);
    navigation.navigate('Result', { responses });
  };

  const renderQuestion = (item, index) => {
    switch (item.type) {
      case 'YN':
        return (
          <View key={index} style={styles.questionContainer}>
            <Text>{item.text}</Text>
            <Button title="Yes" onPress={() => handleResponseChange(index, 'Yes')} />
            <Button title="No" onPress={() => handleResponseChange(index, 'No')} />
          </View>
        );
      case 'MC':
        return (
          <View key={index} style={styles.questionContainer}>
            <Text>{item.text}</Text>
            {item.options.map((option, optIndex) => (
              <Button key={optIndex} title={option} onPress={() => handleResponseChange(index, option)} />
            ))}
          </View>
        );
      case 'FREE':
      case 'NUM':
        return (
          <View key={index} style={styles.questionContainer}>
            <Text>{item.text}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleResponseChange(index, text)}
              keyboardType={item.type === 'NUM' ? 'numeric' : 'default'}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={surveyDataState.QUESTIONS}
        renderItem={({ item, index }) => renderQuestion(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Submit Survey" onPress={handleSurveySubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
  questionContainer: {
    marginVertical: 10,
  },
});

export default SurveyScreen;
