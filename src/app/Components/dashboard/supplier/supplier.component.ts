import { Component } from '@angular/core';
import { error } from 'jquery';
import { SupplierService } from 'src/Services/supplier.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  currentRol= localStorage.getItem("rol")
  currentUserData = {'name': localStorage.getItem("userName"), 'rol': localStorage.getItem("rol")}

  
  constructor(private service: SupplierService){}
  
  suppliers:any
  loading: boolean= true;

  ngOnInit() {
    this.service.getSuppliers().subscribe((data) => {
      this.suppliers = data
      this.loading=false
    },
    (error)=>{
      console.log(error);
      this.loading=false
    });
  }


  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tableSuppliers'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Proveedores existentes');
    XLSX.writeFile(wb, 'Proveedores Disponibles.xlsx');
  }



//Agregar nuevo proveedor
Add() {
  var nombre: any
  var rfc: any
  Swal.fire({
    title: '¿Deseas agregar nuevo proveedor?',
    html: `<form>
        <div class="mb-3">
          <input type="text" class="form-control" id="nombre" placeholder="Ingresa el nombre del proveedor:">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="rfc" placeholder="Coloca su RFC:">
        </div>
      </form>`,
    showDenyButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: `Cancelar`,
  }).then((result: { isConfirmed: any; }) => {
    nombre = document.getElementById("nombre");
    rfc = document.getElementById("rfc");
    if (result.isConfirmed) {
      const supplier = { nameSupplier: nombre.value, rfc: rfc.value }
      if (nombre.value == null && rfc.value == null || nombre.value == "" || rfc.value == "") {
        Swal.fire({
          title: 'Por favor llena los campos!',
          showDenyButton: false,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        })
      } else {
        this.service.addSupplier(supplier).subscribe(
          (data) => window.location.reload(),
          error => {
            Swal.fire({
              title: 'Ocurrió un error al dar de alta al proveedor',
              showDenyButton: false,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            })
          })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proveedor dado de alta con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
    }
  })

}


//Editar proveedor 
Edit(id: any) {
  var nombre: any
  var rfc: any
  var c: any
  this.service.getSupplier(id).subscribe((data) => {
    c = data
    Swal.fire({
      title: 'Actualizar datos del proveedor',
      html: `<form>
        <div class="mb-3">
          <input type="text" class="form-control" id="nombre" value="`+ c.nameSupplier + `">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="rfc" value="`+ c.rfc + `">
        </div>
      </form>`,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result: { isConfirmed: any; }) => {
      nombre = document.getElementById("nombre");
      rfc = document.getElementById("rfc");
      if (result.isConfirmed) {
        const supplier = { nameSupplier: nombre.value, rfc: rfc.value }
        if (nombre.value == null && rfc.value == null || nombre.value == "" || rfc.value == "") {
          Swal.fire({
            title: 'Por favor llena los campos',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
        } else {
          this.service.updateSupplier(id, supplier).subscribe(
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

}


//Eliminar proveedor
Delete(id: any) {
  Swal.fire({
    title: '¿Estás seguro de que quieres eliminar este proveedor?',
    text: "Este proceso no podrá ser revertido...",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result: { isConfirmed: any; }) => {
    if (result.isConfirmed) {
      this.service.deleteSupplier(id).subscribe(data => {
        Swal.fire(
          'Deleted!',
          'Eliminado con éxito',
          'success'
        ),
        window.location.reload()
        // console.log(data)
        
      })
      // this.service.deleteCategory(id).subscribe((data) => {
      //   window.location.reload()
      // })
    }
  })

  
 }
 //BUSQUEDA DE CADA TABLA
 onChange(event: any){
  var value = event.target.value
  $("#tableSuppliers tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    return true;
  });
}
}
