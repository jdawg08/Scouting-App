import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { FontAwesome } from '@expo/vector-icons';
import { config_data } from './2025/reefscape_config.js';
import { useScoutingData } from '../../context/ScoutingContext';

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
  const configJson = JSON.parse(config_data);
  const autonConfig = configJson.auton;
  const { scoutingData, updateScoutingData } = useScoutingData();

  const [scores, setScores] = useState({
    coralL1: scoutingData.autonCoralL1,
    coralL2: scoutingData.autonCoralL2,
    coralL3: scoutingData.autonCoralL3,
    coralL4: scoutingData.autonCoralL4,
    processorScore: scoutingData.autonProcessorScore,
    netScore: scoutingData.autonNetScore,
    mobility: scoutingData.mobility,
    crossedLine: scoutingData.crossedLine || false,
    coralScoredLocation: scoutingData.coralScoredLocation || null,
  });

  // Update local state when context changes (e.g. when form is cleared)
  useEffect(() => {
    setScores({
      coralL1: scoutingData.autonCoralL1,
      coralL2: scoutingData.autonCoralL2,
      coralL3: scoutingData.autonCoralL3,
      coralL4: scoutingData.autonCoralL4,
      processorScore: scoutingData.autonProcessorScore,
      netScore: scoutingData.autonNetScore,
      mobility: scoutingData.mobility,
      crossedLine: scoutingData.crossedLine || false,
      coralScoredLocation: scoutingData.coralScoredLocation || null,
    });
  }, [scoutingData]);

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

  const toggleCrossedLine = () => {
    setScores(prev => ({
      ...prev,
      crossedLine: !prev.crossedLine
    }));
  };

  const handleNext = () => {
    // Save auton data to context
    updateScoutingData({
      autonCoralL1: scores.coralL1,
      autonCoralL2: scores.coralL2,
      autonCoralL3: scores.coralL3,
      autonCoralL4: scores.coralL4,
      autonProcessorScore: scores.processorScore,
      autonNetScore: scores.netScore,
      mobility: scores.mobility,
      crossedLine: scores.crossedLine,
      coralScoredLocation: scores.coralScoredLocation,
    });
    router.push('/teleop');
  };

  // Find specific configurations
  const leaveStartingLineConfig = autonConfig.find((field: any) => field.code === 'al');
  const coralL1Config = autonConfig.find((field: any) => field.code === 'ac1');
  const coralL2Config = autonConfig.find((field: any) => field.code === 'ac2');
  const coralL3Config = autonConfig.find((field: any) => field.code === 'ac3');
  const coralL4Config = autonConfig.find((field: any) => field.code === 'ac4');
  const processorScoreConfig = autonConfig.find((field: any) => field.code === 'aps');
  const netScoreConfig = autonConfig.find((field: any) => field.code === 'ans');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{configJson.page_title} - Autonomous</Text>
      
      <View style={styles.content}>
        <Counter
          label={coralL1Config?.name || "Coral L1"}
          value={scores.coralL1}
          onIncrement={() => handleIncrement('coralL1')}
          onDecrement={() => handleDecrement('coralL1')}
        />

        <Counter
          label={coralL2Config?.name || "Coral L2"}
          value={scores.coralL2}
          onIncrement={() => handleIncrement('coralL2')}
          onDecrement={() => handleDecrement('coralL2')}
        />

        <Counter
          label={coralL3Config?.name || "Coral L3"}
          value={scores.coralL3}
          onIncrement={() => handleIncrement('coralL3')}
          onDecrement={() => handleDecrement('coralL3')}
        />

        <Counter
          label={coralL4Config?.name || "Coral L4"}
          value={scores.coralL4}
          onIncrement={() => handleIncrement('coralL4')}
          onDecrement={() => handleDecrement('coralL4')}
        />

        <Counter
          label={processorScoreConfig?.name || "Processor Score"}
          value={scores.processorScore}
          onIncrement={() => handleIncrement('processorScore')}
          onDecrement={() => handleDecrement('processorScore')}
        />

        <Counter
          label={netScoreConfig?.name || "Net Score"}
          value={scores.netScore}
          onIncrement={() => handleIncrement('netScore')}
          onDecrement={() => handleDecrement('netScore')}
        />

        <TouchableOpacity 
          style={[styles.mobilityButton, scores.mobility && styles.mobilityActive]}
          onPress={toggleMobility}
        >
          <Text style={styles.mobilityText}>
            {leaveStartingLineConfig?.name || "Leave Starting Line"} {scores.mobility ? '✓' : '✗'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.mobilityButton, scores.crossedLine && styles.mobilityActive]}
          onPress={toggleCrossedLine}
        >
          <Text style={styles.mobilityText}>
            Robot crossed Starting Line {scores.crossedLine ? '✓' : '✗'}
          </Text>
        </TouchableOpacity>

        <View style={styles.locationContainer}>
          <Text style={styles.locationTitle}>Coral Scored Location</Text>
          <View style={styles.locationButtons}>
            <TouchableOpacity 
              style={[styles.locationButton, scores.coralScoredLocation === 'barge' && styles.locationActive]}
              onPress={() => setScores(prev => ({ ...prev, coralScoredLocation: 'barge' }))}
            >
              <Text style={[styles.locationText, scores.coralScoredLocation === 'barge' && styles.locationTextActive]}>
                Barge Side
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.locationButton, scores.coralScoredLocation === 'processor' && styles.locationActive]}
              onPress={() => setScores(prev => ({ ...prev, coralScoredLocation: 'processor' }))}
            >
              <Text style={[styles.locationText, scores.coralScoredLocation === 'processor' && styles.locationTextActive]}>
                Processor Side
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.locationButton, scores.coralScoredLocation === 'both' && styles.locationActive]}
              onPress={() => setScores(prev => ({ ...prev, coralScoredLocation: 'both' }))}
            >
              <Text style={[styles.locationText, scores.coralScoredLocation === 'both' && styles.locationTextActive]}>
                Both Sides
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFEFE',
  },
  content: {
    gap: 20,
    paddingBottom: 80,
  },
  counterContainer: {
    backgroundColor: '#413838',
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FEFEFE',
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
    color: '#F8F8F9',
  },
  mobilityButton: {
    backgroundColor: '#FF0D0D',
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
    color: '#000000',
  },
  button: {
    marginTop: 20,
  },
  locationContainer: {
    backgroundColor: '#413838',
    padding: 15,
    borderRadius: 10,
  },
  locationTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FEFEFE',
    textAlign: 'center',
  },
  locationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  locationButton: {
    flex: 1,
    backgroundColor: '#2F2F2F',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  locationActive: {
    backgroundColor: '#2196F3',
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FEFEFE',
  },
  locationTextActive: {
    color: '#FFFFFF',
  },
}); 