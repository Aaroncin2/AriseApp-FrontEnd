import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MensajesapiService } from '../../services/mensajesapi.service';

@Component({
  selector: 'app-menu',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  role: string = '';
  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private motivacionalService: MensajesapiService
  ) {}
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('motivacionMostrada'); // Limpia también
    location.href = '/login'; // Fuerza recarga total
    
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isVoluntario() {
    return this.role === 'VOLUNTARIO';
  }

  isEcologista() {
    return this.role === 'ECOLOGISTA';
  }

 ngOnInit(): void {
  if (this.loginService.verificar()) {
    this.role = this.loginService.showRole();

    if (!sessionStorage.getItem('motivacionMostrada')) {
      const frase = this.motivacionalService.obtenerFraseAleatoria();
      this.snackBar.open(`🌱 ${frase}`, 'Cerrar', {
        duration: 6000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['motivacion-snackbar']
      });
      sessionStorage.setItem('motivacionMostrada', 'true');
    }
  }
}
}
