import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss', '../../app.component.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('imageUser', { static: true }) input: ElementRef;
  filePath: string;
  imageRef: AngularFireStorageReference;
  file: File;
  image_url: Observable<string>;

  registerForm: FormGroup;
  constructor(private imageUpload: AngularFireStorage, private api: ApiService, private router: Router) {
    this.registerForm = this.createFormGroup();
  }


  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(9), Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      image: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  logForm() {
    if (this.registerForm.valid) {


      const userInfo = {
        user_name: this.registerForm.get('name').value + ' ' + this.registerForm.get('surname').value,
        password: this.registerForm.get('password').value,
        user_rol: null,
        user_type: null,
        user_email: this.registerForm.get('email').value,
        image_profile: this.input.nativeElement.defaultValue,
        auth_toke: null,
      };

      this.api.createUser(userInfo).subscribe(() => {
        this.router.navigate(['/login']);
      });
    } else { }

  }

  onUpload(event) {
    const imageId = this.registerForm.get('email').value;
    this.file = event.target.files[0];
    this.filePath = 'images/' + imageId;
    this.imageRef = this.imageUpload.ref(this.filePath);
    const task = this.imageUpload.upload(this.filePath, this.file);
    task.snapshotChanges().pipe(finalize(() => this.image_url = this.imageRef.getDownloadURL())).subscribe();
  }
  get name() {
    return this.registerForm.get('name');
  }
  get surname() {
    return this.registerForm.get('surname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get image() {
    return this.registerForm.get('image');
  }




}
