import store from "../store/index.js";
import Observer from "./observer.js";

class Speaker {
  voices = [];
  speaking = null;
  mute = true;

  constructor() {
    speechSynthesis.addEventListener("voiceschanged", () => {
      this.voices = speechSynthesis.getVoices();
    });
    this.speaking = new Observer();
  }

  speak(text) {
    if (speechSynthesis.speaking) return;

    var msg = new SpeechSynthesisUtterance();
    msg.voice = this.voices[store.state.selectedSpeaker];
    msg.volume = this.mute ? 0 : 1; // From 0 to 1
    msg.rate = 1; // From 0.1 to 10
    msg.pitch = 1; // From 0 to 2
    msg.text = text;
    msg.lang = "en";
    msg.onend = () => {
      this.speaking.publish(false);
    };
    this.speaking.publish(true);

    this.stopIfSpeak();

    speechSynthesis.speak(msg);
  }

  stopIfSpeak() {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
  }
}

export default new Speaker();
