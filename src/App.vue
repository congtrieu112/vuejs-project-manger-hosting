<template>
  <div id="app" class="wrapper">
    <Header />
    <Sidebar />
    <router-view />
    <Footer />
    <SidebarFooter />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import SidebarFooter from "@/components/SidebarFooter.vue";
// @Component
@Component({
  components: {
    Header,
    Footer,
    Sidebar,
    SidebarFooter
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
