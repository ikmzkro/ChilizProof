import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import useTicketMetadata from "@/hooks/useTicketMetadata";

export function MyNftComponent() {
  const res: any = useTicketMetadata();

  if (!res.metadata) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const tokenId = res?.nftdata[0].toString();
  const seatNumber = res?.nftdata[2];
  const role = res?.nftdata[3];

  return (
    <Card
      key={tokenId}
      className="rounded-lg overflow-hidden shadow-lg my-24 max-w-sm mx-auto hover:shadow-xl transition-all duration-200"
    >
      <Image
        src={res.metadata?.image || "/placeholder.svg"}
        alt="NFT artwork"
        width={320}
        height={320}
        className="object-cover w-full"
        style={{ aspectRatio: "1/1" }}
      />
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold hover:text-gray-700 transition-all duration-200">
          Seat Number: {seatNumber}
        </h2>
        <h3 className="text-gray-500 hover:text-gray-600 transition-all duration-200">
          Role: {role}
        </h3>
        <p className="mt-2 text-gray-600 hover:text-gray-700 transition-all duration-200">
          NFT Token ID: {tokenId}
        </p>
        <div className="flex mt-4 justify-center">
          {tokenId === "0" ? (
            <div className="text-left">
              <p className="text-lg">QR Code is not available.</p>
              <p className="text-lg mb-4">
                Please make a purchase and check again.
              </p>
              <Link href="/" passHref>
                <Button className="hover:bg-blue-700 hover:text-white transition-all duration-200 px-32">
                  Go to Top Page
                </Button>
              </Link>
            </div>
          ) : (
            <Link
              href={{
                pathname: "/qr-code",
              }}
              passHref
            >
              <Button
                className="hover:bg-gray-700 hover:text-white transition-all duration-200 px-32"
                disabled={tokenId === "0"}
              >
                QRCode
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
