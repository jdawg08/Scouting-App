import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Share } from 'react-native';
import { Text } from '../../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../../components/ui/Button';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

export default function QRScreen() {
  const [matchData, setMatchData] = useState('');
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    // TODO: Gather all match data from previous screens
    const data = {
      timestamp: new Date().toISOString(),
      // Add all the match data here
    };
    const jsonData = JSON.stringify(data);
    setMatchData(jsonData);
    setQrValue(jsonData);
  }, []);

  const handleCopyData = async () => {
    await Clipboard.setStringAsync(matchData);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: matchData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    // TODO: Clear all match data and return to first screen
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Match Data QR Code</Text>
      
      <View style={styles.content}>
        <View style={styles.qrContainer}>
          {qrValue ? (
            <QRCode
              value={qrValue}
              size={250}
              backgroundColor="white"
              color="black"
            />
          ) : (
            <Text>Loading QR Code...</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleCopyData}
            style={styles.button}
            text="Copy Data"
          />
          
          <Button
            onPress={handleShare}
            style={styles.button}
            text="Share Data"
          />

          <Button
            onPress={handleClear}
            style={[styles.button, styles.clearButton]}
            text="Clear Form"
          />
        </View>

        <View style={styles.dataPreview}>
          <Text style={styles.dataPreviewTitle}>Data Preview:</Text>
          <ScrollView style={styles.dataScroll}>
            <Text style={styles.dataText}>
              {matchData ? JSON.stringify(JSON.parse(matchData), null, 2) : 'No data available'}
            </Text>
          </ScrollView>
        </View>
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
    alignItems: 'center',
    paddingBottom: 100,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    marginVertical: 5,
  },
  clearButton: {
    backgroundColor: '#f44336',
  },
  dataPreview: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  dataPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000000',
  },
  dataScroll: {
    maxHeight: 200,
  },
  dataText: {
    fontFamily: 'monospace',
    color:'#000000',
  },
}); 