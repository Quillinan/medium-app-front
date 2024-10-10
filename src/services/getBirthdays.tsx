import { get, apiUrl, codeAffiliate, codeSystem } from './api';

export const getBirthdays = async (month: number): Promise<any> => {
  const codSentence = '01.06';
  console.log(codeAffiliate);
  console.log(codeSystem);

  const url = `${apiUrl}/${codSentence}/${codeAffiliate}/${codeSystem}?parameters=MES_S%3D${month}`;

  return get(url);
};
