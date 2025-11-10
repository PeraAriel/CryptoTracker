import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-list.html',
  styleUrls: ['./crypto-list.css']
})
export class CryptoList implements OnInit {
  cryptos: any[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.cryptoService.getCryptos().subscribe((data: any[]) => {
      this.cryptos = data;
    });
  }
}
