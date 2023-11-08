import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from 'src/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  constructor(private UsersService: UsersService){}
  @Input()
  Usuario: any;

  UsuarioForm!: FormGroup;


//Editar producto
update(id:number){
  if(this.UsuarioForm.valid){
  const formData = new FormData();
  formData.append('name', this.UsuarioForm.value.name);
  formData.append('email', this.UsuarioForm.value.email);
  formData.append('password', this.UsuarioForm.value.password);
  formData.append('role', this.UsuarioForm.value.role);

  this.UsersService.updateUser(id, formData)
  .subscribe(
    (response) => {
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
