import { Component } from '@angular/core';
import { CategoriesService } from 'src/Services/categories.service';
import { ProductsService } from 'src/Services/products.service';
import { SupplierService } from 'src/Services/supplier.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {


  constructor(private service: ProductsService, private serviceP: SupplierService, private serviceC: CategoriesService, private sanitizer:DomSanitizer){}
 
  products: any
  categorias: any
  provedores: any
  urlImg: any
  

  ngOnInit() {
    this.service.getProducts().subscribe((data) => {
      this.products = data
      this.urlImg =this.products.data[0].image.url
      console.log(this.urlImg)
    })
    this.serviceP.getSuppliers().subscribe((data) => {
      this.provedores = data
    })

    this.serviceC.getCategories().subscribe((data) => {
      this.categorias = data
    })
    setTimeout(() => {
      this.urlImg = this.sanitizer.bypassSecurityTrustUrl
    }, 300);
  }


//Agregar nuevo producto
Add() {
  console.log(this.urlImg)
  var nombre: any
  var descripción: any
  var stock: any
  var categoria: any
  var provedor: any
  
  //Se hace la peticion, se extrae el numero de proveedore y se saca con el .length
  var indiceP = this.provedores.data.length
    //Ya que se tiene el numero de proveedores, se inicializa en 0 para ir accediendo a los valores del array
  var iP = 0
    //Aqui meto mi codigo html
  var optionProviders = ""
      //en la opcion Se accede a través del indice para proveedores 
  do {
    optionProviders += "<option value='"+this.provedores.data[iP].id+"'>"+this.provedores.data[iP].nameSupplier+"</option>"
    console.log(optionProviders)
    iP++
  } while (iP < indiceP);
    //en la opcion Se accede a través del indice para categorias
    // Variables de categorias 
   var indiceC = this.categorias.data.length
   var iC =0 
   var opcionCategories = ""
    do {
      opcionCategories += "<option value='"+this.categorias.data[iC].id+"'>"+this.categorias.data[iC].name+"</option>"
      // console.log(opcionCategories)
      iC++
    } while (iC < indiceC);
  Swal.fire({
    title: '¿Deseas agregar nuevo producto?',
    html: `<form>
        <div class="mb-3">
          <input type="text" class="form-control" id="nombre" placeholder="Ingresa el nombre del producto:">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="descripción" placeholder="Descripción:">
        </div>
        <div class="mb-3">
        <input type="number" class="form-control" id="stock" placeholder="Stock:">
        </div>
        <label> Seleccionar Categoria: </label>
         <div class="mb-3">
          <select class="form-control" id="categoria">
            `+opcionCategories+`
          </select>              
         </div>
        <label> Seleccionar provedor: </label>
        <div class="mb-3">
          <select class="form-control" id="provedor">
          `+optionProviders+`
          </select>      
      </div>    
      </form>`,
    showDenyButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: `Cancelar`,
  }).then((result: { isConfirmed: any; }) => {
    nombre = document.getElementById("nombre");
    descripción= document.getElementById("descripción");
    stock= document.getElementById("stock");
    categoria = document.getElementById("categoria");
    provedor = document.getElementById("provedor");
    if (result.isConfirmed) {
      console.log(nombre.value, descripción.value, stock.value, categoria.value, provedor.value)
      const producto = { name: nombre.value, description: descripción.value, stock: stock.value, category_id: categoria.value, supplier_id:provedor.value }
      if (nombre.value == null && descripción.value == null &&  stock.value == null  &&  categoria.value == null   &&  provedor.value == null)
       {
        Swal.fire({
          title: 'Por favor llena los campos!',
          showDenyButton: false,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        })
      } else {
         this.service.addProduct(producto).subscribe(
          (data) => window.location.reload(),
          error => {
            Swal.fire({
              title: 'Ocurrió un error al registrar producto',
              showDenyButton: false,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            })
          })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto registrado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
    }
  })

}


//Editar producto
Edit(id:any) {
  var producto:any
  this.service.getProduct(id).subscribe((item) =>{
    producto = item
  })

  var nombre = producto.data.name
  var descripción = producto.data.description
  var stock= producto.data.stock
  var categoria = producto.data.category_id
  var provedor = producto.data.supplier_id
  
  setTimeout(() => {
    var nombre = producto.data.name;
    var descripcion = producto.data.description;
    var stock = producto.data.stock;
    var categoria = producto.data.category_id;
    var proveedor = producto.data.supplier_id;
    console.log("Nombre:", nombre);
    console.log("Descripción:", descripcion);
    console.log("Stock:", stock);
    console.log("Categoría:", categoria);
    console.log("Proveedor:", proveedor);
  }, 300);
  //Se hace la peticion, se extrae el numero de proveedore y se saca con el .length
  var indiceP = this.provedores.data.length
    //Ya que se tiene el numero de proveedores, se inicializa en 0 para ir accediendo a los valores del array
  var iP = 0
    //Aqui meto mi codigo html
  var optionProviders = ""
      //en la opcion Se accede a través del indice para proveedores 
  do {
    optionProviders += "<option value='"+this.provedores.data[iP].id+"'>"+this.provedores.data[iP].nameSupplier+"</option>"
    console.log(optionProviders)
    iP++
  } while (iP < indiceP);
    //en la opcion Se accede a través del indice para categorias
    // Variables de categorias 
   var indiceC = this.categorias.data.length
   var iC =0 
   var opcionCategories = ""
    do {
      opcionCategories += "<option value='"+this.categorias.data[iC].id+"'>"+this.categorias.data[iC].name+"</option>"
      // console.log(opcionCategories)
      iC++
    } while (iC < indiceC);
  Swal.fire({
    title: '¿Deseas editar nuevo producto?',
    html: `<form>
        <div class="mb-3">
          <input type="text" class="form-control" id="nombre" value="`+nombre+`">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" id="descripción" value="`+descripción+`">
        </div>
        <div class="mb-3">
        <input type="number" class="form-control" id="stock" value="`+stock+`">
        </div>
        <label> Seleccionar Categoria: </label>
         <div class="mb-3">
          <select class="form-control" id="categoria">
          <option value="" disabled hidden selected>`+categoria+`</option>
            `+opcionCategories+`
          </select>              
         </div>
        <label> Seleccionar provedor: </label>
        <div class="mb-3">
          <select class="form-control" id="provedor">
          <option value="" disabled hidden selected>`+provedor+`</option>
          `+optionProviders+`
          </select>      
      </div>    
      </form>`,
    showDenyButton: true,
    confirmButtonText: 'Confirmar',
    denyButtonText: `Cancelar`,
  }).then((result: { isConfirmed: any; }) => {
    nombre = document.getElementById("nombre");
    descripción= document.getElementById("descripción");
    stock= document.getElementById("stock");
    categoria = document.getElementById("categoria");
    provedor = document.getElementById("provedor");
    if (result.isConfirmed) {
      console.log(nombre.value, descripción.value, stock.value, categoria.value, provedor.value)
      const producto = { name: nombre.value, description: descripción.value, stock: stock.value, category_id: categoria.value, supplier_id:provedor.value }
      if (nombre.value == null && descripción.value == null &&  stock.value == null  &&  categoria.value == null   &&  provedor.value == null)
       {
        Swal.fire({
          title: 'Por favor llena los campos!',
          showDenyButton: false,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        })
      } else {
         this.service.addProduct(producto).subscribe(
          (data) => window.location.reload(),
          error => {
            Swal.fire({
              title: 'Ocurrió un error al registrar producto',
              showDenyButton: false,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            })
          })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto registrado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
    }
  })

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
