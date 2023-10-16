import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
    loginForm!: FormGroup;


constructor(private fb: FormBuilder,public router: Router,private auth:AuthService) {}

ngOnInit() {
  this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
}




onLogin(){
  console.log(this.loginForm.value)
  if(this.loginForm.valid){
    console.log(this.loginForm.value)
    this.auth.signIn(this.loginForm.value)
    .subscribe({
      next: (res) =>{
        // console.log(res.access_token);
        // console.log(res.data.nameUser)
        // //console.log(res.rolA.nameRole)
        
        this.auth.storeToken(res.access_token)
        localStorage.setItem("access_token", res.access_token);
        this.router.navigate(['dashboard']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Bienvenido!',
          showConfirmButton: false,
          timer: 1500,
        })
      },
    })
  //  Swal.fire({
  //    icon: 'error',
  //    title: '¡Credenciales incorrectas!',
  //    text: 'Usuario ó contraseña incorrecto. Favor de verificar',
  //   })
  }else{
    
    this.validateAllFormsFileds(this.loginForm);
   Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Al parecer aún no has llenado los campos',
    })
  }
}

ocultarContrasena() {
  this.isText = !this.isText;
  // Revisar la condición para cambiar la contraseña
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = 'fa-eye-slash';
  this.isText ? this.type = "text" : this.type = "password"
}

private validateAllFormsFileds(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control?.markAsDirty({ onlySelf: true })
    } else if (control instanceof FormGroup) {
      this.validateAllFormsFileds(control)
    }
  })

}




}
