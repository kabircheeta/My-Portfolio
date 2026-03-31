import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, User, Shield, AlertCircle } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser, db, doc, setDoc, serverTimestamp } from '../firebase';

const ADMIN_EMAIL = 'kabirsahab96@gmail.com';

export function AuthBar() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setShowAdminLink(currentUser.email === ADMIN_EMAIL);
        // Sync user to Firestore for Admin view
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            lastLogin: serverTimestamp(),
            role: currentUser.email === ADMIN_EMAIL ? 'admin' : 'user'
          }, { merge: true });
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      } else {
        setShowAdminLink(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full bg-black text-white py-2 px-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest z-[60] relative">
      <div className="flex items-center gap-4">
        <span className="opacity-50">Aura Authentication System</span>
        {showAdminLink && (
          <a 
            href="#admin" 
            className="text-apple-blue hover:underline flex items-center gap-1"
          >
            <Shield size={12} />
            Admin Dashboard
          </a>
        )}
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={10} />
                )}
              </div>
              <span className="hidden sm:inline">{user.displayName || user.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="hover:text-apple-blue transition-colors flex items-center gap-1"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="bg-apple-blue px-4 py-1 rounded-full hover:bg-apple-blue/80 transition-colors flex items-center gap-1"
          >
            <LogIn size={12} />
            Login to Access
          </button>
        )}
      </div>
    </div>
  );
}
