import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestService {

    constructor(private http: HttpClient) { }

    private getUrl(route: string): string {
        return `${this.getBaseUrl()}/${route}`
    }

    public getBaseUrl(): string {
        return "http://localhost:5000"
    }

    public getHeader(): any {

        const token = localStorage.getItem("token");
        return token ? { "x-auth-token": token } : undefined;
    }

    public get<T>(route: string): Observable<T> {
        return this.http.get<T>(this.getUrl(route), {
            headers: this.getHeader(),
        });
    }

    public post<T>(route: string, body?: object): Observable<T> {
        return this.http.post<T>(this.getUrl(route), body, { headers: this.getHeader() });
    }
}