import { Component, Input, ɵsetCurrentInjector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  constructor(private fb: FormBuilder, private UsersService: UsersService){}
  @Input()
  Usuario: any;


  UsuarioForm!: FormGroup;


  ngOnInit(){
    console.log(this.Usuario.name, this.Usuario.email, this.Usuario.password, this.Usuario.roles[0].name)
  this.UsuarioForm = this.fb.group ({
    name: [this.Usuario.name, Validators.required],
    email: [this.Usuario.email, Validators.required],  
    password: ["", Validators.required],
    role: [this.Usuario.roles[0].name, Validators.required]
  });
}


//Editar producto
update(id:number){
  //usuario que voy a editar 
  var currentName = this.Usuario.name
 //es el user que esta en sesion
  var oldName = localStorage.getItem("userName")
  if(this.UsuarioForm.valid){
  
const User = {
  name: this.UsuarioForm.value.name,
  email: this.UsuarioForm.value.email, 
  password: this.UsuarioForm.value.password,
  role: this.UsuarioForm.value.role
}

  this.UsersService.update(id, User)
  .subscribe(
    (response) => {
  if(currentName == oldName){
      localStorage.setItem("userName", this.UsuarioForm.value.name); 
      localStorage.setItem("role", this.UsuarioForm.value.role)
    }
      Swal.fire({
        title: 'Actualizado!',
        text: 'El usuario ha sido actualizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    },
    (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Ha ocurrido un error al actualizar el usuario.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    );
   }
   else{
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Al parecer aún no has llenado los campos',
    })
   }
 }


}
