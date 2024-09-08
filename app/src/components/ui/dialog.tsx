// components/ui/dialog.tsx

import React, { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: () => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-gray">
      <div className="bg-gray rounded-lg shadow-lg w-360 h-360 mx-4 p-4 flex flex-col items-center justify-center">
        <input
          type="number"
          placeholder="Enter amount"
          className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        />
        {children}
      </div>
    </div>
  );
}

interface DialogContentProps {
  children: ReactNode;
}

export function DialogContent({ children }: DialogContentProps) {
  return <div className="p-4">{children}</div>;
}

interface DialogHeaderProps {
  children: ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div className="border-b p-4">{children}</div>;
}

interface DialogTitleProps {
  children: ReactNode;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <h3 className="text-xl font-semibold">{children}</h3>;
}

interface DialogCloseProps {
  onClick: () => void;
}

export function DialogClose({ onClick }: DialogCloseProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
}
