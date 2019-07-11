import auth0 from "auth0-js";
import authConfig from "../../auth_config.json";

export default class AuthService {
  private config: any;
  private expiresAt: any;
  private user: any;
  private accessToken: any;
  private token: any;
  constructor() {
    const setting = new auth0.WebAuth(authConfig);
    this.config = setting;

  }
  public setExpiresAt(expiresAt: any): void {
    const time = JSON.stringify(expiresAt * 1000 + new Date().getTime());
    localStorage.setItem('expires_at', time);
  }

  public getExpiresAt(): any {
    return this.expiresAt = localStorage.getItem('expires_at');
  }


  public setAccessToken(AccessToken: any): void {
    localStorage.setItem('access_token', AccessToken);
  }

  public getAccessToken(): any {
    return this.accessToken;
  }

  public setToken(token: any): void {
    localStorage.setItem('id_token', token);
  }

  public getToken(): any {
    return this.token;
  }

  public login(): void {
    this.config.authorize();
  }

  public logout(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user')
    this.config.logout({
      returnTo: `${window.location.origin}`, // Allowed logout URL listed in dashboard
      clientID: authConfig.clientID, // Your client ID
    })
  }

  public isAuthenticated(): any {
    return new Date().getTime() < this.getExpiresAt();
  }

  public setUser(user: any): void {
    this.user = localStorage.setItem('user', JSON.stringify(user))
  }

  public getUser(): any {
    return JSON.parse(this.user);
  }

  public handleAuthentication(): any {
    return new Promise((resolve, reject) => {
      this.config.parseHash((err: any, authResult: any) => {

        if (authResult && authResult.accessToken && authResult.idToken) {

          this.setExpiresAt(authResult.expiresIn);
          this.setAccessToken(authResult.accessToken);
          this.setToken(authResult.idToken);
          this.setUser(authResult.idTokenPayload);
          resolve()

        } else if (err) {

          this.logout()
          reject(err)
        }

      })
    })
  }

}