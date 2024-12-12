import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle,
  };

  const Icon = icons[type];
  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`${bgColors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

class ToastManager {
  private container: HTMLDivElement;
  private root: any;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'fixed top-4 right-4 flex flex-col gap-2 z-50';
    document.body.appendChild(this.container);
    this.root = createRoot(this.container);
  }

  private show(message: string, type: 'success' | 'error' | 'info') {
    const toastId = Date.now();
    const handleClose = () => {
      this.root.render(null);
    };

    this.root.render(
      <Toast
        message={message}
        type={type}
        onClose={handleClose}
      />
    );
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }
}

export const toast = new ToastManager();