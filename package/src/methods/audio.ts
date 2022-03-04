export default {
  // reproduceAudio

  reproduceAudio(path: string): void {
    if (path) {
      const audio = new Audio(path);
      audio.play();
    }
  },
}; // export default