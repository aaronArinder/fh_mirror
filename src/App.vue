<template>
  <div id="app">
    <v-app>
      <div>
        <v-toolbar>
          <v-toolbar-title>Family Hope</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn to="/" text>Home</v-btn>
            <v-btn to="/about" text>About</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </div>
      <v-content>
        <v-container
          class="fill-height"
          fluid>
          <v-row
            align="center"
            justify="center">
            <router-view/>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

