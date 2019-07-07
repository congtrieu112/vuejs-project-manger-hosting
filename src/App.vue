<template>
  <div id="app" class="wrapper">
    <Header v-if="authen" />
    <Sidebar v-if="authen" />
    <router-view />
    <Footer v-if="authen" />
    <SidebarFooter v-if="authen" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";
import SidebarFooter from "@/components/SidebarFooter.vue";
import AuthService from "./auth";
const auth = new AuthService();
@Component({
  components: {
    Header,
    Footer,
    Sidebar,
    SidebarFooter
  }
})
export default class App extends Vue {
  private auth: boolean = false;
  get authen() {
    this.auth = auth.isAuthenticated();
    return this.auth;
  }
  mounted() {
    if (!this.authen) {
      $("body").attr("class", "hold-transition login-page");
    }
  }
}
</script>

<style lang="scss"></style>
