import { Component } from '@angular/core';
import { UsersService } from 'src/Services/users.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  currentRol = localStorage.getItem("rol");
  currentUserData = { 'name': localStorage.getItem("userName"), 'rol': localStorage.getItem("rol") };

  constructor(private service: UsersService) {}

  Users: any;
  loading:boolean = true;
  ngOnInit() {
    this.service.getUsers().subscribe((data) => {
      this.Users = data.data;
      this.loading=false
    },
    (error)=>{
      console.log(error);
      this.loading=false
    });
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tableUsuarios'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios existentes');
    XLSX.writeFile(wb, 'Usuarios Disponibles.xlsx');
  }

  // Agregar nuevo usuario
  Add() {
    var nombre: any;
    var correo: any;
    var contraseña: any;
    var contraseña2: any;
    var rol: any;

    Swal.fire({
      title: 'Agregar nuevo usuario',
      html: `<form>
          <div class="mb-3">
            <input type="text" class="form-control" id="nombre" placeholder="Nombre:">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="correo" placeholder="Correo:">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="contraseña" placeholder="Contraseña:">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="contraseña2" placeholder="Confirmar contraseña:">
          </div>
          <div class="mb-3">
            <select class="form-control" id="rol">
              <option value="admin">Admin</option>
              <option value="subadmin">SubAdmin</option>
              <option value="client">Cliente</option>
            </select>
          </div>
        </form>`,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result: { isConfirmed: any; }) => {
      nombre = document.getElementById("nombre");
      correo = document.getElementById("correo");
      contraseña = document.getElementById("contraseña");
      contraseña2 = document.getElementById("contraseña2");
      rol = document.getElementById("rol");
      if (result.isConfirmed) {
        const usuario = { name: nombre.value, email: correo.value, password: contraseña.value, role: rol.value };
         if (nombre.value == null && correo.value == null && contraseña == null, rol == null || nombre.value == "" || correo.value == "" || contraseña.value == "" || rol.value == "") {
            Swal.fire({
              title: 'Por favor llena los campos!',
              showDenyButton: false,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
          else if(contraseña != contraseña2) {
            Swal.fire({
              title: 'Las contraseñas no coinciden, intenta de nuevo',
              showDenyButton: false,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }  
          else {
            this.service.Add(usuario).subscribe(
              (data) => window.location.reload(),
              error => {
                Swal.fire({
                  title: 'Ocurrió un error al dar de alta al usuario',
                  showDenyButton: false,
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                });
              });
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Usuario creado con éxito',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
        
      } 
    )
}

  Usuario: any 
  modalTitle: any
  activatEditUsers: boolean= false

  editModal(User:any){
    this.Usuario = User
    this.modalTitle="Editar datos del usuario"
    this.activatEditUsers=true
    
    
    }
    closeModal(){
      this.activatEditUsers=false
    }
    
     //BUSQUEDA DE CADA TABLA
 onChange(event: any){
  var value = event.target.value
  $("#tableUsers tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    return true;
  });
}
}
