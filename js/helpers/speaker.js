class Speaker {
  voices = [];

  constructor() {
    speechSynthesis.addEventListener("voiceschanged", () => {
      this.voices = speechSynthesis.getVoices();
    });
  }

  speak(text) {
    if (speechSynthesis.speaking) return;

    var msg = new SpeechSynthesisUtterance();
    msg.voice = this.voices[15];
    msg.volume = 1; // From 0 to 1
    msg.rate = 1; // From 0.1 to 10
    msg.pitch = 1; // From 0 to 2
    msg.text = text;
    msg.lang = "en";

    speechSynthesis.speak(msg);
  }

  stopIfSpeak() {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
  }
}

export default new Speaker();
