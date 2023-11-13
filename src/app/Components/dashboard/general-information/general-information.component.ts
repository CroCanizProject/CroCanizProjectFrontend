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

  currentRol= localStorage.getItem("rol")
  currentUserData = {'name': localStorage.getItem("userName"), 'rol': localStorage.getItem("rol")}


  constructor(private gi: GeneralIService) { }

  data: any
  general: any
  emails: any
  descripcion: any
  mision: any
  vision: any
  

  ngOnInit() {
    this.gi.getGeneralInfo().subscribe((response) => {
      this.data = response.data
      this.descripcion = response.data.description
      this.mision = response.data.mision
      this.vision = response.data.vision 
      this.emails = response.data.emails[0]
console.log(this.emails, this.descripcion)
    })
  }

  updateInfo(){
      Swal.fire({
        title: 'Actualizar información general',
        html: `<form>
          <div class="mb-3">
            <input type="text" class="form-control" id="em" value="`+ this.emails + `">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="des" value="`+ this.descripcion + `">
          </div>
          <div class="mb-3">
          <input type="text" class="form-control" id="mi" value="`+ this.mision + `">
        </div>

        <div class="mb-3">
          <input type="text" class="form-control" id="vi" value="`+ this.vision + `">
        </div>

        </form>`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result: { isConfirmed: any; }) => {
        var emails = $("#em").val();
        var descripcion = $("#des").val();
        var mision = $("#mi").val();
        var vision = $("#vi").val();


        if (result.isConfirmed) {
          const generalInfor = { emails:[emails], description: descripcion , mision:mision, vision:vision   }
          console.log(generalInfor)
          if (emails == null && descripcion == null || mision == "" || vision == "") {
            Swal.fire({
              title: 'Por favor llena los campos',
              showDenyButton: false,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            })
          } else {
            this.gi.updateGeneralInfo(generalInfor).subscribe(
              (data) => 
              // window.location.reload()
            console.log(data),
              error => {
                Swal.fire({
                  title: 'Ocurrió un error al actualizar los datos de la paina ',
                  showDenyButton: false,
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                })
              }
            )
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Datos Actualzados con éxito',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else {
  
        }
      })
      
      












  }}
  