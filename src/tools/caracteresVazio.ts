export const caracteresVazio = (senha: string) => {
  return !/[/\s+]/.test(senha);
};
