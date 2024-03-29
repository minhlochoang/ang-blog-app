import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  loadFeatured() {
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )
  }

  loadLatest() {
    return this.afs.collection('posts', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )
  }

  loadCategoryPosts(categoryId: string) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )
  }

  loadPostById (postId: string) {
    return this.afs.doc(`posts/${postId}`).valueChanges()
  }

  loadSimilar(categoryId: string) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )
  }

  countViews(postId: string) {
    const viewCount = {
      views: firebase.default.firestore.FieldValue.increment(1)
    }
    this.afs.doc(`posts/${postId}`).update(viewCount).then(() => {
    })
  }

  search(query: string): Observable<any[]> {
    return this.afs.collection('posts', ref => ref.where('title', '>=', query).where('title', '<=', query + '\uf8ff')).valueChanges();
  }
}
