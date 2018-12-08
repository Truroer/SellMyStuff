// import { MaterializeModule } from "angular2-materialize";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { Ng2CloudinaryModule } from "ng2-cloudinary";
import { AppComponent } from "./app.component";
import { ConfigService } from "./config.service";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { CreateAdComponent } from "./create-ad/create-ad.component";
import { DetailViewComponent } from "./detail-view/detail-view.component";
import { AdsListComponent } from "./ads-list/ads-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FileSelectDirective } from "ng2-file-upload";
import { FileUploadModule } from "ng2-file-upload/ng2-file-upload";

const appRoutes: Routes = [
  { path: "", component: AdsListComponent },
  { path: "newad", component: CreateAdComponent },
  { path: "details/:date", component: DetailViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateAdComponent,
    DetailViewComponent,
    AdsListComponent
    // FileSelectDirective
  ],
  imports: [
    // MaterializeModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    Ng2CloudinaryModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true }
    ),
    ReactiveFormsModule
    // HttpHeaders
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {}
