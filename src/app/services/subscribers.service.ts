import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(
    private afs: AngularFirestore
  ) { }

  addSub(subData: any) {
    this.afs.collection('subscribers').add(subData).then(() => {

    })
  }

  checkSubs(subEmail: string) {
    return this.afs.collection('subscribers', ref => ref.where('email', '==', subEmail)).get()
  }
}
