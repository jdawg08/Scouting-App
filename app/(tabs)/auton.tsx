import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { FontAwesome } from '@expo/vector-icons';

interface CounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ label, value, onIncrement, onDecrement }) => (
  <View style={styles.counterContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.counterControls}>
      <TouchableOpacity onPress={onDecrement} style={styles.counterButton}>
        <FontAwesome name="minus" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.counterValue}>{value}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.counterButton}>
        <FontAwesome name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function AutonScreen() {
  const router = useRouter();
  const [scores, setScores] = useState({
    speakerScored: 0,
    ampScored: 0,
    notePickup: 0,
    mobility: false,
  });

  const handleIncrement = (key: keyof typeof scores) => {
    if (typeof scores[key] === 'number') {
      setScores(prev => ({
        ...prev,
        [key]: (prev[key] as number) + 1
      }));
    }
  };

  const handleDecrement = (key: keyof typeof scores) => {
    if (typeof scores[key] === 'number' && scores[key] > 0) {
      setScores(prev => ({
        ...prev,
        [key]: (prev[key] as number) - 1
      }));
    }
  };

  const toggleMobility = () => {
    setScores(prev => ({
      ...prev,
      mobility: !prev.mobility
    }));
  };

  const handleNext = () => {
    // TODO: Save auton data
    router.push('/teleop');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Autonomous Period</Text>
      
      <View style={styles.content}>
        <Counter
          label="Speaker Notes Scored"
          value={scores.speakerScored}
          onIncrement={() => handleIncrement('speakerScored')}
          onDecrement={() => handleDecrement('speakerScored')}
        />

        <Counter
          label="Amp Notes Scored"
          value={scores.ampScored}
          onIncrement={() => handleIncrement('ampScored')}
          onDecrement={() => handleDecrement('ampScored')}
        />

        <Counter
          label="Notes Picked Up"
          value={scores.notePickup}
          onIncrement={() => handleIncrement('notePickup')}
          onDecrement={() => handleDecrement('notePickup')}
        />

        <TouchableOpacity 
          style={[styles.mobilityButton, scores.mobility && styles.mobilityActive]}
          onPress={toggleMobility}
        >
          <Text style={styles.mobilityText}>
            Mobility {scores.mobility ? '✓' : '✗'}
          </Text>
        </TouchableOpacity>

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
  counterContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  counterButton: {
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
  mobilityButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  mobilityActive: {
    backgroundColor: '#4CAF50',
  },
  mobilityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
}); 