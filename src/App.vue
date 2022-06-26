<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

.no-uppercase {
  text-transform: unset !important;
}
</style>

<script>
export default {
  name: 'App',
};
</script>
