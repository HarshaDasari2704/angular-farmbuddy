import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer',
  imports: [FormsModule, CommonModule],
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css'],
})
export class BuyerComponent {
  username = 'Ravi'; // This can come from a service for the logged-in user
  cartCount = 0; // Initially zero items in the cart
  searchQuery = ''; // Search bar query
  selectedCategory = ''; // Selected product category filter
  profileName = 'Ravi';
  profileAddress = '123 Main Street';
  profileEmail = 'ravi@example.com';
  profileMobile = '9876543210';
  profileImageUrl: string | undefined;
  isProfilePanelOpen = false;
  cartItems: any[] = [];
  isCartPopupVisible = false;

  products = [
    { name: 'Tomato', price: 40, imageUrl: 'assets/images/tomato.png', category: 'vegetables' },
    { name: 'Apple', price: 120, imageUrl: 'assets/images/apple.jpg', category: 'fruits' },
    { name: 'Wheat', price: 60, imageUrl: 'assets/images/wheat.jfif', category: 'grains' },
    { name: 'Spinach', price: 30, imageUrl: 'assets/images/spinach.jpg', category: 'vegetables' },
  ];

  constructor(private router: Router) {}

  filteredProducts() {
    return this.products.filter(
      (product) =>
        (this.selectedCategory ? product.category === this.selectedCategory : true) &&
        (this.searchQuery ? product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true)
    );
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartCount = this.cartItems.length;
    this.isCartPopupVisible = true;
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.cartCount = this.cartItems.length;
    if (this.cartCount === 0) {
      this.isCartPopupVisible = false;
    }
  }

  checkout() {
    // Implement checkout logic here
    alert('Proceeding to checkout');
  }

  toggleCartPopup() {
    this.isCartPopupVisible = !this.isCartPopupVisible;
  }

  openProfilePanel() {
    this.isProfilePanelOpen = true;
  }

  closeProfilePanel() {
    this.isProfilePanelOpen = false;
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

  saveProfile() {
    // Save profile logic (could integrate with an API)
    alert('Profile saved successfully!');
    this.closeProfilePanel();
  }

  editProfile() {
    // Navigate to profile edit page (optional)
    this.router.navigate(['/edit-profile']);
  }

  logout() {
    // Handle logout logic
    alert('Logging out...');
  }
  get totalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
