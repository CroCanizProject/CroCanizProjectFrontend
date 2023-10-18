import { Component } from '@angular/core';
import { CategoriesService } from 'src/Services/categories.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private service: CategoriesService) { }

  categories: any

  ngOnInit() {
    this.service.getCategories().subscribe((data) => {
      this.categories = data
    })
  }


  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tableCategories'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Categorias existentes');
    XLSX.writeFile(wb, 'Categorias Disponibles.xlsx');
  }


  //Agregar nueva categoria
  Add() {
    var nombre: any
    var descripcion: any
    Swal.fire({
      title: 'Agregar nueva categoria',
      html: `<form>
          <div class="mb-3">
            <input type="text" class="form-control" id="nombre" placeholder="Ingresa el nombre de la categoria:">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="descripción" placeholder="Coloca una descripción:">
          </div>
        </form>`,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result: { isConfirmed: any; }) => {
      nombre = document.getElementById("nombre");
      descripcion = document.getElementById("descripción");
      if (result.isConfirmed) {
        const categoria = { name: nombre.value, description: descripcion.value }
        if (nombre.value == null && descripcion.value == null || nombre.value == "" || descripcion.value == "") {
          Swal.fire({
            title: 'Por favor llena los campos!',
            showDenyButton: false,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
        } else {
          this.service.addCategory(categoria).subscribe(
            (data) => window.location.reload(),
            error => {
              Swal.fire({
                title: 'Ocurrió un error al crear la categoria',
                showDenyButton: false,
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
            })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoria creada con éxito',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } else {
      }
    })

  }
  //Editar categoria
  Edit(id: any) {
    var nombre: any
    var descripcion: any
    var c: any
    this.service.getCategory(id).subscribe((data) => {
      c = data
      Swal.fire({
        title: 'Actualizar nueva categoria',
        html: `<form>
          <div class="mb-3">
            <input type="text" class="form-control" id="nombre" value="`+ c.name + `">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="descripción" value="`+ c.description + `">
          </div>
        </form>`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result: { isConfirmed: any; }) => {
        nombre = document.getElementById("nombre");
        descripcion = document.getElementById("descripción");
        if (result.isConfirmed) {
          const categoria = { name: nombre.value, description: descripcion.value }
          if (nombre.value == null && descripcion.value == null || nombre.value == "" || descripcion.value == "") {
            Swal.fire({
              title: 'Por favor llena los campos',
              showDenyButton: false,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            })
          } else {
            this.service.updateCategory(id, categoria).subscribe(
              (data) => window.location.reload(),
              error => {
                Swal.fire({
                  title: 'Ocurrió un error al crear la categoria ',
                  showDenyButton: false,
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                })
              }
            )
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Categoria Actualzada con éxito',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else {

        }
      })
    })

  }

//Eliminar categoria
  Delete(id: any) {


    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar esta categoria?',
      text: "Este proceso no podrá ser revertido...",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.service.deleteCategory(id).subscribe(data => {
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


}

