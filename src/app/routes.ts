import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileExplorer } from './components/file-explorer/';

const appRoutes: Routes = [
  { path: '', component: FileExplorer }
];

export const appRoutingProviders: any[] = [

];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
