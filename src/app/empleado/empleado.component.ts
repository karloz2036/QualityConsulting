import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {EmpleadoService} from '../../services/Empleado/empleado.service'
import {EstadoService} from '../../services/Estado/estado.service'
import {PuestoService} from '../../services/Puesto/puesto.service'
import {EmpleadoModel} from '../../model/Empleado.Model'
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleadosResultados: EmpleadoModel[] = [];
  //empleadosResultados: [] = [];
  PuestosResultados: [] = [];
  EstadosResultados: [] = [];
  total: number = 0;
  totalRegistros: number = 0;
  esEditar: boolean = false;
  empleados : EmpleadoModel;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private empleadoService: EmpleadoService,private puestoService: PuestoService,
              private estadoService: EstadoService) {
    this.empleados = new EmpleadoModel();
   }

  ngOnInit(): void {

    this.buscarPuestos();
    this.buscarEstados();
    this.buscarEmpleados();
  }

  buscarEmpleados(){
    this.empleadosResultados = [];
    this.total = 0;
    this.totalRegistros = 0;
    this.empleadoService.buscarEmpleados().subscribe(response => {
      if (response == null) {
        alert("Error en el servicio");
      } else if (response.isCorrect == 'false') {
        alert(response.message);
      } else if (response.totalRegistros == 0) {
        alert("Sin Resultados");          
      } else {
        this.total = response.data.total;
        this.empleadosResultados = response.data.info.result;
        this.totalRegistros = response.totalRegistros;
        console.log(this.empleadosResultados, 'empleadosResultados');
      }
    }, (err) => {
        alert("error en servicio");
        console.log(err, 'error catch');
    });

  }

  buscarPuestos(){
    this.PuestosResultados = [];
    this.total = 0;
    this.totalRegistros = 0;
    this.puestoService.obtenerPuestos().subscribe(response => {
      if (response == null) {
        alert("Error en el servicio");
      } else if (response.isCorrect == 'false') {
        alert(response.message);
      } else if (response.totalRegistros == 0) {
        alert("Sin Resultados");          
      } else {
        this.total = response.data.total;
        this.PuestosResultados = response.data.info.result;
        this.totalRegistros = response.totalRegistros;
        //console.log(this.PuestosResultados, 'PuestosResultados');
      }
    }, (err) => {
        alert("error en servicio");
        console.log(err, 'error catch');
    });

  }

  buscarEstados(){
    this.EstadosResultados = [];
    this.total = 0;
    this.totalRegistros = 0;
    this.estadoService.obtenerEstados().subscribe(response => {
      if (response == null) {
        alert("Error en el servicio");
      } else if (response.isCorrect == 'false') {
        alert(response.message);
      } else if (response.totalRegistros == 0) {
        alert("Sin Resultados");          
      } else {
        this.total = response.data.total;
        this.EstadosResultados = response.data.info.result;
        this.totalRegistros = response.totalRegistros;
        //console.log(this.EstadosResultados, 'EstadosEstados');
      }
    }, (err) => {
        alert("error en servicio");
        console.log(err, 'error catch');
    });

  }

  validarFormulario(formEmpleados: NgForm) {
    if (formEmpleados.valid) {
      if (this.esEditar) {
        this.actualizarEmpleado();
      } else {
        this.guardarEmpleado();
      }
    }
  }

  guardarEmpleado(){
    console.log(this.empleados, 'this.empleados');

    this.empleadoService.agregarEmpleado(this.empleados).subscribe(response => {
      console.log(response, 'response alta empleado');
      if (response == null) {
        alert("Error en el servicio");
      } else if (response.isCorrect == 'false') {
        alert(response.message);
      } else if (response.totalRegistros == 0) {
        alert("Sin Resultados");          
      } else {
        this.total = response.data.total;
        this.totalRegistros = response.totalRegistros;
        this.buscarEmpleados();
        this.empleados = new EmpleadoModel();
        this.fileInput.nativeElement.value = '';
        this.esEditar = false;
        alert("Empleado agregado Correctamente");
        
      }
    }, (err) => {
      alert("error en servicio");
      console.log(err, 'error catch');
    });
  }

  actualizarEmpleado() {

    this.empleadoService.actualizarEmpleado(this.empleados).subscribe(response => {
      console.log(response, 'response actualizar empleado');
      if (response == null) {
        alert("Error en el servicio");
      } else if (response.isCorrect == 'false') {
        alert(response.message);
      } else {
        this.buscarEmpleados();
        this.empleados = new EmpleadoModel();
        this.fileInput.nativeElement.value = '';
        this.esEditar = false;
        alert("Empleado actualizado Correctamente");
      }
    }, (err) => {
      alert("error en servicio");
      console.log(err, 'error catch');
    });
  }

  editarEmpleado(empleadoId: number){
  
    console.log(empleadoId, 'empleadoId');
    for (const emp of this.empleadosResultados) {
      if (emp["id"] == empleadoId) {
        this.empleados.Id = emp["id"];
        this.empleados.Fotografia = emp["fotografia"];
        this.empleados.Nombre = emp["nombre"];
        this.empleados.Apellido = emp["apellido"];
        this.empleados.Puesto.Id = emp["puesto"].id;
        this.empleados.FechaNacimiento = this.formatoFecha(emp["fechaNacimiento"]);
        this.empleados.FechaContratacion = this.formatoFecha(emp["fechaContratacion"]);
        this.empleados.Direccion = emp["direccion"];
        this.empleados.Telefono = emp["telefono"];
        this.empleados.CorreoElectronico = emp["correoElectronico"];
        this.empleados.Estado.Id = emp["estado"].id;
        this.esEditar = true;
        break;
      }

    }
    console.log(this.empleados, 'this.empleados update');
  }
  
  eliminarEmpleado(empleadoId: number){

    if (confirm("¿Está seguro de eliminar este empleado?")) {
      this.empleadoService.eliminarEmpleado(empleadoId).subscribe(response => {
        if (response == null) {
          alert("Error en el servicio");
        } else if (response.isCorrect == 'false') {
          alert(response.message);
        } else if (response.totalRegistros == 0) {
          alert("Sin Resultados");          
        } else {
          this.buscarEmpleados();
          alert("Empleado eliminado Correctamente");
          
        }
      }, (err) => {
        alert("error en servicio");
        console.log(err, 'error catch');
      });
    }
  }

  formatoFecha(fecha: string): string {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.empleados.Fotografia = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }



}
