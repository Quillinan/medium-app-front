import { Birthday, ErrorResponse } from '@utils/Types/Types';
import { getTotvs } from '@services/Api/Api';
import { getMonthlyBirthdays } from './GetMonthlyBirthdays';

vi.mock('@services/Api/Api', () => ({
  apiTotvsUrl: 'https://api.mock.com',
  codeSentenceBirth: 'codeSentenceBirth',
  codeAffiliate: 'mockAffiliate',
  codeSystem: 'mockSystem',
  getTotvs: vi.fn(),
}));

describe('getMonthlyBirthdays', () => {
  it('should return an error response when API call fails', async () => {
    const mockErrorResponse: ErrorResponse = {
      code: '404',
      message: 'Dado não encontrado.',
      detailedMessage: 'Data not found',
      helpUrl: '',
      details: null,
    };

    vi.mocked(getTotvs).mockRejectedValueOnce({
      response: {
        status: 404,
        data: mockErrorResponse,
      },
      message: 'Data not found',
    });

    const result = await getMonthlyBirthdays(1);

    expect(result).toEqual(mockErrorResponse);
    expect(getTotvs).toHaveBeenCalledWith(
      'https://api.mock.com/codeSentenceBirth/mockAffiliate/mockSystem?parameters=MES_S%3D1'
    );
  });

  it('should return birthday data when API call is successful', async () => {
    const mockBirthdays: Birthday[] = [
      { NOME: 'João', DTNASCIMENTO: 1, DESCRICAO: 'Financeiro', IMAGEM: '' },
      { NOME: 'Maria', DTNASCIMENTO: 17, DESCRICAO: 'RH', IMAGEM: '' },
    ];

    vi.mocked(getTotvs).mockResolvedValue(mockBirthdays);

    const result = await getMonthlyBirthdays(1);

    expect(result).toEqual(mockBirthdays);
    expect(getTotvs).toHaveBeenCalledWith(
      'https://api.mock.com/codeSentenceBirth/mockAffiliate/mockSystem?parameters=MES_S%3D1'
    );
  });
});
