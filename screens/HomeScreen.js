import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const HomeScreen = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [reason, setReason] = useState('');

  const handleStartSurvey = () => {
    navigation.navigate('Survey', { age, gender, reason });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Age:</Text>
      <Picker selectedValue={age} onValueChange={itemValue => setAge(itemValue)}>
        <Picker.Item label="Select Age" value="" />
        <Picker.Item label="0-12" value="0-12" />
        <Picker.Item label="13-19" value="13-19" />
        <Picker.Item label="20-35" value="20-35" />
        <Picker.Item label="36-50" value="36-50" />
        <Picker.Item label="51+" value="51+" />
      </Picker>

      <Text style={styles.label}>Select Gender:</Text>
      <Picker selectedValue={gender} onValueChange={itemValue => setGender(itemValue)}>
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>Reason for Visit:</Text>
      <Picker selectedValue={reason} onValueChange={itemValue => setReason(itemValue)}>
        <Picker.Item label="Select Reason" value="" />
        <Picker.Item label="Fever" value="Fever" />
        <Picker.Item label="Cough" value="Cough" />
        <Picker.Item label="Stomach Pain" value="Stomach Pain" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Button title="Start Survey" onPress={handleStartSurvey} disabled={!age || !gender || !reason} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    marginTop: 0,
    fontSize: 18,
  },
});

export default HomeScreen;
