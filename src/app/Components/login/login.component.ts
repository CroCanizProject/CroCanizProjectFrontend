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
  eyeIcon: string = "fa-eye";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Por favor, llena todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.auth.signIn(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.auth.storeToken(res.data.access_token);
            let datos = res.data;
            localStorage.setItem("rol", datos.roles[0].name);
            this.router.navigate(['dashboard']);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '¡Bienvenido!',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Credenciales incorrectas',
              text: 'Usuario o contraseña incorrectos. Favor de verificar',
            });
          }
        });
    }
  }

  ocultarContrasena() {
    this.isText = !this.isText;
    // Revisar la condición para cambiar la contraseña
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = "text" : this.type = "password";
  }

  private validateAllFormsFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control?.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormsFileds(control);
      }
    });
  }
}
