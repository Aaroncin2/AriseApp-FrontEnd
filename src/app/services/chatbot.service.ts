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
          content: 'Eres un experto en el medio ambiente de precisión. Responde de forma clara y concisa.'
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