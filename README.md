# korean-lotto-utils
Get multiple or single lotto results from dhlotto site.

# Installation
```
npm install @sunmin0406/korean-lotto-utils
```

### Usage
```typescript
import {
  getCurrentDrawRound,
  getLottoResult,
} from '@sunmin0406/korean-lotto-utils';
```


## getLottoResult
### Parameter
```typescript
// Get result current lotto 
const param = 'CURRENT';

// Get results all lotto
const param = 'ALL';

// Get result to round number
const param = roundNumer;

// Get results from round to round
const param = { from: fromNumber, to: toNumber };

// result
const result = await getLottoResult({ round: param });
```

### Lotto Result
```typescript
[
  {
    round: 1119,
    date: '2024.05.11',
    numbers: [1, 9, 12, 13, 20, 45],
    bonus: 3,
    results: [
      { rank: 1, wins: 19, amount: 1396028764, totalAmount: 26524546516 },
      { rank: 2, wins: 97, amount: 45574823, totalAmount: 4420757831 },
      { rank: 3, wins: 3108, amount: 1422381, totalAmount: 4420760148 },
      { rank: 4, wins: 155000, amount: 50000, totalAmount: 7750000000 },
      { rank: 5, wins: 2560859, amount: 5000, totalAmount: 12804295000 },
    ],
  },
]
```


