export interface LottoResultOrigin {
  drwNo: number;
  drwNoDate: string;
  winnerRank1: number;
  winPayRank1: number;
  winnerRank2: number;
  winPayRank2: number;
  winnerRank3: number;
  winPayRank3: number;
  winnerRank4: number;
  winPayRank4: number;
  winnerRank5: number;
  winPayRank5: number;
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}

export const parseLottoResultOrigin = (data: string[]): LottoResultOrigin => {
  return {
    drwNo: parseInt(data[0]),
    drwNoDate: data[1],
    winnerRank1: parseInt(data[2]),
    winPayRank1: parseInt(data[3]),
    winnerRank2: parseInt(data[4]),
    winPayRank2: parseInt(data[5]),
    winnerRank3: parseInt(data[6]),
    winPayRank3: parseInt(data[7]),
    winnerRank4: parseInt(data[8]),
    winPayRank4: parseInt(data[9]),
    winnerRank5: parseInt(data[10]),
    winPayRank5: parseInt(data[11]),
    drwtNo1: parseInt(data[12]),
    drwtNo2: parseInt(data[13]),
    drwtNo3: parseInt(data[14]),
    drwtNo4: parseInt(data[15]),
    drwtNo5: parseInt(data[16]),
    drwtNo6: parseInt(data[17]),
    bnusNo: parseInt(data[18]),
  };
};

export interface Result {
  rank: number;
  wins: number;
  amount: number;
  totalAmount: number;
}

export interface LottoResult {
  round: number;
  date: string;
  numbers: number[];
  bonus: number;
  results: Result[];
}

export const parseLottoResultToOrigin = (
  origin: LottoResultOrigin,
): LottoResult => {
  return {
    round: origin.drwNo,
    date: origin.drwNoDate,
    numbers: [
      origin.drwtNo1,
      origin.drwtNo2,
      origin.drwtNo3,
      origin.drwtNo4,
      origin.drwtNo5,
      origin.drwtNo6,
    ],
    bonus: origin.bnusNo,
    results: [
      {
        rank: 1,
        wins: origin.winnerRank1,
        amount: origin.winPayRank1,
        totalAmount: origin.winPayRank1 * origin.winnerRank1,
      },
      {
        rank: 2,
        wins: origin.winnerRank2,
        amount: origin.winPayRank2,
        totalAmount: origin.winPayRank2 * origin.winnerRank2,
      },
      {
        rank: 3,
        wins: origin.winnerRank3,
        amount: origin.winPayRank3,
        totalAmount: origin.winPayRank3 * origin.winnerRank3,
      },
      {
        rank: 4,
        wins: origin.winnerRank4,
        amount: origin.winPayRank4,
        totalAmount: origin.winPayRank4 * origin.winnerRank4,
      },
      {
        rank: 5,
        wins: origin.winnerRank5,
        amount: origin.winPayRank5,
        totalAmount: origin.winPayRank5 * origin.winnerRank5,
      },
    ],
  };
};
