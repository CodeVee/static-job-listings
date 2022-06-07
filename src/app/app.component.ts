import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from './job.model';
import { JobService } from './job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  originalJobs: Job[] = [];
  filteredJobs: Job[] = [];
  roles: string[] = [];
  levels: string[] = [];
  languages: string[] = [];
  tools: string[] = [];
  protected sub!: Subscription;
  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.getJobs();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  private getJobs(): void {
    this.sub = this.jobService.getJobs().subscribe(
      res => {
        this.originalJobs = res;
        this.filteredJobs = [...this.originalJobs];
      }
    )
  }

  addRole(role: string): void {
    this.roles.push(role);
    this.roles = [...new Set(this.roles)]
  }
  addLevel(level: string): void {
    this.levels.push(level);
    this.levels = [...new Set(this.levels)]
  }
  addLanguage(language: string): void {
    this.languages.push(language);
    this.languages = [...new Set(this.languages)]
  }
  addTool(tool: string): void {
    this.tools.push(tool);
    this.tools = [...new Set(this.tools)]
  }
}
