import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { FarmerComponent } from './farmer/farmer.component';
import { BuyerComponent } from './buyer/buyer.component';

export const routes: Routes = [
    {
        path:'',
        component:SigninComponent
    },
    {
        path:'farmer',
        component:FarmerComponent
    },
    {
        path:'buyer',
        component:BuyerComponent
    }
];
