<template>
  <div></div>
</template>
<script>
export default {
  name: "callback",
  mounted() {
    this.$auth.handleAuthentication().then(data => {
      this.$router.go(0);
    });
  }
};
</script>
