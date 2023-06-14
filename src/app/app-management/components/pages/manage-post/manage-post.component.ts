import { Observable, async, finalize } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { storageKey } from 'src/app/app-constant';
import { Paragraph } from 'src/app/app-management/Model/Paragraph';
import { Post } from 'src/app/app-management/Model/Post';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-manage-post',
    templateUrl: './manage-post.component.html',
    styles: [
        `
            input[type='file']::file-selector-button {
                margin-right: 20px;
                border: none;
                background: #084cdf;
                padding: 10px 20px;
                border-radius: 5px;
                color: #fff;
                cursor: pointer;
                transition: background 0.2s ease-in-out;
            }

            input[type='file']::file-selector-button:hover {
                background: #0d45a5;
            }
        `,
    ],
})
export class ManagePostComponent implements OnInit {
    @ViewChild('dt1') dt1: Table | undefined;
    constructor(
        private route: ActivatedRoute,
        public layoutService: LayoutService,
        public router: Router,
        private messageService: MessageService,
        private http: HttpClient,
        private authService: AuthService,
        private storage: AngularFireStorage,
        private confirmationService: ConfirmationService
    ) {}
    header: any;
    loading: boolean = false;
    listPost: Post[] = [];
    listPostSelected: Post[] = [];
    isShowDetailPost: boolean = false;
    isShowUpdateParagraph: boolean = false;
    listParagraph: Paragraph[] = [];
    desSelected: any;
    postSelected: Post = {};
    paragraphSelected: Paragraph = {};
    isCreate: boolean = false;
    label: string = '';
    isShowCreatePost: boolean =false;
    listDestination: any[] = [];

