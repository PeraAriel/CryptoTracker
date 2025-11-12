import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBar {
  @Input() cryptos: any[] = [];
  @Output() search = new EventEmitter<string>();

  query: string = '';
  filtered: any[] = [];
  showSuggestions: boolean = false;

  // Questa funzione risolve l'errore
  onSearch() {
    if (!this.query.trim()) return;
    this.search.emit(this.query.trim().toLowerCase());
    this.showSuggestions = false;
  }

  onInputChange() {
    const q = this.query.trim().toLowerCase();
    if (!q) {
      this.filtered = [];
      this.showSuggestions = false;
      return;
    }

    this.filtered = this.cryptos
      .filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q))
      .slice(0, 6);

    this.showSuggestions = this.filtered.length > 0;
  }

  selectCrypto(name: string) {
    this.query = name;
    this.showSuggestions = false;
    this.search.emit(name.toLowerCase());
  }
}
