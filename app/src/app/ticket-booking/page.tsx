"use client";

import { FooterComponent } from "@/components/footer-component";
import { HeaderComponent } from "@/components/header-component";
import { TicketBookingComponent } from "@/components/ticket-booking-component";

export default function TicketBooking() {
  return (
    <>
      <HeaderComponent />
      <TicketBookingComponent />
      <FooterComponent />
    </>
  );
}
