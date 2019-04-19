import {Subject} from 'rxjs/Subject';

export class AppareilService {

  appareilsSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Frigo',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];

  getAppareils = () => this.appareils;

  addAppareil(name: string, status: string) {
    const apparailObject = {
      id : 0,
      name : '',
      status : ''
    };

    apparailObject.name = name;
    apparailObject.status = status;
    apparailObject.id = this.appareils[this.appareils.length - 1].id + 1;
    this.appareils.push(apparailObject);
    this.emitAppareilSubject();

  }

  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  switchOnAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number) {
    return this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
  }

}
