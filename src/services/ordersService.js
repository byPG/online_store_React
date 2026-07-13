import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function createOrder(orderData) {
  const ordersCollection = collection(db, "orders");

  const orderToSave = {
    ...orderData,
    createdAt: serverTimestamp(),
  };

  const orderRef = await addDoc(ordersCollection, orderToSave);

  return orderRef.id;
}

export async function getOrdersByUserId(userId) {
  const ordersCollection = collection(db, "orders");

  const userOrdersQuery = query(
    ordersCollection,
    where("userId", "==", userId),
  );

  const ordersSnapshot = await getDocs(userOrdersQuery);

  const orders = ordersSnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  return orders.sort((a, b) => {
    const dateA = a.createdAt?.seconds || 0;
    const dateB = b.createdAt?.seconds || 0;

    return dateB - dateA;
  });
}