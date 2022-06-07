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

  get showSearchBar(): boolean {
    return !!this.roles.length ||
          !!this.levels.length ||
       !!this.languages.length ||
          !!this.tools.length
  }
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

  private filterJobs(): void {
    this.filteredJobs = [...this.originalJobs];
    if (!!this.roles.length) {
      this.filteredJobs = this.filteredJobs.filter(r => this.roles.includes(r.role));
    }
    if (!!this.levels.length) {
      this.filteredJobs = this.filteredJobs.filter(l => this.levels.includes(l.level));
    }
    if (!!this.languages.length) {
      this.filteredJobs = this.filteredJobs.filter(l => l.languages.some(lg => this.languages.includes(lg)));
    }
    if (!!this.tools.length) {
      this.filteredJobs = this.filteredJobs.filter(t => t.tools.some(tl => this.tools.includes(tl)) );
    }
  }

  addRole(role: string): void {
    this.roles.push(role);
    this.roles = [...new Set(this.roles)];
    this.filterJobs();
  }
  addLevel(level: string): void {
    this.levels.push(level);
    this.levels = [...new Set(this.levels)];
    this.filterJobs();
  }
  addLanguage(language: string): void {
    this.languages.push(language);
    this.languages = [...new Set(this.languages)];
    this.filterJobs();
  }
  addTool(tool: string): void {
    this.tools.push(tool);
    this.tools = [...new Set(this.tools)];
    this.filterJobs();
  }

  removeRole(role: string): void {
    this.roles = this.roles.filter(r => r !== role);
    this.filterJobs();
  }
  removeLevel(level: string): void {
    this.levels = this.levels.filter(l => l !== level);
    this.filterJobs();
  }
  removeLanguage(language: string): void {
    this.languages = this.languages.filter(l => l !== language);
    this.filterJobs();
  }
  removeTool(tool: string): void {
    this.tools = this.tools.filter(t => t !== tool);
    this.filterJobs();
  }

  clearFilters(): void {
    this.roles = [];
    this.levels = [];
    this.languages = [];
    this.tools = [];
    this.filterJobs();
  }
}
