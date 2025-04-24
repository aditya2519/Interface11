<template>
  <div>
    <h1>Polling System</h1>
    <div v-for="poll in polls" :key="poll.id">
      <h3>{{ poll.question }}</h3>
      <div v-for="option in poll.options" :key="option.id">
        <input type="radio" :value="option.id" v-model="selectedOption[poll.id]" />
        <label>{{ option.text }}</label>
      </div>
      <button @click="votePoll(poll.id)">Vote</button>
      <button @click="getPollResults(poll.id)">View Results</button>
      <button @click="deletePoll(poll.id)">Delete Poll</button>
      <div v-if="results[poll.id]">
        <h4>Results:</h4>
        <ul>
          <li v-for="(votes, option) in results[poll.id]" :key="option">{{ option }}: {{ votes }}</li>
        </ul>
      </div>
    </div>

    <h2>Create a Poll</h2>
    <input v-model="newPoll.question" placeholder="Poll question" />
    <div v-for="(option, index) in newPoll.options" :key="index">
      <input v-model="newPoll.options[index]" placeholder="Option" />
    </div>
    <button @click="addOption">Add Option</button>
    <button @click="submitPoll">Create Poll</button>
  </div>
</template>

<script>
import { getPolls, createPoll, vote, getResults, deletePoll } from "./services/api";

export default {
  data() {
    return {
      polls: [],
      selectedOption: {},
      results: {},
      newPoll: { question: "", options: ["", ""] }, // Default 2 options
    };
  },
  async mounted() {
    this.polls = await getPolls();
  },
  methods: {
    async votePoll(pollId) {
      if (!this.selectedOption[pollId]) return alert("Choose an option!");
      await vote(pollId, this.selectedOption[pollId], "User1");
      alert("Vote recorded!");
    },
    async getPollResults(pollId) {
      this.results[pollId] = await getResults(pollId);
    },
    async deletePoll(pollId) {
      await deletePoll(pollId);
      this.polls = this.polls.filter((poll) => poll.id !== pollId);
    },
    addOption() {
      this.newPoll.options.push("");
    },
    async submitPoll() {
      await createPoll(this.newPoll.question, this.newPoll.options);
      alert("Poll created!");
      this.newPoll = { question: "", options: ["", ""] };
      this.polls = await getPolls();
    },
  },
};
</script>
