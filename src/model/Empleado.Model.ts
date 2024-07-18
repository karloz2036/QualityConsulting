import {EstadoModel} from '../model/Estado.Model'
import {PuestoModel} from '../model/Puesto.Model'

export class EmpleadoModel {
    public Id: number;
    public Fotografia: string;
    public Nombre: string;
    public Apellido: string;
    public Puesto: PuestoModel;
    public FechaNacimiento: string;
    public FechaContratacion : string;
    public Direccion: string;
    public Telefono: string;
    public CorreoElectronico: string;
    public Estado: EstadoModel;
    
    constructor() {    
        this.Id = 0;
        this.Fotografia = '';
        this.Nombre = '';
        this.Apellido = '';
        this.Puesto = new PuestoModel();
        this.FechaNacimiento = '';
        this.FechaContratacion= '';
        this.Direccion = '';
        this.Telefono = '';
        this.CorreoElectronico = '';
        this.Estado = new EstadoModel();

    }




}
