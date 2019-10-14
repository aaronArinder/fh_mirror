<template>
  <v-container class="about">
    <div class="about__content">
      <h1 class="about__title">About</h1>
      <div>
        The purpose of this app is to help make it easier to take in clients of a court-appointed marriage counseling program. Users will sign up, log in, and fill out whatever forms are required for their case. The main design decision has been to store the forms (collections of questions) in materialized views, and render to the frontend what gets returned by querying those materialiazed views.
        </br>
        </br>
        See the README for where this project is at MVP-wise, and what we hope to do with it post-MVP.
      </div>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'about',
  components: {
  },
}
</script>

