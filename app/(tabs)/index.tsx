import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { useScoutingData } from '../../context/ScoutingContext';

export default function PreMatchScreen() {
  const router = useRouter();
  const { scoutingData, updateScoutingData } = useScoutingData();

  const handleInputChange = (field: string, value: string) => {
    updateScoutingData({ [field]: value });
  };

  const handleNext = () => {
    router.push('/auton');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pre-Match Scouting</Text>
        
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Code</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.eventCode}
              onChangeText={(value) => handleInputChange('eventCode', value)}
              placeholder="Enter event code"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Match Number</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.matchNumber}
              onChangeText={(value) => handleInputChange('matchNumber', value)}
              placeholder="Enter match number"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Team Number</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.teamNumber}
              onChangeText={(value) => handleInputChange('teamNumber', value)}
              placeholder="Enter team number"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Scout Name</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.scoutName}
              onChangeText={(value) => handleInputChange('scoutName', value)}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Robot Position</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.robotPosition}
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
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
