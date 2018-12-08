import { Component, OnInit, OnDestroy } from "@angular/core";
import { ConfigService } from "../config.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-detail-view",
  templateUrl: "./detail-view.component.html",
  styleUrls: ["./detail-view.component.css"]
})
export class DetailViewComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  private selectedAd;
  private buyerLocation;
  public quoteData;

  profileForm = new FormGroup({
    address: new FormGroup({
      house_number: new FormControl(""),
      road: new FormControl(""),
      city: new FormControl(""),
      postcode: new FormControl(""),
      country: new FormControl("")
    })
  });

  deleteAd() {
    this._dataService.deleteAd(this.selectedAd.date).subscribe(res => {
      if (res.command === "DELETE") {
        this.router.navigate(["/"]);
      }
    });
  }

  onSubmit() {
    console.warn(this.profileForm.value);

    this.buyerLocation = this.profileForm.value.address;

    this._dataService
      .getCountryCode(this.selectedAd.country)
      .subscribe(countryCode => {
        this._dataService
          .getShipments(
            {
              length: this.selectedAd.length,
              width: this.selectedAd.width,
              height: this.selectedAd.height,
              weight: this.selectedAd.weight,
              country: countryCode,
              city: this.selectedAd.city,
              postcode: this.selectedAd.postcode,
              road: this.selectedAd.road,
              house_number: this.selectedAd.house_number
            },
            {
              country: this.profileForm.value.address.country,
              city: this.profileForm.value.address.city,
              postcode: this.profileForm.value.address.postcode,
              road: this.profileForm.value.address.road,
              house_number: this.profileForm.value.address.house_number
            }
          )
          .subscribe(quoteData => {
            this.quoteData = quoteData;
          });
      });
  }

  constructor(
    private route: ActivatedRoute,
    private _dataService: ConfigService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["date"];
    });
    this._dataService.getAds().subscribe(selectedAd => {
      this.selectedAd = selectedAd.find(x => x.date == this.id);

      this._dataService.getAddress().subscribe(addressData => {
        this.buyerLocation = addressData.address;
        this.profileForm.patchValue({
          address: {
            road: addressData.address.road,
            city: addressData.address.city,
            postcode: addressData.address.postcode,
            country: addressData.address.country,
            house_number: addressData.address.house_number
          }
        });
        this._dataService
          .getShipments(this.selectedAd, addressData.address)
          .subscribe(quoteData => {
            this.quoteData = quoteData;
          });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
