<template>
    <div>

    </div>
</template>
<script>
export default {
  name: 'callback',
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      // this.$router.push({ name: 'callback' })
      this.$router.go(0);
      // location.reload();
      // this.$router.reload()
    })
  }
}
</script>
