import { Component } from '@angular/core';
import { CategoriesService } from 'src/Services/categories.service';
import { ProductsService } from 'src/Services/products.service';
import { SupplierService } from 'src/Services/supplier.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent {

  currentRol= localStorage.getItem("rol")
  currentUserData = {'name': localStorage.getItem("userName"), 'rol': localStorage.getItem("rol")}
  
  constructor(private service: ProductsService, private serviceP: SupplierService, private serviceC: CategoriesService, private sanitizer:DomSanitizer){}
 
  products: any
  categorias: any
  provedores: any
  urlImg: any
  modalTitle:String=""
  activatAddEdditProducts: Boolean=false
  Producto:any;
  

  ngOnInit() {
    this.service.getProducts().subscribe((data) => {
      this.products = data
      this.urlImg =this.products.data[0].image.url
      console.log(this.urlImg)
    })

  }


  

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tableProducts'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Productos existentes');
    XLSX.writeFile(wb, 'Productos Disponibles.xlsx');
  }


//Agregar nuevo producto

addModal(){
this.Producto = null
this.modalTitle="Agregar nuevo producto"
this.activatAddEdditProducts=true

}

editModal(Producto:any){
this.Producto = Producto
this.modalTitle="Editar el producto"
this.activatAddEdditProducts=true


}

closeModal(){
  this.activatAddEdditProducts=false
}



//Eliminar producto
Delete(id: any) {
  Swal.fire({
    title: '¿Estás seguro de que quieres eliminar este producto?',
    text: "Este proceso no podrá ser revertido...",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result: { isConfirmed: any; }) => {
    if (result.isConfirmed) {
      this.service.deleteProduct(id).subscribe(data => {
        Swal.fire(
          'Eliminado!',
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
function html2canvas(data: HTMLElement | null) {
  throw new Error('Function not implemented.');
}

