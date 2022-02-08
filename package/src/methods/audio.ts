export default {
  methods: {
    // reproduceAudio

    reproduceAudio(path: string): void {
      if (path) {
        const audio = new Audio(path);
        audio.play();
      }
    },
  }, // methods
}; // export default