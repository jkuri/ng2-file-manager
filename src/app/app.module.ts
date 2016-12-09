import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApiProvider } from './services/api.service';
import { NotificationProvider } from './services/notification.service';
import { SizePipe } from './pipes/size.pipe';
import { AppComponent } from './app.component';
import { AppHeader } from './components/app-header/';
import { FileExplorer } from './components/file-explorer/';
import { DevIconComponent } from './components/dev-icon/';
import { InfoModalComponent } from './components/info-modal/';
import { DeleteModalComponent } from './components/delete-modal/';
import { EditModalComponent } from './components/edit-modal/';
import { appRoutingProviders, RoutingModule } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    FileExplorer,
    DevIconComponent,
    InfoModalComponent,
    DeleteModalComponent,
    EditModalComponent,
    SizePipe
  ],
  providers: [
    appRoutingProviders,
    ApiProvider,
    NotificationProvider
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
