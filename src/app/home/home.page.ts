import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import { Geolocation } from '@capacitor/geolocation';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }
  
  private latitude: number | any;
  private longitude: number | any;

  public async ngOnInit() {
    try {
      // Mendapatkan posisi saat ini
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      // Membuat peta dan tampilan peta
      const map = new Map({
        basemap: "topo-vector"
      });
      
      const view = new MapView({
        container: "container",  // Pastikan elemen dengan id 'container' ada di HTML
        map: map,
        zoom: 13,
        center: [this.longitude, this.latitude]  // Set pusat peta ke lokasi saat ini
      });

      // Membuat titik lokasi saat ini
      const point = new Point({
        longitude: this.longitude,
        latitude: this.latitude
      });

      // Membuat simbol marker
      const markerSymbol = new PictureMarkerSymbol({
        url: "location.png",  // Pastikan gambar ada di folder 'assets'
        width: "30px",
        height: "30px"
      });

      // Membuat grafik dengan titik dan simbol marker
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      // Menambahkan grafik ke tampilan peta
      view.graphics.add(pointGraphic);

    } catch (error) {
      console.error("Error getting location or initializing map:", error);
    }
  }
}
