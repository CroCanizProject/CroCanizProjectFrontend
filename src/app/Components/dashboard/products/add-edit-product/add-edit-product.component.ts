import { Component, Input } from '@angular/core';
import { CategoriesService } from 'src/Services/categories.service';
import { SupplierService } from 'src/Services/supplier.service';
import { ProductsService } from 'src/Services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {

  //IMAGEN 
// Propiedad para almacenar el archivo seleccionado
selectedFile!: File;

// Método para manejar la selección de archivo
onFileSelected(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files) {
    this.selectedFile = inputElement.files[0];
  }
}



  // Variables para almacenar datos de categorías y proveedores
  categorias: any;
  proveedores: any;
  ProductoForm!: FormGroup;

  // Inyección de servicios: CategoriesService, SupplierService y ProductsService
  constructor(private fb:FormBuilder,private CategoriasService: CategoriesService, private ProveedoresService: SupplierService, private ProductoService: ProductsService){}

  // Propiedad de entrada que recibe datos del componente padre
  @Input()
  Producto: any;

  // Propiedades para almacenar datos del producto
  name: string = "";
  description: string = "";
  stock!: number;
  price!: number;
  
  

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    if(this.Producto != null){
      // Asigna los valores del producto a las propiedades del componente
    this.ProductoForm=this.fb.group({
      name: [this.Producto.name, Validators.required],
      description: [this.Producto.description, Validators.required],
      stock: [this.Producto.stock, Validators.required],
      price: [this.Producto.price, Validators.required],
      category_id: ['', Validators.required],
      supplier_id: ['', Validators.required],
      image: ['', Validators.required]
    })
  }else{
    this.ProductoForm=this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      category_id: ['', Validators.required],
      supplier_id: ['', Validators.required],
      image: ['', Validators.required]
    })
  }
    // Obtiene datos de categorías y se suscribe al Observable para actualizar categorias
    this.CategoriasService.getCategories().subscribe((datos) => {
      this.categorias = datos;
      console.log(this.categorias)
    });

    // Aqui se obtienen datos de proveedores y se suscribe para actualizar proveedores
    this.ProveedoresService.getSuppliers().subscribe((datos) => {
      this.proveedores = datos;
      console.log(this.proveedores)
    });
    
  }
// Validar datos y mandar a servidor
onSubmit() {
  if(this.ProductoForm.valid){
console.log(this.selectedFile)
  // Agregar la imagen solo si se ha seleccionado un archivo
  const formData = new FormData();
  formData.append('name', this.ProductoForm.value.name);
  formData.append('description', this.ProductoForm.value.description);
  formData.append('stock', this.ProductoForm.value.stock);
  formData.append('category_id', this.ProductoForm.value.category_id);
  formData.append('supplier_id', this.ProductoForm.value.supplier_id);
  formData.append('price', this.ProductoForm.value.price);
  formData.append('image', this.selectedFile, this.selectedFile.name)
  


  // Aquí llamas al servicio para guardar los datos usando formData
  this.ProductoService.addProduct(formData)
    .subscribe(
      (response) => {
        Swal.fire({
          title: 'Listo!!',
          text: 'El producto ha sido creado correctamente.',
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
          text: 'Ha ocurrido un error al crear el producto.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
      );
  }else{
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Al parecer aún no has llenado los campos',
    })
  }
}


//Editar producto
update(id:number){
  if(this.ProductoForm.valid){
  const formData = new FormData();
  formData.append('name', this.ProductoForm.value.name);
  formData.append('description', this.ProductoForm.value.description);
  formData.append('stock', this.ProductoForm.value.stock);
  formData.append('category_id', this.ProductoForm.value.category_id);
  formData.append('supplier_id', this.ProductoForm.value.supplier_id);
  formData.append('price', this.ProductoForm.value.price);
  formData.append('image', this.selectedFile, this.selectedFile.name)

  this.ProductoService.updateProduct(id, formData)
  .subscribe(
    (response) => {
      Swal.fire({
        title: 'Actualizado!',
        text: 'El producto ha sido actualizado correctamente.',
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
        text: 'Ha ocurrido un error al actualizar el producto.',
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
