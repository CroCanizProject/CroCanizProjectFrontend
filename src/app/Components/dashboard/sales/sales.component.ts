import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {


  currentRol= localStorage.getItem("rol")
  currentUserData = {'name': localStorage.getItem("userName"), 'rol': localStorage.getItem("rol")}


  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tableCategories'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Categorias existentes');
    XLSX.writeFile(wb, 'Categorias Disponibles.xlsx');
  }

}
