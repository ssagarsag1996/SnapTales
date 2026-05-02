import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey:            'AIzaSyAWQCJvSAiBir_kQfEe4llV70m616Q7tqk',
  authDomain:        'snaptales-d85f3.firebaseapp.com',
  projectId:         'snaptales-d85f3',
  storageBucket:     'snaptales-d85f3.firebasestorage.app',
  messagingSenderId: '558471624651',
  appId:             '1:558471624651:web:e68fd7984f9622a690284e',
  measurementId:     'G-B7ENYSFREZ',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth        = getAuth(firebaseApp)
export const analytics   = getAnalytics(firebaseApp)
