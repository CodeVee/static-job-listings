import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() roles: string[] = [];
  @Input() levels: string[] = [];
  @Input() languages: string[] = [];
  @Input() tools: string[] = [];
  @Output() roleSelected = new EventEmitter<string>();
  @Output() levelSelected = new EventEmitter<string>();
  @Output() languageSelected = new EventEmitter<string>();
  @Output() toolSelected = new EventEmitter<string>();
  @Output() clearSelected = new EventEmitter();


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

  clearFilters(): void {
    this.clearSelected.emit();
  }
}
