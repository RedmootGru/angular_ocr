import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false;

  lastUpdate = new Promise((resolve, reject) => {

    const date = new Date();

    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

  appareils: any[];
  appareilSubscription: Subscription;

  constructor(private appareilService: AppareilService, private authService: AuthService) {
    this.isAuth = this.authService.isAuth;
  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  OnAllumer() {
    this.appareilService.switchOnAll();
  }

  OnEteindre() {
    if (confirm('Êtes-vous sûr de vouloir éteindre tous les appareils ?')) {
      this.appareilService.switchOffAll();
    }
  }

  ngOnDestroy(): void {
    this.appareilSubscription.unsubscribe();
  }

}
