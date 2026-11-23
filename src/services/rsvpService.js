
import { db } from "./firebase";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const weddingId = "iera-izz-2027";

const rsvpCollection = collection(db, "rsvps");

// SUBMIT RSVP
export async function submitRSVP(data) {
  const cleanName = data.name.trim();

  if (!cleanName || cleanName.length > 60) {
    throw new Error("Nama tidak sah.");
  }

  // VALIDATE SIDE
  if (!["Pihak Lelaki", "Pihak Perempuan"].includes(data.side)) {
    throw new Error("Pilihan pihak tidak sah.");
  }

  // VALIDATE ATTENDANCE
  if (!["Hadir", "Tidak Hadir"].includes(data.attendance)) {
    throw new Error("Pilihan kehadiran tidak sah.");
  }

  // VALIDATE GUESTS
  const guests = Number(data.guests);

  if (
    !Number.isInteger(guests) ||
    (data.attendance === "Hadir" && (guests < 1 || guests > 5)) ||
    (data.attendance === "Tidak Hadir" && guests !== 0)
  ) {
    throw new Error("Jumlah tetamu tidak sah.");
  }

  return addDoc(rsvpCollection, {
    weddingId,
    name: cleanName,
    side: data.side,
    attendance: data.attendance,
    guests,
    createdAt: serverTimestamp(),
  });
}

// GET RSVP FOR ADMIN
export async function getRSVPs() {
  const q = query(
    rsvpCollection,
    where("weddingId", "==", weddingId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

// DELETE RSVP
export async function deleteRSVP(id) {
  return deleteDoc(doc(db, "rsvps", id));
}
