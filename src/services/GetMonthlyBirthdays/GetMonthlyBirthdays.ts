import {
  apiUrl,
  codeAffiliate,
  codeSystem,
  codeSentenceBirth,
  get,
} from '@services/Api/Api';
import { Birthday, ErrorResponse } from '@utils/Types/Types';

export const getMonthlyBirthdays = async (
  month: number
): Promise<Birthday[] | ErrorResponse | undefined> => {
  const url = `${apiUrl}/${codeSentenceBirth}/${codeAffiliate}/${codeSystem}?parameters=MES_S%3D${month}`;

  try {
    const response = await get(url);
    return response as Birthday[];
  } catch (error: any) {
    return error.response.data as ErrorResponse;
  }
};
