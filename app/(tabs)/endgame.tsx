import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { FontAwesome } from '@expo/vector-icons';

interface ToggleButtonProps {
  label: string;
  value: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, value, onToggle }) => (
  <TouchableOpacity 
    style={[styles.toggleButton, value && styles.toggleButtonActive]}
    onPress={onToggle}
  >
    <Text style={[styles.toggleButtonText, value && styles.toggleButtonTextActive]}>
      {label} {value ? '✓' : '✗'}
    </Text>
  </TouchableOpacity>
);

interface RatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
}

const Rating: React.FC<RatingProps> = ({ label, value, onChange, max }) => (
  <View style={styles.ratingContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.ratingButtons}>
      {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
        <TouchableOpacity
          key={num}
          style={[styles.ratingButton, value === num && styles.ratingButtonActive]}
          onPress={() => onChange(num)}
        >
          <Text style={[styles.ratingButtonText, value === num && styles.ratingButtonTextActive]}>
            {num}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default function EndgameScreen() {
  const router = useRouter();
  const [endgameState, setEndgameState] = useState({
    onStage: false,
    spotlit: false,
    harmony: false,
    trap: false,
    parked: false,
    driverSkill: 1,
    defenseRating: 1,
    speedRating: 1,
  });

  const toggleState = (key: keyof typeof endgameState) => {
    if (typeof endgameState[key] === 'boolean') {
      setEndgameState(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const setRating = (key: keyof typeof endgameState, value: number) => {
    if (typeof endgameState[key] === 'number') {
      setEndgameState(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleNext = () => {
    // TODO: Save endgame data
    router.push('/qr');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Endgame Period</Text>
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stage Status</Text>
          <ToggleButton
            label="Robot On Stage"
            value={endgameState.onStage}
            onToggle={() => toggleState('onStage')}
          />
          <ToggleButton
            label="Robot Spotlit"
            value={endgameState.spotlit}
            onToggle={() => toggleState('spotlit')}
          />
          <ToggleButton
            label="Harmony Achieved"
            value={endgameState.harmony}
            onToggle={() => toggleState('harmony')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Final Position</Text>
          <ToggleButton
            label="Note in Trap"
            value={endgameState.trap}
            onToggle={() => toggleState('trap')}
          />
          <ToggleButton
            label="Robot Parked"
            value={endgameState.parked}
            onToggle={() => toggleState('parked')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Ratings</Text>
          <Rating
            label="Driver Skill"
            value={endgameState.driverSkill}
            onChange={(value) => setRating('driverSkill', value)}
            max={5}
          />
          <Rating
            label="Defense Rating"
            value={endgameState.defenseRating}
            onChange={(value) => setRating('defenseRating', value)}
            max={5}
          />
          <Rating
            label="Speed Rating"
            value={endgameState.speedRating}
            onChange={(value) => setRating('speedRating', value)}
            max={5}
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
  content: {
    gap: 20,
  },
  section: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  toggleButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  ratingContainer: {
    marginBottom: 15,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  ratingButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  ratingButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  ratingButtonText: {
    fontSize: 16,
    color: '#000',
  },
  ratingButtonTextActive: {
    color: '#fff',
  },
  button: {
    marginTop: 20,
  },
}); 