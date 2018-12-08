import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ConfigService } from "../config.service";
import { CloudinaryOptions, CloudinaryUploader } from "ng2-cloudinary";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-ad",
  templateUrl: "./create-ad.component.html",
  styleUrls: ["./create-ad.component.css"]
})
export class CreateAdComponent implements OnInit {
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: "truroer", uploadPreset: "ynqkvkei" })
  );

  public addressData = null;
  public statusPostAd;
  public file;
  public date;
  loading: any;

  profileForm = new FormGroup({
    username: new FormControl(""),
    itemDetails: new FormGroup({
      title: new FormControl(""),
      description: new FormControl(""),
      price: new FormControl(""),
      pictureName: new FormControl("")
    }),
    package: new FormGroup({
      length: new FormControl(""),
      width: new FormControl(""),
      height: new FormControl(""),
      weight: new FormControl("")
    }),
    address: new FormGroup({
      road: new FormControl(""),
      house_number: new FormControl(""),
      city: new FormControl(""),
      postcode: new FormControl(""),
      country: new FormControl("")
    })
  });

  upload() {
    this.loading = true;
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (
      item: any,
      response: string,
      status: number,
      headers: any
    ): any => {
      let res: any = JSON.parse(response);
      console.log(res);
      this.profileForm.patchValue({
        itemDetails: {
          pictureName: res.secure_url
        }
      });
    };
    this.uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info("onErrorItem", fileItem, response, status, headers);
    };
  }

  onSubmit() {
    console.warn(this.profileForm.value);

    this._dataService
      .postAds(
        this.profileForm.value.itemDetails.price,
        this.profileForm.value.itemDetails.title,
        this.date,
        this.profileForm.value.username,
        this.profileForm.value.itemDetails.description,
        this.profileForm.value.itemDetails.pictureName,
        this.addressData.lat,
        this.addressData.lon,
        this.profileForm.value.address.country,
        this.profileForm.value.address.city,
        this.profileForm.value.address.postcode,
        this.profileForm.value.address.road,
        this.profileForm.value.address.house_number,
        this.profileForm.value.package.length,
        this.profileForm.value.package.width,
        this.profileForm.value.package.height,
        this.profileForm.value.package.weight
      )
      .subscribe(statusPostAd => {
        this.statusPostAd = statusPostAd;
        if (this.statusPostAd.command === "INSERT") {
          this.router.navigate(["/details", this.date]);
        }
      });
  }

  constructor(private _dataService: ConfigService, private router: Router) {}

  ngOnInit() {
    let date = Date.now();
    this.date = date;

    this._dataService.getAddress().subscribe(addressData => {
      this.addressData = addressData;
      this.profileForm.patchValue({
        address: {
          road: addressData.address.road,
          house_number: addressData.address.house_number,
          city: addressData.address.city,
          postcode: addressData.address.postcode,
          country: addressData.address.country
        }
      });
    });
  }
}
