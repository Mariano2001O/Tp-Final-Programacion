
class Personal {
    constructor(nombre,apellido,matricula,pacientes){
        this.nombre = nombre
        this.apellido = apellido
        this.matricula = matricula
        this.pacientes = pacientes
    }
}

class Doctor extends Personal{
    constructor (nombre,apellido,especialidad,matricula,pacientes,turnos){
        super(nombre,apellido,matricula,pacientes)
        this.especialidad = especialidad
        this.turnos = []
    }


    datosDoctor(){
        return "Nombre "+this.nombre + " apellido " + this.apellido + " matricula " + this.matricula + " pacientes " + this.pacientes
    }

    
    cargarTurno(hora,paciente){
        let turnoSolicitados = this.horarioAtencion ()
        let ocupadoTurno = this.turnoOcupado(hora)
        if (turnoSolicitados == false){ 
            if (ocupadoTurno == false){
                let nuevoTurnoDoc = {
                                    'hora':hora,
                                    'paciente': paciente
                                }

                let nuevoTurnoPac = {
                                    'hora':hora,
                                    'doctor': this.nombre 
                                    }

                //AQUI VAMOS A CARGAR EL OBJETO nuevoTurnoDoc al doctor
                this.turnos.push (nuevoTurnoDoc)
                this.pacientes.push (paciente)
                //AQUI VAMOS A CARGAR EL OBJETO nuevoTurnoPac al paciente    
                paciente.cargarTurno(nuevoTurnoPac)
                console.log("Turno cargado")



            }else{
                console.log("Turno no disponible.")
            }
        }else {
            console.log("No hay turnos disponibles para el dia de hoy, intente mañana.")
        }
    }
    horarioAtencion(){
        let turnos = this.turnos
        let bandera = false
        if(turnos.length == 6) {
            bandera = true
        }
        return bandera
    }

    turnoOcupado(hora){
        let turnos = this.turnos 
        let bandera = false
        turnos.forEach(turno => { 
            if (turno.hora == hora){
                bandera = true
            }
        });
        return bandera
    }
    mostrarTurno(){
        let turnos = this.turnos 
//  ''  para generar una variable string "vacia"
        let contenido = ''
        let html = `<div class='card mx-auto my-3' style='width: 18rem;'> <div class='card-body'> <h5 class='card-title'>Doctor <strong>${this.nombre}</strong> </h5> <h6 class='card-subtitle mb-2 text-muted'>Turnos</h6> <p class='card-text'>`
        turnos.forEach(turno => {
        contenido += ` Turno de las:<strong>${turno.hora}</strong>  <br> a nombre de <strong>${turno.paciente.nombre}</strong>`
        });
        html+= contenido + '</p> </div> </div>'

        document.write(html)
    }

}
class Paciente {
    constructor (nombre,apellido,dni,fechaNac,obraSocial){
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.fechaNac = fechaNac
        this.turnos = []
        this.obraSocial = obraSocial
    }
    cargarTurno(turno){
        this.turnos.push (turno)
    }

    datosPaciente(){
        return "Nombre "+this.nombre + " apellido " + this.apellido + " Fecha de nacimiento " + this.fechaNac + " Turno " + this.turno + " Obra Social " + this.obraSocial
    }

    edadPaciente(){
        // let fechaNac = (new Date(this.fechaNac))
        // let añoActual = parseInt (new Date())
        // let edad = añoActual.getFullYear() - fechaNac.getFullYear()
        // let fechaMes = añoActual.getMonth() - fechaNac.getMonth()
        // if (
        //     fechaMes < 0 || (fechaMes == 0 && añoActual.getDate() < fechaNac.getDate())
        // ){
        //     edad --
        // }
        // return edad
    
    let anioActual = 2022
    document.write(anioActual - this.fechaNac ,"<br>")
    }
}

class Enfermero extends Personal{
    constructor (nombre,apellido,matricula,pacientes,licenciatura){
        super (nombre,apellido,matricula,pacientes)
        this.licenciatura = licenciatura
    }

    datosEnfermero(){
        return " Nombre "+this.nombre + " apellido " + this.apellido + " matricula " + this.matricula + " pacientes " + this.pacientes + " licenciatura " + this.licenciatura
    }

}



class Clinica {
    constructor(nombre,duenio,responsabilidadJuridica,doctores,enfermeros){
        this.nombre = nombre
        this.duenio = duenio
        this.responsabilidadJuridica = responsabilidadJuridica
        this.doctores = doctores
        this.enfermeros = enfermeros
    }
}


let paciente1 = new Paciente("juan","salaberri",23456789,1985,"ocecac") 
let paciente2 = new Paciente("roberto","guzman",23456789,1909,"ocecac") 
let paciente3 = new Paciente("agustina","contreras",23456789,1900,"ipross") 
let paciente4 = new Paciente("sofia","salle",23456289,1995,"ocecac") 
let paciente5 = new Paciente("tomas","salvaro",23426789,2002,"ocecac") 
let paciente6 = new Paciente("rodrigo","frigerio",23456723,2001,"ocecac") 

let jorge = new Doctor("jorge","greys","cardiologia",23456,[paciente3],[])
let eluney = new Doctor("Eluney","gas","cardiologia",00006,[],[])

let graciela = new Enfermero("graciela","adece",23452,[paciente1,paciente5],"licenciada en enfermeria")
let valeria = new Enfermero("valeria","alfano",73452,[paciente3,paciente4],"licenciada en higiene")
let mario = new Enfermero("mario","gilardi",53452,[paciente2,paciente6],"licenciado en abogacia")

paciente1.edadPaciente()
paciente2.edadPaciente()
paciente4.edadPaciente()

jorge.cargarTurno("09:30",paciente2)
jorge.cargarTurno("10:30",paciente1)
jorge.cargarTurno("08:30",paciente4)
jorge.cargarTurno("11:00",paciente5)

eluney.cargarTurno("09:30",paciente2)
eluney.cargarTurno("10:30",paciente1)
eluney.cargarTurno("08:30",paciente4)
eluney.cargarTurno("11:00",paciente5)

jorge.mostrarTurno()
eluney.mostrarTurno()


let JuanXXV = new Clinica("JuanXXV","marolio","industriasINCS",[jorge,eluney],[graciela,valeria,mario])