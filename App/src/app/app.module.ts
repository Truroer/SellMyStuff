import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { Ng2CloudinaryModule } from "ng2-cloudinary";
import { AppComponent } from "./app.component";
import { ConfigService } from "./config.service";
import { RouterModule, Routes } from "@angular/router";
import { CreateAdComponent } from "./create-ad/create-ad.component";
import { DetailViewComponent } from "./detail-view/detail-view.component";
import { AdsListComponent } from "./ads-list/ads-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from "ng2-file-upload/ng2-file-upload";

const appRoutes: Routes = [
  { path: "", component: AdsListComponent },
  { path: "newad", component: CreateAdComponent },
  { path: "details/:date", component: DetailViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateAdComponent,
    DetailViewComponent,
    AdsListComponent
  ],
  imports: [
    FileUploadModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    Ng2CloudinaryModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {}
