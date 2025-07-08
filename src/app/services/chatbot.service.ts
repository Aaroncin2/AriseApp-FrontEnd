import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private readonly apiKey = 'Bearer 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';

  constructor(private http: HttpClient) {}

  getChatResponse(pregunta: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.apiKey,
      'Content-Type': 'application/json',
      'Referer': window.location.origin || 'http://localhost:4200'
    });

    const body = {
      model: 'mistralai/mistral-7b-instruct:free',
      messages: [
        {
          role: 'system',
          content: 'Eres un experto en el medio ambiente. Responde de forma clara y concisa.'
        },
        { 
          role: 'user',  // ¡Este es el mensaje que faltaba!
          content: pregunta 
        }
      ],
      max_tokens: 300
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}