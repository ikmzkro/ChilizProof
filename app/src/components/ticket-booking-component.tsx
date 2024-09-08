import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useMintTicketNft from "@/hooks/useMintTicketNft";
import useSeatNumbers from "@/hooks/useSeatNumbers";

interface TicketBookingComponentProps {}

export function TicketBookingComponent({}: TicketBookingComponentProps) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const purchasedSeats = useSeatNumbers();
  const resMint = useMintTicketNft(selectedSeat, selectedRole);

  const handleSeatClick = (seatNumber: number) => {
    const seatNum = Number(seatNumber);
    setSelectedSeat(`Seat ${seatNum}`);
    // Role is set automatically
    if ([3, 4, 5, 6, 7, 8, 9, 10].includes(seatNum)) {
      setSelectedRole("flag");
    } else if (seatNum === 1) {
      setSelectedRole("leader");
    } else if (seatNum === 2) {
      setSelectedRole("drum");
    } else if (seatNum >= 11 && seatNum <= 100) {
      setSelectedRole("fan");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Ticket Booking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Stadium Seating</h2>
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-10 gap-2">
                {Array.from({ length: 100 }, (_, i) => {
                  const seatNumber: string = (i + 1).toString();
                  const isPurchased = purchasedSeats?.includes(
                    seatNumber as any
                  );

                  return (
                    <button
                      key={i}
                      className={`w-8 h-8 rounded-md transition-colors ${
                        isPurchased
                          ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      }`}
                      onClick={() => handleSeatClick(seatNumber as any)} // Set the selected seat on click
                      disabled={isPurchased} // This ensures purchased seats are not selectable
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            {/* TODO: 恥ずべきスパゲティコード🍝 */}
            <h2 className="text-2xl font-bold mb-4">Selected Seats</h2>
            <Card>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="team">Teams</Label>
                    <div> {"Vissel Kobe vs Tottenham Hotspur FC"}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stadium-name">Stadium Name</Label>
                    <div>{"Japan National Stadium"}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stadium-name">Entry Gate</Label>
                    <div>{"A GATE"}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Match Date</Label>
                    <div>{"2025-08-01"}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="opening-time">Opening Time</Label>
                    <div>{"17:00"}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="kickoff-time">Kickoff Time</Label>
                    <div>{"19:00"}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="seat">Seat Number</Label>
                    <div>{selectedSeat || "No seat selected"}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <div>{selectedRole || "No seat selected"}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => {
                      setIsProcessing(true);
                      try {
                        const fetch = async () => {
                          await resMint.writeAsync();
                        };
                        fetch();
                      } catch (error) {
                        alert(error);
                      }
                    }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Mint Nft"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
