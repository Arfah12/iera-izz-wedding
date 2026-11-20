
import { db } from "./firebase";

import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const wishesCollection = collection(db, "wishes");
const weddingId = "aina-hakim-2027";

// ADD WISH
export async function addWish(data) {
  return addDoc(wishesCollection, {
    weddingId,
    name: data.name.trim(),
    message: data.message.trim(),
    createdAt: serverTimestamp(),
  });
}

// LISTEN TO PUBLIC WISHES
export function listenToWishes(callback) {
  const wishesQuery = query(
    wishesCollection,
    where("weddingId", "==", weddingId),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  return onSnapshot(
    wishesQuery,
    (snapshot) => {
      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      callback(data);
    },
    (error) => {
      console.error("Wishes loading error:", error);
    }
  );
}

// GET ALL WISHES FOR ADMIN
export async function getAllWishes() {
  const q = query(
    wishesCollection,
    where("weddingId", "==", weddingId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

// DELETE WISH
export async function deleteWish(id) {
  return deleteDoc(doc(db, "wishes", id));
}
