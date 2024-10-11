import { get, apiUrl, codeAffiliate, codeSystem } from './api';
import { Birthday, ErrorResponse } from '../utils/types';

export const getMonthlyBirthdays = async (
  month: number
): Promise<Birthday[] | ErrorResponse | undefined> => {
  const codSentence = import.meta.env.VITE_API_SENTENCE_BIRTHDAYS;
  const url = `${apiUrl}/${codSentence}/${codeAffiliate}/${codeSystem}?parameters=MES_S%3D${month}`;

  const response = await get(url);

  return response as Birthday[];
};
