import { MessageService } from 'primeng/api';
import { AuthRequest } from './../../models/interfaces/user/auth/AuthRequest';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SignupUserRequest } from 'src/app/models/interfaces/user/signupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })


  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private cookieService: CookieService,
      private MessageService: MessageService
  ){}

  onSubmitLoginForm(): void{
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.MessageService.add({
              severity: 'sucess',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response.name}!`,
              life: 2000
            });
          }
        },
        error: (err) => {
          this.MessageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao fazer o login!`,
            life: 2000
          })
        }
      })
    }
  }

  onSubmitSignupForm(): void{
    if(this.signupForm.value && this.signupForm.valid){
      this.userService
      .signupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if(response){
            this.signupForm.reset();
            this.loginCard = true;
            this.MessageService.add({
              severity: 'Success',
              summary: 'Sucesso',
              detail: `Usuário criado com sucesso`,
              life: 2000
            })
          }
        },
        error: (err) => {
          this.MessageService.add({
            severity: 'Error',
            summary: 'Erro',
            detail: 'Erro ao criar o usuário',
            life: 2000
          })
        }
      })
    }
  }
}
