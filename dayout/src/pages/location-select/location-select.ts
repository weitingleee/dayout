import { NavController, Platform, ViewController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps/google-maps';
import {} from '@types/googlemaps';
import { TransportPage } from '../transport/transport';


declare var google: any;

@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html'
})
export class LocationSelectPage {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    latitude: number;
    longitude: number;
    autocompleteService: any;
    placesService: any;
    query: string = '';
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    startlocation: any; 
    endlocation: any;
    query_start: string = '';
    query_end: string = ''; 
    places_start: any = []; 
    places_end: any = []; 

    constructor(public navCtrl: NavController, public zone: NgZone, public maps: GoogleMaps, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
        this.searchDisabled = true;
        this.saveDisabled = true;
    }
 
    ionViewDidLoad(): void {
 
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
 
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;

            // Set initial restrict to the greater list of countries.
           //autocomplete.setComponentRestrictions({'country': ['sg', 'pr', 'vi', 'gu', 'mp']});
 
        });
 
    }
 
    selectStartPlace(place){

        this.places_start = [];
 
        let location = {
            lat: null,
            lng: null,
            name: place.name
        };
        
        this.placesService.getDetails({placeId: place.place_id}, (details) => {
 
            this.zone.run(() => {
 
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;
 
                this.maps.map.setCenter({lat: location.lat, lng: location.lng});
 
                this.startlocation = location;

                console.log(this.startlocation);            
            });
 
        });
 
    }

    selectEndPlace(place){
 
        this.places_end = [];
 
        let location = {
            lat: null,
            lng: null,
            name: place.name
        };
        
        this.placesService.getDetails({placeId: place.place_id}, (details) => {
 
            this.zone.run(() => {
 
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;
 
                this.maps.map.setCenter({lat: location.lat, lng: location.lng});
 
                this.endlocation = location;

                console.log(this.endlocation);   
            });
 
        });
 
    }
 
    searchStartPlace(){
 
        this.saveDisabled = true;
 
        if(this.query_start.length > 0 && !this.searchDisabled) {
 
            let config = {
                types: ['geocode'],
                input: this.query_start
            }
 
            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
 
                if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
 
                    this.places_start = [];
 
                    predictions.forEach((prediction) => {
                        this.places_start.push(prediction);
                    });
                }
 
            });
 
        } else {
            this.places_start = [];
        }
 
    }
 
     searchEndPlace(){
 
        this.saveDisabled = true;
 
        if(this.query_end.length > 0 && !this.searchDisabled) {
 
            let config = {
                types: ['geocode'],
                input: this.query_end
            }
 
            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
 
                if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
 
                    this.places_end = [];
 
                    predictions.forEach((prediction) => {
                        this.places_end.push(prediction);
                    });
                }
 
            });
 
        } else {
            this.places_end = [];
        }
 
    }

    save(){

        if(this.startlocation != undefined && this.endlocation != undefined){
            this.navCtrl.push(TransportPage, {
                start: this.startlocation.name,    
                end: this.endlocation.name,                 
            });
        }
        
        else if(this.startlocation != undefined){
            this.navCtrl.push(TransportPage, {
                start: this.startlocation.name,                 
            });
        }

        else if(this.endlocation != undefined){
            this.navCtrl.push(TransportPage, {
                end: this.endlocation.name,                 
            });
        }        

        if(this.startlocation != undefined){
            this.viewCtrl.dismiss(this.startlocation);
        }
        
        else if(this.endlocation != undefined && this.startlocation ==undefined){
            this.viewCtrl.dismiss(this.endlocation);
        }
    }
 
    close(){
        this.viewCtrl.dismiss();
    }  
 
}