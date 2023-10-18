import { Component } from '@angular/core';
import { GeneralIService } from 'src/Services/general-i.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent {

  constructor(private gi: GeneralIService) { }

  data: any
  general: any

  ngOnInit() {
    this.gi.getGeneralInfo().subscribe((response) => {

      this.data = response.data;

      // console.log( this.data = response.data)
    });



    this.gi.getGeneralInfo().subscribe((response) => {
      // console.log(this.data = response.data)

      var emails = response.data.emails
      var descripcion = response.data.description[1]
      var mision= response.data.mision
      var vision= response.data.vision
      var c: any

      c = response
      Swal.fire({
        title: 'Actualizar información general',
        html: `<form>
          <div class="mb-3">
            <input type="text" class="form-control" id="em" value="`+ emails + `">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="des" value="`+ descripcion + `">
          </div>
          <div class="mb-3">
          <input type="text" class="form-control" id="mi" value="`+ mision + `">
        </div>

        <div class="mb-3">
          <input type="text" class="form-control" id="vi" value="`+ vision + `">
        </div>


        </form>`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result: { isConfirmed: any; }) => {
        emails = document.getElementById("em");
        descripcion = document.getElementById("des");
        mision = document.getElementById("mi");
        vision = document.getElementById("vi");


        if (result.isConfirmed) {
          const supplier = { emails: emails.value, descripcion: descripcion.value , mision:mision.value, vision:vision.value   }
          if (emails.value == null && descripcion.value == null || mision.value == "" || vision.value == "") {
            Swal.fire({
              title: 'Por favor llena los campos',
              showDenyButton: false,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            })
          } else {
            this.gi.updateGeneralInfo(supplier).subscribe(
              (data) => window.location.reload(),
              error => {
                Swal.fire({
                  title: 'Ocurrió un error al actualizar los datos del proveedor ',
                  showDenyButton: false,
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                })
              }
            )
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Proveedor Actualzado con éxito',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else {
  
        }
      })
      })
      












  }}
  