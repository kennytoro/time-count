// Stopwatch functionality and dependcies
let startTime, elapsedTime = 0, interval;

const stopwatchDisplay = document.getElementById('stopwatch');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const continueButton = document.getElementById('continueBtn');
const transcriptionDisplay = document.getElementById('transcription');

// This is Function to format time
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// To Start the stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        stopwatchDisplay.textContent = formatTime(elapsedTime);
    }, 1000);

    // TO Disable start button, enable stop and continue buttons
    startButton.disabled = true;
    stopButton.disabled = false;
    continueButton.disabled = true;
}

// Stop the stopwatch
function stopStopwatch() {
    clearInterval(interval);
    // Disable stop, enable continue button
    stopButton.disabled = true;
    continueButton.disabled = false;
}

// Continue the stopwatch
function continueStopwatch() {
    startStopwatch();
}

// Web Speech API for real-time transcription
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

recognition.onresult = (event) => {
    let transcript = Array.from(event.results)
                          .map(result => result[0].transcript)
                          .join('');
    transcriptionDisplay.textContent = transcript;
};

// Start button functionality
startButton.addEventListener('click', () => {
    // Start the stopwatch and speech recognition
    startStopwatch();
    recognition.start();
});

// Stop button functionality
stopButton.addEventListener('click', () => {
    // Stop the stopwatch and speech recognition
    stopStopwatch();
    recognition.stop();
});

// Continue button functionality
continueButton.addEventListener('click', () => {
    // Continue the stopwatch and restart speech recognition
    continueStopwatch();
    recognition.start();
});
