import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListModule } from './order-list/order-list.module';

import { OrderFormComponent } from './order-list/order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list/order-list.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './tool-bar/sidebar/sidebar.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { TryComponentComponent } from './try-component/try-component.component';
import { AuthGuard } from './auth.guard';
import { SalesListingComponent } from './sales-listing/sales-listing.component';
import { ManufacturingListingComponent } from './manufacturing-listing/manufacturing-listing.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'order-list', pathMatch: 'full' },
  { path: 'order-form', component: OrderFormComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'Forbidden', component: ForbiddenComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'user-form', component: UserManagementComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'try', component: TryComponentComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Manufacturing', 'User'] } },
  { path: 'salesListing', component: SalesListingComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Sales'] } },
  { path: 'manufacturingListing', component: ManufacturingListingComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Manufacturing'] } },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }