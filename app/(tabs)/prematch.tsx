import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';

export default function PreMatchScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    eventCode: '',
    matchNumber: '',
    teamNumber: '',
    scoutName: '',
    robotPosition: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    // TODO: Validate and save data
    router.push('/auton');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pre-Match Scouting</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Code</Text>
          <TextInput
            style={styles.input}
            value={formData.eventCode}
            onChangeText={(value) => handleInputChange('eventCode', value)}
            placeholder="Enter event code"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Match Number</Text>
          <TextInput
            style={styles.input}
            value={formData.matchNumber}
            onChangeText={(value) => handleInputChange('matchNumber', value)}
            placeholder="Enter match number"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Team Number</Text>
          <TextInput
            style={styles.input}
            value={formData.teamNumber}
            onChangeText={(value) => handleInputChange('teamNumber', value)}
            placeholder="Enter team number"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Scout Name</Text>
          <TextInput
            style={styles.input}
            value={formData.scoutName}
            onChangeText={(value) => handleInputChange('scoutName', value)}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Robot Position</Text>
          <TextInput
            style={styles.input}
            value={formData.robotPosition}
            onChangeText={(value) => handleInputChange('robotPosition', value)}
            placeholder="Enter robot position"
          />
        </View>

        <Button
          onPress={handleNext}
          style={styles.button}
          text="Next"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    gap: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
  },
}); 