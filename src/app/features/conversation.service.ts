import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Tone = 'gracioso' | 'directo' | 'romantico';

export interface OpenersRequest {
  tone: Tone;
  context?: string;
  language?: string;
  count?: number;
}

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private baseUrl = "https://localhost:44338/api/conversations"

  constructor(private http: HttpClient) {}

  generate(req: OpenersRequest) {
    return this.http.post<{ openers: string[] }>(this.baseUrl + "/openers", {
      tone: req.tone,
      context: req.context?.trim(),
      language: req.language ?? 'es',
      count: req.count ?? 3
    });
  }

  replyFromImage(file: File, opts?: { language?: string; tone?: Tone; count?: number }) {
    const fd = new FormData();
    fd.append('image', file);
    fd.append('language', opts?.language ?? 'es');
    fd.append('tone', opts?.tone ?? 'gracioso');
    fd.append('count', String(opts?.count ?? 1));

    return this.http.post<string>(`${this.baseUrl}/reply-from-image`, fd, {
      responseType: 'text' as 'json'
    });
  }
}
