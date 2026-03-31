import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, collection, onSnapshot, query, orderBy, auth } from '../firebase';
import { Shield, Users, MessageSquare, Clock, Mail, User as UserIcon, ArrowLeft } from 'lucide-react';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  lastLogin: any;
  role: string;
}

interface MessageData {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
}

export function Admin() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'messages'>('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersQuery = query(collection(db, 'users'), orderBy('lastLogin', 'desc'));
    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const usersList = snapshot.docs.map(doc => doc.data() as UserData);
      setUsers(usersList);
      setLoading(false);
    });

    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MessageData));
      setMessages(messagesList);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeMessages();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-apple-blue mb-2">
              <Shield size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Admin Dashboard</span>
            </div>
            <h1 className="text-4xl font-display font-bold">Control Center</h1>
            <p className="text-sm opacity-50 mt-2 max-w-lg">
              Manage your users and messages. For security reasons, passwords are encrypted and managed by Firebase Authentication and are not visible here.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${
                activeTab === 'users' 
                  ? 'bg-white dark:bg-white/10 shadow-sm' 
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <Users size={18} />
              <span className="font-medium">Users</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${
                activeTab === 'messages' 
                  ? 'bg-white dark:bg-white/10 shadow-sm' 
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <MessageSquare size={18} />
              <span className="font-medium">Messages</span>
            </button>
          </div>
        </div>

        {activeTab === 'users' ? (
          <div className="grid gap-6">
            <div className="glass overflow-hidden rounded-3xl border border-black/5 dark:border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider opacity-50">User</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider opacity-50">UID</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider opacity-50">Role</th>
                      <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider opacity-50">Last Login</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {users.map((user) => (
                      <tr key={user.uid} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue">
                                <UserIcon size={20} />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{user.displayName || 'Anonymous'}</p>
                              <p className="text-xs opacity-50">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono opacity-50">
                          {user.uid}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            user.role === 'admin' 
                              ? 'bg-apple-blue/10 text-apple-blue' 
                              : 'bg-black/5 dark:bg-white/10 opacity-70'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm opacity-70">
                          <div className="flex items-center gap-2">
                            <Clock size={14} />
                            {user.lastLogin?.toDate().toLocaleString() || 'Never'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.length === 0 ? (
              <div className="text-center py-20 glass rounded-3xl opacity-50">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                <p>No messages received yet.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass p-8 rounded-3xl border border-black/5 dark:border-white/5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-apple-blue/10 flex items-center justify-center text-apple-blue">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{msg.name}</h3>
                        <p className="text-sm opacity-50">{msg.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-xl text-sm opacity-70">
                      <Clock size={16} />
                      {msg.createdAt?.toDate().toLocaleString() || 'Unknown date'}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-30 block mb-1">Subject</span>
                      <p className="font-medium text-lg">{msg.subject}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-30 block mb-1">Message</span>
                      <p className="opacity-70 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={16} />
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
