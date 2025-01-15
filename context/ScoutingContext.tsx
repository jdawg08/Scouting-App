import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScoutingData {
  // Pre-match data
  scouterInitials: string;
  event: string;
  matchLevel: string;
  matchNumber: string;
  teamNumber: string;
  robotPosition: string;

  // Autonomous data
  autonCoralL1: number;
  autonCoralL2: number;
  autonCoralL3: number;
  autonCoralL4: number;
  autonProcessorScore: number;
  autonNetScore: number;
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
  comments: string;
}

interface ScoutingContextType {
  scoutingData: ScoutingData;
  updateScoutingData: (data: Partial<ScoutingData>) => void;
  clearScoutingData: () => void;
}

const defaultScoutingData: ScoutingData = {
  // Pre-match defaults
  scouterInitials: '',
  event: '',
  matchLevel: '',
  matchNumber: '',
  teamNumber: '',
  robotPosition: '',

  // Autonomous defaults
  autonCoralL1: 0,
  autonCoralL2: 0,
  autonCoralL3: 0,
  autonCoralL4: 0,
  autonProcessorScore: 0,
  autonNetScore: 0,
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
  comments: '',
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