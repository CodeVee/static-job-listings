import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../job.model';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  @Input() job!: Job;
  @Output() roleSelected = new EventEmitter<string>();
  @Output() levelSelected = new EventEmitter<string>();
  @Output() languageSelected = new EventEmitter<string>();
  @Output() toolSelected = new EventEmitter<string>();


  selectRole(role: string): void {
    this.roleSelected.emit(role);
  }
  selectLevel(level: string): void {
    this.levelSelected.emit(level);
  }
  selectLanguage(language: string): void {
    this.languageSelected.emit(language);
  }
  selectTool(tool: string): void {
    this.toolSelected.emit(tool);
  }
}
