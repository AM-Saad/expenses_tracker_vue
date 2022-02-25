<template>
     <div>
         <p><button type="button" @click="runSpeechRecognition()">Speech to Text</button> &nbsp; <span id="action"></span></p>
        <div id="output" class="hide"></div>
      </div>
</template>

    
<script>
import { mapState } from "vuex";

export default {
  name: "CreateByVoice",
  computed: {
    ...mapState("expenses", ["categories"]),

    combinedcategories() {
      return [
        ...this.categories,
        ...["advertising", "wages", "utilities", "rent"]
      ];
    }
  },
  methods: {
    runSpeechRecognition() {
      // get output div reference
      const output = document.getElementById("output");
      // get action element reference
      const action = document.getElementById("action");
      // new speech recognition object
      const _comp = this;
      const SpeechRecognition = window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();

      // This runs when the speech recognition service starts
      recognition.onstart = function() {
        action.innerHTML = "<small>listening, please speak...</small>";
      };

      recognition.onspeechend = function() {
        action.innerHTML =
          "<small>stopped listening, hope you are done...</small>";
        recognition.stop();
      };

      // This runs when the speech recognition service returns result
      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;

        output.innerHTML =
          "<b>Text:</b> " +
          transcript +
          "<br/> <b>Confidence:</b> " +
          confidence * 100 +
          "%";
        output.classList.remove("hide");
        _comp.checkTranscript(transcript);
      };

      // start recognition
      recognition.start();
    },
    checkTranscript(transcript) {
      const findCategory = this.findCommon(transcript, this.combinedcategories.join('|'));
      console.log(findCategory);    
    },
    findCommon(str1, str2) {
      const s1 = [...str1];
      const s2 = [...str2];
      const arr = Array(s2.length + 1)
        .fill(null)
        .map(() => {
          return Array(s1.length + 1).fill(null);
        });
      for (let j = 0; j <= s1.length; j += 1) {
        arr[0][j] = 0;
      }
      for (let i = 0; i <= s2.length; i += 1) {
        arr[i][0] = 0;
      }
      let len = 0;
      let col = 0;
      let row = 0;
      for (let i = 1; i <= s2.length; i += 1) {
        for (let j = 1; j <= s1.length; j += 1) {
          if (s1[j - 1] === s2[i - 1]) {
            arr[i][j] = arr[i - 1][j - 1] + 1;
          } else {
            arr[i][j] = 0;
          }
          if (arr[i][j] > len) {
            len = arr[i][j];
            col = j;
            row = i;
          }
        }
      }
      if (len === 0) {
        return "";
      }
      let res = "";
      while (arr[row][col] > 0) {
        res = s1[col - 1] + res;
        row -= 1;
        col -= 1;
      }
      return res;
    }
  }
};
</script>

<style scoped>
</style>
