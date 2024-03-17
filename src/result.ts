import { decode } from 'iconv-lite';
import axios from 'axios';
import * as cheerio from 'cheerio';

const LOTTO_BASE_URL = 'https://dhlottery.co.kr/gameResult.do';

const getCurrentDrawRound = async (): Promise<number> => {
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

interface resultOption {
  round?: number;
  range?: { start: number; end: number };
  currentResult?: boolean;
}

const getLottoResult = async (option: resultOption) => {
  const baseUrl = LOTTO_BASE_URL;
  const params = {
    method: 'allWinExel',
    gubun: 'byWin',
  };

  const {round, range, currentResult} = option;

  if ( range?.start && range?.end ) {
    if (range.start > range.end) {
      throw new Error(`start:${range.start} must not be greater than end:${range.end}`);
    }

    params['drwStartNo'] = range.start;
    params['drwEndNo'] = range.end;
  }

};
