'use client';

import { Navbar } from '@/components/navbar/Navbar';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <RegisterForm />
      </main>
    </div>
  );
}
