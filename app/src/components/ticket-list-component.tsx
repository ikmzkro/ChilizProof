"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import useTicketMetadata from "@/hooks/useTicketMetadata";
import usePoolBalance from "@/hooks/usePoolBalance";

interface TicketListProps {}

export function TicketListComponent() {
  const poolBalance = usePoolBalance();
  console.log('poolBalance', poolBalance);
  const res = useTicketMetadata();

  // TODO: 恥ずべきスパゲティコード🍝
  const hasPurchased =
    res.metadata === "null" ||
    res.metadata?.description === "J.League World Challenge 2025";

  return (
    <div className="grid grid-cols-1 gap-12 my-8">
      <Card key={"jwc-2025-1"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="https://lime-giant-dove-621.mypinata.cloud/ipfs/QmTQxbnL6gumkKFUN18Z4SXnpVWuZ32YeEkeZBbiWyiTjp"
                alt="Vissel Kobe"
                width={40}
                height={40}
                className="rounded-full"
                style={{ objectFit: "cover" }}
              />
              {/* TODO: 恥ずべきスパゲティコード🍝 */}
              <div>
                <h3 className="text-lg font-semibold">
                  {"Vissel Kobe vs Tottenham Hotspur FC"}
                </h3>
                <p className="text-muted-foreground text-sm">{"2025-08-01"}</p>
              </div>
              <Image
                src="https://lime-giant-dove-621.mypinata.cloud/ipfs/QmQyw2cykPKZti61URRaUE9m7AUNWSn99yuCvV5qAZLqEs"
                alt="TOT"
                width={40}
                height={40}
                className="rounded-full"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Total ContributionPool</p>
                <p className="text-2xl font-bold">
                  {poolBalance !== null ? formatCurrency(poolBalance) : "0"}{" "}
                  <span className="text-sm">FanToken</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* TODO: 恥ずべきスパゲティコード🍝 */}
              <Link
                key={"jwc-2025-1"}
                href={{
                  pathname: hasPurchased ? "/my-nft" : "/ticket-booking",
                  query: {
                    id: "jwc-2025-1",
                    teams: "Vissel Kobe vs Tottenham Hotspur FC",
                    matchDate: "2025-08-01",
                    homeLogo:
                      "https://lime-giant-dove-621.mypinata.cloud/ipfs/QmTQxbnL6gumkKFUN18Z4SXnpVWuZ32YeEkeZBbiWyiTjp",
                    awayLogo:
                      "https://lime-giant-dove-621.mypinata.cloud/ipfs/QmQyw2cykPKZti61URRaUE9m7AUNWSn99yuCvV5qAZLqEs",
                    contributionPool: poolBalance,
                  },
                }}
                passHref
              >
                <Button size="sm">
                  {hasPurchased ? "My Nft" : "Buy Tickets"}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg
      {...props}
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
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
