import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UserModule } from './User/user/user.module';
import { BatchModule } from '../app/Batch/batch/batch.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error-handling/error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { OverallComponent } from './Audit/Components/overall/overall.component';
import { ToolbarComponent  } from './Audit/Components/toolbar/toolbar.component';
import { AssociateComponent } from './Audit/Components/associate/associate.component';
import { AuditComponent } from './Audit/Components/audit/audit.component';
import { AuditService } from './Audit/Services/audit.service';
import { OverallService } from './Audit/Services/overall.service';
import {HttpModule} from '@angular/http';
=======

>>>>>>> overall

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,


  ],
  imports: [
    BrowserModule,
    UserModule,
    FormsModule,
    HttpClientModule,
<<<<<<< HEAD
    AppRoutingModule,
    HttpModule,
  ],
  providers: [AuditService, OverallService],
  bootstrap: [AppComponent]
=======
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
>>>>>>> overall
})
export class AppModule { }
