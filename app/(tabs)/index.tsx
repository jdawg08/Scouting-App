import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TextInput } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { useScoutingData } from '../../context/ScoutingContext';
import { config_data } from './2025/reefscape_config.js';

export default function PreMatchScreen() {
  const router = useRouter();
  const { scoutingData, updateScoutingData } = useScoutingData();
  const configJson = JSON.parse(config_data);

  const handleInputChange = (field: string, value: string) => {
    updateScoutingData({ [field]: value });
  };

  const handleNext = () => {
    router.push('/auton');
  };

  // Find the field configs from prematch section
  const eventConfig = configJson.prematch.find((field: any) => field.code === 'e');
  const matchConfig = configJson.prematch.find((field: any) => field.code === 'm');
  const teamConfig = configJson.prematch.find((field: any) => field.code === 't');
  const scouterConfig = configJson.prematch.find((field: any) => field.code === 's');
  const robotConfig = configJson.prematch.find((field: any) => field.code === 'r');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{configJson.title}</Text>
        
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{eventConfig?.name || 'Event Code'}</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.eventCode}
              onChangeText={(value) => handleInputChange('eventCode', value)}
              placeholder={`Enter ${eventConfig?.name.toLowerCase() || 'event code'}`}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{matchConfig?.name || 'Match Number'}</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.matchNumber}
              onChangeText={(value) => handleInputChange('matchNumber', value)}
              placeholder={`Enter ${matchConfig?.name.toLowerCase() || 'match number'}`}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{teamConfig?.name || 'Team Number'}</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.teamNumber}
              onChangeText={(value) => handleInputChange('teamNumber', value)}
              placeholder={`Enter ${teamConfig?.name.toLowerCase() || 'team number'}`}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{scouterConfig?.name || 'Scouter Name'}</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.scoutName}
              onChangeText={(value) => handleInputChange('scoutName', value)}
              placeholder={`Enter ${scouterConfig?.name.toLowerCase() || 'your name'}`}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{robotConfig?.name || 'Robot Position'}</Text>
            <TextInput
              style={styles.input}
              value={scoutingData.robotPosition}
              onChangeText={(value) => handleInputChange('robotPosition', value)}
              placeholder={`Enter ${robotConfig?.name.toLowerCase() || 'robot position'}`}
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
