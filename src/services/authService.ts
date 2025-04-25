// src/services/authService.ts
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { db, auth } from "@/lib/FireBaseConfig";
  import { useAuthStore } from "@/stores/authStore";
  import { doc, setDoc, getDoc } from "firebase/firestore";
  
  export const loginWithEmail = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", res.user.uid));
  
    if (!userDoc.exists()) {
      throw new Error("No se encontró información del usuario en la base de datos");
    }
  
    const userData = userDoc.data();
  
    const login = useAuthStore.getState().login;
    login({
      uid: res.user.uid,
      email: res.user.email,
      name: res.user.displayName ?? userData.name,
      role: userData.role ?? "customer", // fallback si no existe
    });
  };
  
  export const registerWithEmail = async (
    email: string,
    password: string,
    name?: string
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
  
    if (auth.currentUser && name) {
      await updateProfile(auth.currentUser, { displayName: name });
    }
  
    // Guardar en Firestore
    await setDoc(doc(db, "users", res.user.uid), {
      name: name ?? "",
      email: res.user.email,
      role: "customer",
    });
  
    // ✅ Login en Zustand
    const login = useAuthStore.getState().login;
    login({
      uid: res.user.uid,
      email: res.user.email,
      name,
      role: "customer",
    });
  
    return true; // ⬅️ permite usarlo en el componente para redireccionar
  };
  
  export const logoutFirebase = async () => {
    const logout = useAuthStore.getState().logout;
    await signOut(auth);
    logout();
    localStorage.removeItem("auth-storage");
  };
  