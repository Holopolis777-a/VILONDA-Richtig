import React from 'react';
import { PasswordResetForm } from '../../components/auth/PasswordResetForm';

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <PasswordResetForm />
        </div>
      </div>
    </div>
  );
}