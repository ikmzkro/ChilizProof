"use client";

import { FooterComponent } from "@/components/footer-component";
import { HeaderComponent } from "@/components/header-component";
import { QRCodeComponent } from "@/components/qrcode-component";

export default function MyNft() {
  return (
    <>
      <HeaderComponent />
      <QRCodeComponent />
      <FooterComponent />
    </>
  );
}
