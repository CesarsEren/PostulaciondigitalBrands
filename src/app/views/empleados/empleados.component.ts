import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmpleadoService } from "src/app/http/empleado.service";
import { Empleado } from "src/app/model/empleado.interface";
declare var $: any;
import Swal from "sweetalert2";

@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.css"],
})
export class EmpleadosComponent implements OnInit {
  title = "Empleados";
  empleados: Empleado[] = [];
  empleadoform: FormGroup;
  empleadoformedit: FormGroup;
  constructor(private service: EmpleadoService, private fb: FormBuilder) {
    this.IniciarFormularios();
  }
  response: any;
  currentPage = 0;
  size: number = 20;
  page: number = 1;
  gender: any = "-1";
  totalpage: number;
  ngOnInit(): void {
    this.LeerEmpleados();
  }
  IniciarFormularios() {
    this.empleadoform = this.fb.group({
      names: ["", [Validators.required]],
      maternal: ["", [Validators.required]],
      paternal: ["", [Validators.required]],
      gender: ["-1", [Validators.required]],
      dni: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      login: ["", [Validators.required]],
      pass: ["", [Validators.required]],
      weekly_hours: ["", [Validators.required]],
      extra_hours: ["", [Validators.required]],
      extra_minutes: ["", [Validators.required]],
      idemployee: [0],
    });
    this.empleadoformedit = this.fb.group({
      names: ["", [Validators.required]],
      maternal: ["", [Validators.required]],
      paternal: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      dni: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      login: ["", [Validators.required]],
      pass: ["", [Validators.required]],
      weekly_hours: ["", [Validators.required]],
      extra_hours: ["", [Validators.required]],
      extra_minutes: ["", [Validators.required]],
    });
  }
  LeerEmpleados() {
    this.service
      .GetEmpleados(this.size, this.page, this.gender)
      .subscribe((data) => {
        if (!data.error) {
          //this.totalpage = data.counter / this.size;
          this.empleados = data.content;
        } else {
          alert(data.message);
        }
      });
  }
  deleteEmpleado(empleado: Empleado) {
    this.service.DeleteEmpleado(empleado).subscribe(
      (res) => {
        if (!res.error) {
          alert(res.message);
          this.LeerEmpleados();
        } else {
          alert(res.message);
        }
      },
      (err) => console.log(err)
    );
  }

  openmodalEdit(empleado: Empleado) {
    $("#myModalEdit").modal("show");
    this.empleadoformedit = this.fb.group({
      names: [empleado.names, [Validators.required]],
      maternal: [empleado.maternal, [Validators.required]],
      paternal: [empleado.paternal, [Validators.required]],
      gender: [empleado.gender, [Validators.required]],
      dni: [empleado.dni, [Validators.required]],
      mobile: [empleado.mobile, [Validators.required]],
      login: [empleado.login, [Validators.required]],
      pass: [empleado.pass, [Validators.required]],
      weekly_hours: [empleado.weekly_hours, [Validators.required]],
      extra_hours: [empleado.extra_hours, [Validators.required]],
      extra_minutes: [empleado.extra_minutes, [Validators.required]],
      idemployee: [empleado.idemployee],
    });
  }

  registrarempleado() {
    this.service.PostEmpleado(this.empleadoform.getRawValue()).subscribe(
      (res) => {
        if (!res.error) {
          Swal.fire("Buen Trabajo", res.message, "success");
          this.LeerEmpleados();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.message,
          });
        }
      },
      (err) => console.log(err)
    );
    this.IniciarFormularios();
    $("#myModal").modal("hide");
  }
  editarempleado() {
    this.service.PutEmpleado(this.empleadoformedit.getRawValue()).subscribe(
      (res) => {
        if (!res.error) {
          Swal.fire("Buen Trabajo", res.message, "success");
          this.LeerEmpleados();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.message,
          });
        }
      },
      (err) => console.log(err)
    );
    this.IniciarFormularios();
    $("#myModalEdit").modal("hide");
  }
}
