'use client';

import LocationModal from './modals/LocationModal';
import AuthModal from './modals/AuthModal';
import CartDrawer from './cart/CartDrawer';

export default function ClientModals() {
  return (
    <>
      <LocationModal />
      <AuthModal />
      <CartDrawer />
    </>
  );
}
