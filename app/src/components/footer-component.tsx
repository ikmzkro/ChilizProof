import Link from "next/link";

export function FooterComponent() {
  return (
    <>
      <footer className="bg-muted text-muted-foreground py-4 px-6 w-full">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <p>&copy; 2024 ChilizProof. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="https://github.com/ikmzkro/ETHOnline-2024" className="hover:text-accent" prefetch={false}>
              GitHub Link
            </Link>
            <Link href="https://x.com/ikmzkro" className="hover:text-accent" prefetch={false}>
              X Account
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
