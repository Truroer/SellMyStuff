import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../config.service";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-ads-list",
  templateUrl: "./ads-list.component.html",
  styleUrls: ["./ads-list.component.css"]
})
export class AdsListComponent implements OnInit {
  public adsData = null;

  search = new FormControl("SEARCH ADS");

  refresh() {
    this._dataService.getAds().subscribe(adsData => {
      this.adsData = adsData;
    });
    this.search.setValue("");
  }

  clear() {
    this.search.setValue("");
  }

  onSubmit() {
    if (this.search.value) {
      this._dataService.getAds().subscribe(adsData => {});
      this._dataService.searchAds(this.search.value).subscribe(results => {
        this.adsData = results;
      });
    } else {
      this._dataService.getAds().subscribe(adsData => {
        this.adsData = adsData;
      });
    }

    this.search.setValue("");
  }

  constructor(private _dataService: ConfigService, private router: Router) {}

  ngOnInit() {
    this._dataService.getAds().subscribe(adsData => {
      this.adsData = adsData;
    });
  }
}
