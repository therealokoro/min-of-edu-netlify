import { initializeApp } from "firebase/app"
import {
  ref as storageRef,
  getDownloadURL,
  getStorage,
  uploadBytes,
  deleteObject
} from "firebase/storage"

const config = useRuntimeConfig()

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseStorage = getStorage()

export const uploadFileToStorage = async (path: string, file: File) => {
  const fileRef = storageRef(firebaseStorage, path)
  await uploadBytes(fileRef, file)
  const url = await getDownloadURL(fileRef)
  return url
}

export const deleteFileFromStorage = async (path: string) => {
  const fileRef = storageRef(firebaseStorage, path)
  return await deleteObject(fileRef)
}
