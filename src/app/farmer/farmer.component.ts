import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface Order {
  id: number;
  product: string;
  qty: string;
  status: string;
}

@Component({
  selector: 'app-farmer',
  imports:[FormsModule,CommonModule],
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent {
  selectedPage: string = 'dashboardContent';
  
  // Products
  showProductForm: boolean = false;
  products: Product[] = [];
  newProduct: Partial<Product> = {};

  // Orders
  sampleOrders: Order[] = [
    { id: 1, product: 'Cabbage', qty: '10kg', status: 'Pending' },
    { id: 2, product: 'Spinach', qty: '3kg', status: 'Packed' },
    { id: 3, product: 'Potatoes', qty: '25kg', status: 'Shipped' },
    { id: 4, product: 'Onions', qty: '5kg', status: 'Delivered' }
  ];

  // Profile
  profileImageUrl: string = '';
  profileName: string = 'Harsha Dasari';
  profileAddress: string = 'Perupalem';
  profileEmail: string = '';
  profileMobile: string = '';

  switchPage(page: string) {
    this.selectedPage = page;
  }

  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
  }

  handleProductImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newProduct.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.quantity && this.newProduct.price && this.newProduct.imageUrl) {
      this.products.push({
        name: this.newProduct.name,
        quantity: this.newProduct.quantity,
        price: this.newProduct.price,
        imageUrl: this.newProduct.imageUrl
      } as Product);
      this.newProduct = {};
      this.showProductForm = false;
    }
  }

  handleProfileImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  get pendingOrders() {
    return this.sampleOrders.filter(order => order.status !== 'Delivered');
  }

  get completedOrders() {
    return this.sampleOrders.filter(order => order.status === 'Delivered');
  }

  updateOrderStatus(order: Order) {
    if (order.status === 'Pending') order.status = 'Packed';
    else if (order.status === 'Packed') order.status = 'Shipped';
    else if (order.status === 'Shipped') order.status = 'Delivered';
  }

  getNextStatusLabel(status: string) {
    switch (status) {
      case 'Pending': return 'Mark as Packed';
      case 'Packed': return 'Mark as Shipped';
      case 'Shipped': return 'Mark as Delivered';
      default: return '';
    }
  }
}
