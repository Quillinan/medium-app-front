import { Birthday, ErrorResponse } from '@utils/Types/Types';
import { get } from '@services/Api/Api';
import { getMonthlyBirthdays } from './GetMonthlyBirthdays';

vi.mock('@services/Api/Api', () => ({
  apiUrl: 'https://api.mock.com',
  codeSentenceBirth: 'codeSentenceBirth',
  codeAffiliate: 'mockAffiliate',
  codeSystem: 'mockSystem',
  get: vi.fn(),
}));

describe('getMonthlyBirthdays', () => {
  it('should return an error response when API call fails', async () => {
    const mockErrorResponse: ErrorResponse = {
      code: '404',
      message: 'Not Found',
      detailedMessage: 'Data not found',
      helpUrl: '',
      details: null,
    };

    vi.mocked(get).mockRejectedValueOnce({
      response: {
        data: mockErrorResponse,
      },
    });

    const result = await getMonthlyBirthdays(1);

    expect(result).toEqual(mockErrorResponse);
    expect(get).toHaveBeenCalledWith(
      'https://api.mock.com/codeSentenceBirth/mockAffiliate/mockSystem?parameters=MES_S%3D1'
    );
  });

  it('should return birthday data when API call is successful', async () => {
    const mockBirthdays: Birthday[] = [
      { NOME: 'Alice', DTNASCIMENTO: 1 },
      { NOME: 'Bob', DTNASCIMENTO: 2 },
    ];

    vi.mocked(get).mockResolvedValue(mockBirthdays);

    const result = await getMonthlyBirthdays(1);

    expect(result).toEqual(mockBirthdays);
    expect(get).toHaveBeenCalledWith(
      'https://api.mock.com/codeSentenceBirth/mockAffiliate/mockSystem?parameters=MES_S%3D1'
    );
  });
});
