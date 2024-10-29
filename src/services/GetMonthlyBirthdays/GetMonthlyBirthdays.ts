import { ErrorResponse, Birthday } from '@utils/Types/Types';
import {
  apiTotvsUrl,
  codeAffiliate,
  codeSystem,
  codeSentenceBirth,
  getTotvs,
} from '@services/Api/Api';
import handleError from '@errors/HandleError/HandleError';

export const getMonthlyBirthdays = async (
  month: number
): Promise<Birthday[] | ErrorResponse> => {
  const url = `${apiTotvsUrl}/${codeSentenceBirth}/${codeAffiliate}/${codeSystem}?parameters=MES_S%3D${month}`;

  try {
    const response = await getTotvs(url);
    return response as Birthday[];
  } catch (error: any) {
    return handleError(error);
  }
};
