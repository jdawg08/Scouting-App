import React, { useState, useEffect } from 'react';
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

interface CycleTimerProps {
  label: string;
  isRunning: boolean;
  onToggle: () => void;
  cycles: number[];
  onUndo: () => void;
}

const CycleTimer: React.FC<CycleTimerProps> = ({ label, isRunning, onToggle, cycles, onUndo }) => (
  <View style={styles.timerContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.timerControls}>
      <TouchableOpacity 
        onPress={onToggle} 
        style={[styles.timerButton, isRunning && styles.timerButtonActive]}
      >
        <Text style={styles.timerButtonText}>
          {isRunning ? 'Stop Cycle' : 'Start Cycle'}
        </Text>
      </TouchableOpacity>
      {cycles.length > 0 && (
        <TouchableOpacity onPress={onUndo} style={styles.undoButton}>
          <FontAwesome name="undo" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
    {cycles.length > 0 && (
      <View style={styles.cycleStats}>
        <Text>Cycles: {cycles.length}</Text>
        <Text>Avg Time: {(cycles.reduce((a, b) => a + b, 0) / cycles.length).toFixed(1)}s</Text>
      </View>
    )}
  </View>
);

export default function TeleopScreen() {
  const router = useRouter();
  const [scores, setScores] = useState({
    speakerScored: 0,
    ampScored: 0,
    notePickup: 0,
  });

  const [cycleTimer, setCycleTimer] = useState({
    isRunning: false,
    startTime: 0,
    cycles: [] as number[],
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cycleTimer.isRunning) {
      interval = setInterval(() => {
        // Update timer display if needed
      }, 100);
    }
    return () => clearInterval(interval);
  }, [cycleTimer.isRunning]);

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

  const toggleCycleTimer = () => {
    if (cycleTimer.isRunning) {
      const cycleTime = (Date.now() - cycleTimer.startTime) / 1000;
      setCycleTimer(prev => ({
        isRunning: false,
        startTime: 0,
        cycles: [...prev.cycles, cycleTime],
      }));
    } else {
      setCycleTimer(prev => ({
        ...prev,
        isRunning: true,
        startTime: Date.now(),
      }));
    }
  };

  const undoCycle = () => {
    setCycleTimer(prev => ({
      ...prev,
      cycles: prev.cycles.slice(0, -1),
    }));
  };

  const handleNext = () => {
    // TODO: Save teleop data
    router.push('/endgame');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Teleop Period</Text>
      
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

        <CycleTimer
          label="Scoring Cycle"
          isRunning={cycleTimer.isRunning}
          onToggle={toggleCycleTimer}
          cycles={cycleTimer.cycles}
          onUndo={undoCycle}
        />

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
  timerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  timerButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  timerButtonActive: {
    backgroundColor: '#f44336',
  },
  timerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  undoButton: {
    backgroundColor: '#757575',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cycleStats: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 20,
  },
}); 