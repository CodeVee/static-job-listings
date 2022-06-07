import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  jobs: Job[] = [];
  private jsonURL = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    if (this.jobs.length) {
      return of(this.jobs);
    }

    return this.http.get<Job[]>(this.jsonURL)
    .pipe(
      map(res => res.map(job => ({ ...job, logo: job.logo.replace('./', 'assets/')}))),
      tap(res => this.jobs = res));
  }
}
