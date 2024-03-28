import { decode } from 'iconv-lite';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  LottoResult,
  LottoResultOrigin,
  parseLottoResultOrigin,
  parseLottoResultToOrigin,
} from './lotto.interface';

const LOTTO_BASE_URL = 'https://dhlottery.co.kr/gameResult.do';

export const getCurrentDrawRound = async (): Promise<number> => {
  const baseUrl = LOTTO_BASE_URL;
  const params = {
    method: 'byWin',
  };

  const response = await axios.get(baseUrl, {
    params,
    url: 'gameResult.do',
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  });

  const htmlString = decode(Buffer.concat([response.data]), 'euc-kr');

  const html = cheerio.load(htmlString);
  const cssSelecter =
    '#article > div:nth-child(2) > div > div.win_result > h4 > strong' as const;
  const currentDrawRound = parseInt(html(cssSelecter).text());

  return currentDrawRound;
};

export type RoundRangeType = { start: number; end: number };
export type RoundType = number | RoundRangeType | 'ALL' | 'CURRENT';
export interface ResultOption {
  round?: RoundType;
}

const roundToDrawRoundByRoundType = async (
  round: RoundType,
): Promise<{ drwNoStart: number; drwNoEnd: number } | undefined> => {
  const roundType = typeof round;

  if (roundType === 'number') {
    return {
      drwNoStart: round as number,
      drwNoEnd: round as number,
    };
  }

  if (roundType === 'object') {
    const { start, end } = round as RoundRangeType;
    return {
      drwNoStart: start,
      drwNoEnd: end,
    };
  }

  if (roundType === 'string' && round === 'ALL') {
    return {
      drwNoStart: 1,
      drwNoEnd: await getCurrentDrawRound(),
    };
  }

  if (roundType === 'string' && round === 'CURRENT') {
    const currentDrawRound = await getCurrentDrawRound();
    return {
      drwNoStart: currentDrawRound,
      drwNoEnd: currentDrawRound,
    };
  }

  return undefined;
};

export const getLottoResult = async (
  option: ResultOption,
): Promise<LottoResult[]> => {
  const baseUrl = LOTTO_BASE_URL;
  const { round } = option;

  if (!round) {
    throw new Error('round is empty');
  }

  const roundRange = await roundToDrawRoundByRoundType(round);
  const params = {
    method: 'allWinExel',
    gubun: 'byWin',
    ...roundRange,
  };

  const response = await axios.get(baseUrl, {
    params,
    url: 'gameResult.do',
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  });

  const htmlString = decode(Buffer.concat([response.data]), 'euc-kr');
  const html = cheerio.load(htmlString);

  const lottoResultsOrigin: LottoResultOrigin[] = [];
  const tr = html('tr');
  tr.each((i, el) => {
    if (i <= 2) {
      return;
    }

    const firstChildren = html(el).children('td').first().attr();
    if (firstChildren?.rowspan) {
      html(el).children('td').first().remove();
    }

    const drawResult: string[] = [];
    html(el)
      .children('td')
      .each((i, el) => {
        const value = html(el)
          .text()
          .replace(new RegExp(',|�|[가-힣]', 'g'), '');

        drawResult.push(value);
      });
    lottoResultsOrigin.push(parseLottoResultOrigin(drawResult));
  });

  const lottoResults = lottoResultsOrigin.map((origin) =>
    parseLottoResultToOrigin(origin),
  );
  return lottoResults;
};
