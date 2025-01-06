import { LayoutDashboard, Car, FileText, MessageCircle, Mail, Bell, HelpCircle } from 'lucide-react';
import type { NavSection } from '../types';

export const memberNav: NavSection[] = [
  {
    title: 'Übersicht',
    items: [
      { path: '/member/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/member/vehicles', label: 'Fahrzeuge', icon: Car, exact: true },
      { path: '/member/requests', label: 'Meine Anfragen', icon: FileText },
    ],
  },
  {
    title: 'Kommunikation',
    items: [
      { path: '/member/tickets', label: 'Support-Tickets', icon: MessageCircle },
      { path: '/member/messages', label: 'Nachrichten', icon: Mail },
      { path: '/member/notifications', label: 'Benachrichtigungen', icon: Bell },
      { path: '/member/faq', label: 'FAQ', icon: HelpCircle },
    ],
  },
];
