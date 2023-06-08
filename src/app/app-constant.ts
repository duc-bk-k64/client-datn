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
    USER_NAME : 'username',
    ROLE : 'role'
};
export const firebaseConfig: any = {
    apiKey: "AIzaSyCmCtg5S3rNSQ2_FNFR0QrLvYOmE-v5vYA",
    authDomain: "travel-8446a.firebaseapp.com",
    projectId: "travel-8446a",
    storageBucket: "travel-8446a.appspot.com",
    messagingSenderId: "851546991357",
    appId: "1:851546991357:web:07ea6bbd39430dd3102c94",
    measurementId: "G-VZVS5KTH51"
  };
export const name: any = {
    App: 'APPLICATION',
    Group: 'GROUP',
    User: 'USER'
}
export const STATUS: any = {
    UNREAD: 'unread',
    READED: 'readed'
}

export const DEPARTURE : any = [
    {
        name: 'Hà Nội',
        value: 'hanoi'
    },
    {
        name: 'Hải Dương',
        value: 'haiduong'
    },
    {
        name: 'Hải Phòng',
        value: 'haiphong'
    },
    {
        name: 'TP HCM',
        value: 'tphcm'
    }
]

export const PRICE : any = [
    {
        name: 'Nhỏ hơn 3 triệu',
        value: '0-3'
    },
    {
        name: '3 đến 5 triệu',
        value: '3-5'
    },
    {
        name: '5 đến 10 triệu',
        value: '5-10'
    },
    {
        name: ' Lớn hơn 10 triệu',
        value: '10-'
    }
]

export const TIME : any = [
    {
        name: 'Nhỏ hơn 2 ngày',
        value: '0-2'
    },
    {
        name: ' 2 đến 5 ngày',
        value: '2-5'
    },
    {
        name: ' Lớn hơn 5 ngày',
        value: '5-'
    }
]