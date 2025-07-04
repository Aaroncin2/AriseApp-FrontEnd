import { Component } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  pregunta: string = '';
  respuesta: string = '';
  cargando = false;

  constructor(private cs:ChatbotService) {}

  preguntarIA() {
    if (!this.pregunta) return;

    this.cargando = true;
    this.respuesta = '';

    this.cs.getChatResponse(this.pregunta).subscribe({
      next: (res) => {
        this.respuesta = res.choices?.[0]?.message?.content || 'Sin respuesta';
        this.cargando = false;
      },
      error: () => {
        this.respuesta = 'Ocurrió un error al consultar la IA.';
        this.cargando = false;
      }
    });
  }

}
