import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [CommonModule, SearchBar],
  templateUrl: './crypto-list.html',
  styleUrls: ['./crypto-list.css']
})
export class CryptoList implements OnInit, AfterViewInit {
  cryptos: any[] = [];
  @ViewChildren('cryptoCard', { read: ElementRef }) cryptoCards!: QueryList<ElementRef>;
  private lastQuery = '';

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.cryptoService.getCryptos().subscribe((data: any[]) => {
      this.cryptos = data;
      if (this.lastQuery) setTimeout(() => this.searchCrypto(this.lastQuery), 100);
    });
  }

  ngAfterViewInit() {
    this.cryptoCards.changes.subscribe(() => {
      if (this.lastQuery) this.searchCrypto(this.lastQuery);
    });
  }

  onSearchCrypto(query: string) {
    this.lastQuery = query;
    this.searchCrypto(query);
  }

  private searchCrypto(query: string) {
    if (!query || this.cryptos.length === 0) return;
    query = query.toLowerCase();

    const index = this.cryptos.findIndex(c =>
      (c.name && c.name.toLowerCase().includes(query)) ||
      (c.symbol && c.symbol.toLowerCase().includes(query))
    );

    if (index === -1) return;
    const el = this.cryptoCards.toArray()[index]?.nativeElement;
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('highlight');
    setTimeout(() => el.classList.remove('highlight'), 2000);
  }
}
