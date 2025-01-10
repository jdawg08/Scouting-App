import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScoutingData {
  // Pre-match data
  eventCode: string;
  matchNumber: string;
  teamNumber: string;
  scoutName: string;
  robotPosition: string;

  // Autonomous data
  autonSpeakerScored: number;
  autonAmpScored: number;
  autonNotePickup: number;
  mobility: boolean;

  // Teleop data
  teleopSpeakerScored: number;
  teleopAmpScored: number;
  teleopNotePickup: number;
  scoringCycles: number[];

  // Endgame data
  onStage: boolean;
  spotlit: boolean;
  harmony: boolean;
  trap: boolean;
  parked: boolean;
  driverSkill: number;
  defenseRating: number;
  speedRating: number;
}

interface ScoutingContextType {
  scoutingData: ScoutingData;
  updateScoutingData: (data: Partial<ScoutingData>) => void;
  clearScoutingData: () => void;
}

const defaultScoutingData: ScoutingData = {
  // Pre-match defaults
  eventCode: '',
  matchNumber: '',
  teamNumber: '',
  scoutName: '',
  robotPosition: '',

  // Autonomous defaults
  autonSpeakerScored: 0,
  autonAmpScored: 0,
  autonNotePickup: 0,
  mobility: false,

  // Teleop defaults
  teleopSpeakerScored: 0,
  teleopAmpScored: 0,
  teleopNotePickup: 0,
  scoringCycles: [],

  // Endgame defaults
  onStage: false,
  spotlit: false,
  harmony: false,
  trap: false,
  parked: false,
  driverSkill: 1,
  defenseRating: 1,
  speedRating: 1,
};

const ScoutingContext = createContext<ScoutingContextType | undefined>(undefined);

export function ScoutingProvider({ children }: { children: ReactNode }) {
  const [scoutingData, setScoutingData] = useState<ScoutingData>(defaultScoutingData);

  const updateScoutingData = (newData: Partial<ScoutingData>) => {
    setScoutingData(prev => ({
      ...prev,
      ...newData,
    }));
  };

  const clearScoutingData = () => {
    setScoutingData(defaultScoutingData);
  };

  return (
    <ScoutingContext.Provider value={{ scoutingData, updateScoutingData, clearScoutingData }}>
      {children}
    </ScoutingContext.Provider>
  );
}

export function useScoutingData() {
  const context = useContext(ScoutingContext);
  if (context === undefined) {
    throw new Error('useScoutingData must be used within a ScoutingProvider');
  }
  return context;
} 