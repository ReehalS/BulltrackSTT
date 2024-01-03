// ../Record/index.js
import { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';

export const useVoice = () => {
  
  const [results, setResults] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    setIsRecording(true);
  };

  const onSpeechEnd = e => {
    setIsRecording(false);
  };

  const onSpeechResults = e => {
    setResults(e.value);
  };

  const startRecording = async () => {
    try {
      await Voice.start('en-IN');
      setResults([]);
      setIsRecording(true);
    } catch (e) {
      console.error(e);
    }
  };
  const stopRecording = async() => {
    try {
      await Voice.stop();
      await Voice.destroy();
      setIsRecording(false);
      setResults([]);
    } catch (error) {
      console.error(error);
    }
  };

  return { results, isRecording, startRecording, stopRecording };
};