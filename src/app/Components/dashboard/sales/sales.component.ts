import { Component } from '@angular/core';
import { error } from 'jquery';
import { SalesService } from 'src/Services/sales.service';
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

  constructor(private service: SalesService) {}
  Sale: any;
  loading:boolean=true;

  ngOnInit() {
    this.service.getSales().subscribe((data) => {
      this.Sale = data;
      this.loading=false
      console.log(this.Sale);
    },
    (error)=>{
    console.log(error);
    this.loading=false
    });
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('tableSales'));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
    XLSX.writeFile(wb, 'Ventas.xlsx');
  }
//BUSQUEDA DE CADA TABLA
onChange(event: any){
  var value = event.target.value
  $("#table tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    return true;
  });
}
}
