import { Component, OnInit, Input } from '@angular/core';
import { IPurchases } from 'src/app/interfaces/ipurchases';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-puchase',
  templateUrl: './puchase.component.html',
  styleUrls: ['./puchase.component.scss'],
})
export class PuchaseComponent implements OnInit {
  @Input() purchase!: IPurchases;
  constructor(private purchaseService: PurchaseService) { }

  ngOnInit() {}

}
