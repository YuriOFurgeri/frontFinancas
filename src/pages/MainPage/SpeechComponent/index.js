// SpeechComponent.js
import React, { useState, useEffect } from 'react';
import nlp from 'compromise';

const SpeechComponent = ({ onTranscriptChange }) => {
  const [recognitionActive, setRecognitionActive] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.interimResults = true;
    recognition.lang = "pt-BR";
    recognition.continuous = false;

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const spokenText = event.results[i][0].transcript.trim();
        setTranscript(spokenText);
        onTranscriptChange(spokenText);
      }
    };

    recognition.onend = () => {
      setRecognitionActive(false);
    };

    if (recognitionActive) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [recognitionActive, onTranscriptChange]);

  const handleMicButtonClick = () => {
    setRecognitionActive(true);
  };

  return (
    <div>
      {/* Botão do microfone para iniciar o reconhecimento de voz */}
      <button className='btn' onClick={handleMicButtonClick}>
        <i className="bi bi-mic-fill h1 text-primary"></i>
      </button>
      
      {/* Restante do componente */}
    </div>
  );
};

export default SpeechComponent;
