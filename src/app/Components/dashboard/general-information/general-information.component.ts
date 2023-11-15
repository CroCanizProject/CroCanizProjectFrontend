import { Component } from '@angular/core';
import { GeneralIService } from 'src/Services/general-i.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent {

  // Obtengo el rol y el nombre del usuario actual desde el almacenamiento local
  currentRol = localStorage.getItem("rol")
  currentUserData = { 'name': localStorage.getItem("userName"), 'rol': localStorage.getItem("rol") }

  // mando a llamar  el servicio GeneralIService
  constructor(private gi: GeneralIService) { }

  // Variables para almacenar la información general
  data: any
  general: any
  emails: any
  descripcion: any
  mision: any
  vision: any

  // Método que se ejecuta al iniciar el componente
  ngOnInit() {
    // Llama al servicio para obtener la información general
    this.gi.getGeneralInfo().subscribe((response) => {
      // Almacena la respuesta en las variables correspondientes
      this.data = response.data
      this.descripcion = response.data.description
      this.mision = response.data.mision
      this.vision = response.data.vision
      this.emails = response.data.emails[0]
      console.log(this.emails, this.descripcion)
    })
  }

  // Método para actualizar la información general
  updateInfo() {
    // se muestra un modal de confirmación para la actualización
    Swal.fire({
      title: 'Actualizar información general',
      html: `<form>
          <div class="mb-3">
            <input type="text" class="form-control" id="em" value="` + this.emails + `">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="des" value="` + this.descripcion + `">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="mi" value="` + this.mision + `">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="vi" value="` + this.vision + `">
          </div>
        </form>`,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result: { isConfirmed: any; }) => {
      // se obtienen los valores de los campos del formulario
      var emails = $("#em").val();
      var descripcion = $("#des").val();
      var mision = $("#mi").val();
      var vision = $("#vi").val();

      if (result.isConfirmed) {
        // aqui se crea un objeto con la información actualizada
        const generalInfor = { emails: [emails], description: descripcion, mision: mision, vision: vision }
        console.log(generalInfor)
        // se verifica si los campos están vacíos
        if (emails == null && descripcion == null || mision == "" || vision == "") {
          Swal.fire({
            title: 'Por favor llena los campos',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
        } else {
          // Llama al servicio para actualizar la información general
          this.gi.updateGeneralInfo(generalInfor).subscribe(
            (data) =>
              window.location.reload(),
            error => {
              // Muestra un mensaje de error en caso de fallo
              Swal.fire({
                title: 'Ocurrió un error al actualizar los datos de la página ',
                showDenyButton: false,
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
            }
          )
          // Muestra un mensaje de éxito
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Datos Actualizados con éxito',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } else {

      }
    })
  }
}
