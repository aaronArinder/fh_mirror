<template>
  <div class="questionnaire-component">
    <form>
      <input class="questions" v-model="firstName" placeholder="First Name">
      <input class="questions" v-model="lastName" placeholder="Last Name">
    </form>
    <p>First Name: {{firstName}}</p>
    <p>Last Name: {{lastName}}</p>
    <button @click='sendStuff()'>click?</button>
  </div>
</template>

<script>
export default {
  name: 'Questionnaire',
  props: {
    msg: String,
  },
  methods: {
    sendStuff() {
      this.$store.dispatch('updateHowdy', 'purple');
    }
  },
  computed: {
    howdy() {
      return this.$store.state.howdy;
    }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
    }
  }
}
</script>





<style scoped lang="scss">

questions {
  text-align: center;
  display: inline;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

