import { Component } from '@angular/core';
import {finalize, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent {
    // title = "cloudsSorage";
    selectedFile: any;
    fb: string = '';
    downloadURL: Observable<string> | undefined;
    constructor( private storage: AngularFireStorage) {}
    ngOnInit() {}
    onFileSelected(event:any) {
        var n = Date.now();
        const file = event.target.files[0];
        const filePath = `travel/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`travel/${n}`, file);
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    this.downloadURL = fileRef.getDownloadURL();
                    this.downloadURL.subscribe(url => {
                        if (url) {
                            this.fb = url;
                            console.log(this.fb)
                        }
                        // console.log(this.fb);
                    });
                })
            )
            .subscribe(url => {
                if (url) {
                    // console.log(url);
                }
            });
    }
    log() {
        console.log(this.fb)
    }
    // public connect(p: any) {
    //     const ws = new SockJS(CHAT_URL);
    //     ws.onmessage = data => {
    //         const result = JSON.parse(data.data).data;
    //         if (result.serverType === 'HANDLE') {
    //             return;
    //         }
    //         if (p.items.size === 0) {
    //             p.add(result, true, null);
    //             return;
    //         }
    //         const node = p.items.get(result.appName);
    //         if (node === undefined || node === null) {
    //             p.add(result, true, null);
    //             return;
    //         }
    //         p.add(result, false, node);
    //     };

    //     ws.onerror = function(e) {
    //         p.reconnect();
    //     };

    //     ws.onclose = function(e) {
    //         p.reconnect();
    //     };
    // }
}
