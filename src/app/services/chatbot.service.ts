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