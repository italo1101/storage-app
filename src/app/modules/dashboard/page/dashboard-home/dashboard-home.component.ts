import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { MessageService } from 'primeng/api';
import { ProductsService } from './../../../../services/products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>()
  public productsList: Array<GetAllProductsResponse> = [];

  constructor(
    private ProductsService: ProductsService,
    private messageService:MessageService,
    private ProductsDataTransferService: ProductsDataTransferService
  ){}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.ProductsService.getAllProducts()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        if(response.length > 0){
          this.productsList = response;
          this.ProductsDataTransferService.setProductsData(this.productsList)
        }
      }, error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos!',
          life: 2500
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
