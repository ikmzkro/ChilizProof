import { DistributionResult, Vote } from './interfaces';

export const makeWhiteList = async (voteInfo: Vote[]): Promise<DistributionResult[]> => {
  const totalAmount = 1000;

  // https://www.jpnsport.go.jp/kokuritu/seat/tabid/58/Default.aspx
  // +60%: E-119, 120
  // +30%: E-117, 118, 121, 122
  // +10%: E-116, 123

  // Token distribution rates increase the closer you are to the cheering leader seats.
  const seatDistributionRates: Record<string, number> = {
    "E-119": 0.60,
    "E-120": 0.60,
    "E-117": 0.30,
    "E-118": 0.30,
    "E-121": 0.30,
    "E-122": 0.30,
    "E-116": 0.10,
    "E-123": 0.10
  };

  function calculateDistributionRate(voteInfo: Vote): number {
    const baseRate = 1.0;
    const seatRate = seatDistributionRates[voteInfo.selectedSeat] || 0;

    // TODO: In the case where a player becomes the MOM, 
    // it is necessary to obtain this information in real-time immediately after the match ends.
    // This time, MOM is fixed to number 10 for calculation purposes.
    const momPlayer = '10'

    let supporterBonus = 1;
    if (voteInfo.selectedPlayer === momPlayer) {
      supporterBonus = 2.00; // Set supporter bonus to 2.00 for MOM (player number 10)
    }

    const increasedRate = baseRate + seatRate;

    return increasedRate * supporterBonus;
  }

  function distributeFanTokens(voteInfo: Vote[], totalAmount: number): { address: string, amount: number }[] {
    const distributionRates = voteInfo.map(res => calculateDistributionRate(res));

    return voteInfo.map((res, index) => {
      const userRate = distributionRates[index];
      const userAmount = Math.floor(userRate * totalAmount);
      return { address: res.address, amount: userAmount };
    });
  }

  const distribution = distributeFanTokens(voteInfo, totalAmount);

  return distribution;
}
