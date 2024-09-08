import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface HeaderProps {}

export function HeaderComponent({}: HeaderProps) {
  return (
    <>
      <header className="bg-primary text-primary-foreground py-4 px-6 w-full">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <Link href="/" className="text-xl font-bold" prefetch={false}>
            ChilizProof
          </Link>
          <ConnectButton />
        </div>
      </header>
    </>
  );
}
