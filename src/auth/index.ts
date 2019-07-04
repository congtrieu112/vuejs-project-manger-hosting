import auth0 from 'auth0-js';
import Vue from 'vue'
// exchange the object with your own from the setup step above.
let webAuth = new auth0.WebAuth({
    domain: 'quanlysanphamweb.auth0.com',
    clientID: 'o00FpnEECR73k9JIesEOUqSyrVPuxwP1',
    // make sure port is 8080
    redirectUri: 'http://localhost:8081/callback', 
    // we will use the api/v2/ to access the user information as payload
    audience: 'https://quanlysanphamweb.auth0.com/api/v2/',
    responseType: 'token id_token',
    scope: 'openid profile'
  })
  
  let auth = new Vue({
    computed: {
      token: {
        get: () =>{
          return localStorage.getItem('id_token')
        },
        set: (id_token:string)=> {
          localStorage.setItem('id_token', id_token)
        }
      },
      accessToken: {
        get: function() {
          return localStorage.getItem('access_token')
        },
        set: (accessToken:string) =>{
          localStorage.setItem('access_token', accessToken)
        }
      },
      expiresAt: {
        get: function() {
          return localStorage.getItem('expires_at')
        },
        set: (expiresIn:number) =>{
          let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
          localStorage.setItem('expires_at', expiresAt)
        }
      },
      user: {
        get: ()=> {
          const users = localStorage.getItem('user');
          return users !== null ? JSON.parse(users) : '';
        },
        set: function(user) {
          localStorage.setItem('user', JSON.stringify(user))
        }
      }
    },
    methods: {
      login() {
        webAuth.authorize()
      },
      logout() {
        return new Promise((resolve, reject) => { 
          localStorage.removeItem('access_token')
          localStorage.removeItem('id_token')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('user')
          webAuth.logout({
            returnTo: 'http://localhost:8081', // Allowed logout URL listed in dashboard
            clientID: 'o00FpnEECR73k9JIesEOUqSyrVPuxwP1', // Your client ID
          })
        })
      },
      isAuthenticated() {
          const expiresAts = this.expiresAt ? this.expiresAt : 0; 
          console.log('expiresAts',expiresAts)
        return new Date().getTime() < expiresAts
      },
      handleAuthentication() {
        return new Promise((resolve, reject) => {  
          webAuth.parseHash((err, authResult) => {
  
            if (authResult && authResult.accessToken && authResult.idToken) {
              this.expiresAt = authResult.expiresIn ? authResult.expiresIn : ''
              this.accessToken = authResult.accessToken
              this.token = authResult.idToken
              this.user = authResult.idTokenPayload
              resolve()
  
            } else if (err) {
              this.logout()
              reject(err)
            }
  
          })
        })
      }
    }
  })
  
  export default {
      install:()=>{
        Vue.prototype.$auth = auth
      }
  };
//    {
    // install: ()=> {
    //   Vue.prototype.auth = auth
    // }
//   }


