import { AuthService } from './app-management/service/auth.service';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const getServerApiUrl = (): string => {
    return environment.backendApiUrl;
};
// export const header =  (): HttpHeaders => {
//     return AuthService
// }
export const storageKey: any = {
    USER: 'user',
    TOKEN: 'token',
    LANGUAGES: 'languages',
    AUTHORIZATION: 'Authorization',
    USER_INFO: 'userInfo',
    REFERER: 'redirect',
    firebaseConfig : {
        apiKey: "AIzaSyBixWPo7A7rnPRt8B48fNY7eiVyjP79jEA",
        authDomain: "first-project-47825.firebaseapp.com",
        projectId: "first-project-47825",
        storageBucket: "first-project-47825.appspot.com",
        messagingSenderId: "633929248521",
        appId: "1:633929248521:web:e55eae22a825d05780add8",
        measurementId: "G-CKZ57LLKT1"
      }
};
export const name: any = {
    App: 'APPLICATION',
    Group: 'GROUP',
    User: 'USER'
}