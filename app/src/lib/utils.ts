import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

type SeatType = "leader" | "drum" | "flag" | "fan";

// Array of seats, roles, and rewards
// {
//   "seatNumber": 1,
//   "type": "leader",
//   "reward": 29601.3
// }

interface Seat {
  seatNumber: number;
  role: SeatType;
  reward: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: string | undefined): string {
  const numberValue = typeof amount === 'bigint' ? Number(amount) : amount;
  return new Intl.NumberFormat('en-US', {
  }).format(numberValue as any);
}


// TODO: Future Contribution Reward Plan
// - Contribution rewards for players
//   - Supporters who attend
//   - Staff managing the turf
// - Contribution rewards for supporters
//   - Gate staff
//   - Staff members
//   - Events like halftime activities

// `poolBalance`: The total amount (e.g., 1 poolBalance) is taken as an argument.
// The rewards are self-claimed as follows: 30% to the leader, 10% to the drum, 10% divided equally among the flag bearers, and 50% to the fans.
// For the fans, those seated closer to the leader's seat receive higher rewards, which are self-claimed based on the seat weighting.
const calculateSeatNumberRoleRewards = async (poolBalance: number): Promise<Seat[]> => {
  try {
    const leaderReward = poolBalance * 0.3;
    const drumReward = poolBalance * 0.1;
    const flagReward = (poolBalance * 0.1) / 8; // Equally divided among flag bearers
    const fanTotalReward = poolBalance * 0.5;
    const fansStart = 11;
    const seatsPerRow = 10;
    const fanSeats: Seat[] = [];
    const totalFanSeats = 90;
    let totalWeight = 0;

    // Calculate total weight for fans based on proximity to leader
    for (let i = 0; i < totalFanSeats; i++) {
      const weight = Math.ceil((totalFanSeats - i) / seatsPerRow);
      totalWeight += weight;
      fanSeats.push({ seatNumber: fansStart + i, role: "fan", reward: 0 });
    }

    // Assign rewards to fans based on calculated weight
    for (let i = 0; i < fanSeats.length; i++) {
      const weight = Math.ceil((totalFanSeats - i) / seatsPerRow);
      fanSeats[i].reward = (weight / totalWeight) * fanTotalReward;
    }

    // Set rewards for leader, drum, and flags
    // Seat number 1 is the cheer leader
    // Seat number 2 is the drummer
    // Seats 3 to 10 are flag wavers
    // Seats 11 to 100 are fans cheering (the reward amount decreases as the seats get farther from the leader's seat, i.e., as the seat number approaches 100)
    const allSeatInfo: Seat[] = [
      { seatNumber: 1, role: "leader" as SeatType, reward: leaderReward },
      { seatNumber: 2, role: "drum" as SeatType, reward: drumReward },
      ...Array.from({ length: 8 }, (_, i) => ({
        seatNumber: 3 + i,
        role: "flag" as SeatType,
        reward: flagReward,
      })),
      ...fanSeats,
    ];

    return allSeatInfo;
  } catch (error) {
    console.error("Error self-claiming rewards:", error);
    throw error;
  }
};

// Function to calculate the user's reward amount
export async function getSelfClaimAmount(
  seatNumbers: string[],
  walletAddresses: string[],
  poolBalance: number,
  claimer: string
) {
  try {

    // Calculate how the total amount of fan tokens deposited for the match ticket is distributed among each seat
    const allSeatInfo = await calculateSeatNumberRoleRewards(poolBalance);

    // Sort the above array to include only the seat numbers where ticket NFTs have already been purchased
    const addressAndRewardPairs = seatNumbers.map((seatNumber, index) => {
      const seat = allSeatInfo.find((s) => s.seatNumber === parseInt(seatNumber));
      const reward = seat ? seat.reward : 0;
      return [walletAddresses[index], reward];
    });

    // Sort the array to include only the seat number for the current self-claim
    // Retrieve only the reward amount from the filtered array
    // When withdrawing fan tokens as contribution rewards from the match contract, specify this reward amount
    const amount = addressAndRewardPairs.find(([address]) => address === claimer)?.[1];
    return amount;
  } catch (error) {
    console.error("Error generating reward pairs:", error);
    throw error;
  }
}