    // firebase
    selectedFile: any;
    fb: string = '';
    downloadURL: Observable<string> | undefined;
    ngOnInit() {
        this.header = new HttpHeaders().set(
            storageKey.AUTHORIZATION,
            this.authService.getToken()
        );
        this.loadData();
    }
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt1!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }
    loadData() {
        this.http
            .get<ResponseMessage>('/api/v1/project/post/findAll', {
                headers: this.header,
            })
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listPost = data.data;
                        // console.log(this.listTour)
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data.message,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
    }
    async showDetailPost(object: any) {
        this.loading = true;
        this.postSelected = object;
        await this.http
            .get<ResponseMessage>(
                '/api/v1/project/paragraph/findByPostId?postId=' + object.id,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.listParagraph = data.data;
                        this.isShowDetailPost = true;
                        // console.log(this.listPitstop)
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        await this.http
            .get<ResponseMessage>(
                '/api/v1/project/post/findDes?id=' + object.id,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.desSelected = data.data;
                        console.log(this.desSelected);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        

        this.loading = false;
        this.label = 'Du lịch '+this.desSelected.name;
    }
    onFileSelected(event: any) {
        var n = Date.now();
        const file = event.target.files[0];
        const filePath = `travel/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`travel/${n}`, file);
        task.snapshotChanges()
            .pipe(
                finalize(async () => {
                    this.downloadURL = fileRef.getDownloadURL();
                    await this.downloadURL.toPromise().then((url) => {
                        if (url) {
                            this.paragraphSelected.imageUrl = url;
                            // console.log(this.pitstopSelected)
                        }
                        // console.log(this.fb);
                    });
                })
            )
            .subscribe((url) => {
                if (url) {
                    // console.log();
                }
            });
        // console.log("done");
    }
    onFileSelectedPost(event: any) {
      var n = Date.now();
      const file = event.target.files[0];
      const filePath = `travel/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`travel/${n}`, file);
      task.snapshotChanges()
          .pipe(
              finalize(async () => {
                  this.downloadURL = fileRef.getDownloadURL();
                  await this.downloadURL.toPromise().then((url) => {
                      if (url) {
                          this.postSelected.imageUrl = url;
                          // console.log(this.pitstopSelected)
                      }
                      // console.log(this.fb);
                  });
              })
          )
          .subscribe((url) => {
              if (url) {
                  // console.log();
              }
          });
      // console.log("done");
  }
    showUpdateParagraph(object: any) {
        this.paragraphSelected = object;
        this.isShowUpdateParagraph = true;
        this.isCreate = false;
    }
    showCreateParagraph() {
        this.paragraphSelected = {};
        this.isShowUpdateParagraph = true;
        this.isCreate = true;
    }
    updateParagraph() {
        this.loading = true;
        this.http
            .post<ResponseMessage>(
                '/api/v1/project/paragraph/update?postId=' +
                    this.postSelected.id,
                { update: [this.paragraphSelected], deleteId: [] },
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Cập nhật thành công ',
                        });
                        this.isShowUpdateParagraph = false;
                        this.showDetailPost(this.postSelected);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        this.loading = false;
    }
    deleteParagraph() {
        this.loading = true;
        this.http
            .post<ResponseMessage>(
                '/api/v1/project/paragraph/update?postId=' +
                    this.postSelected.id,
                { update: [], deleteId: [this.paragraphSelected.id] },
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Xóa thành công ',
                        });
                        this.isShowUpdateParagraph = false;
                        this.showDetailPost(this.postSelected);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        this.loading = false;
    }
    async availablePost() {
      this.loading = true;
      for (let i = 0; i < this.listPostSelected.length; i++) {
          await this.http
              .get<ResponseMessage>(
                  '/api/v1/project/post/available?id=' +
                      this.listPostSelected[i].id,
                  { headers: this.header }
              )
              .toPromise()
              .then(
                  (data) => {
                      if (data?.resultCode == 0) {
                          this.messageService.add({
                              severity: 'success',
                              summary:
                                  'Hiển thị thành công bài viết ' +
                                  this.listPostSelected[i].title,
                          });
                      } else {
                          this.messageService.add({
                              severity: 'error',
                              summary: data?.message,
                          });
                      }
                  },
                  (error) => {
                      this.messageService.add({
                          severity: 'error',
                          summary: 'Error occur',
                      });
                  }
              );
      }
      this.loadData();
      this.listPostSelected= [];
      this.loading = false;

    }
    async unavailablePost() {
      this.loading = true;
      for (let i = 0; i < this.listPostSelected.length; i++) {
          await this.http
              .get<ResponseMessage>(
                  '/api/v1/project/post/unavailable?id=' +
                      this.listPostSelected[i].id,
                  { headers: this.header }
              )
              .toPromise()
              .then(
                  (data) => {
                      if (data?.resultCode == 0) {
                          this.messageService.add({
                              severity: 'success',
                              summary:
                                  'Ẩn thành công bài viết ' +
                                  this.listPostSelected[i].title,
                          });
                      } else {
                          this.messageService.add({
                              severity: 'error',
                              summary: data?.message,
                          });
                      }
                  },
                  (error) => {
                      this.messageService.add({
                          severity: 'error',
                          summary: 'Error occur',
                      });
                  }
              );
      }
      this.loadData();
      this.listPostSelected= [];
      this.loading = false;

    }
    showCreatePost() {
      this.isShowCreatePost = true;
      this.postSelected = {};
      this.http.get<ResponseMessage>("/api/v1/project/auth/des/findAll").subscribe(
        data => {
            if(data.resultCode == 0 ) {
                this.listDestination = data.data;
                // console.log(this.listDestination)
            }
            else {
                this.messageService.add({severity:'error', summary:data.message});
            }
        },
        error => {
            this.messageService.add({severity:'error', summary:'Error occur'});
        }
    )


    }
    async createPost() {
      this.loading = true;
          await this.http
              .post<ResponseMessage>(
                  '/api/v1/project/post/create?desId='+this.desSelected,this.postSelected,
                  { headers: this.header }
              )
              .toPromise()
              .then(
                  (data) => {
                      if (data?.resultCode == 0) {
                          this.messageService.add({
                              severity: 'success',
                              summary:
                                  'Tạo thành công bài viết '
                          });
                      } else {
                          this.messageService.add({
                              severity: 'error',
                              summary: data?.message,
                          });
                      }
                  },
                  (error) => {
                      this.messageService.add({
                          severity: 'error',
                          summary: 'Error occur',
                      });
                  }
              );
      this.loadData();
      this.loading = false;
      this.isShowCreatePost = false;

    }
    async deletePost() {
      this.loading = true;
      for (let i = 0; i < this.listPostSelected.length; i++) {
        await this.http
            .delete<ResponseMessage>(
                '/api/v1/project/post/delete?id=' +
                    this.listPostSelected[i].id,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary:
                                'Xóa thành công bài viết ' +
                                this.listPostSelected[i].title,
                        });
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: "Không thể xóa bài viết "+this.listPostSelected[i].title,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
    }
      this.loadData();
      this.loading = false;
      this.listPostSelected = [];

    }
    confirmDelete() {
      // console.log("delete")
      this.confirmationService.confirm({
          message: 'Xác nhận xóa các bài viết đã chọn?',
          header: 'Xác nhận xóa bài viết',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.deletePost();
          },
          reject: () => {
             this.listPostSelected = [];
          }
      });
  }
}
