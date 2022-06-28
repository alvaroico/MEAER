export const caracteresVazio = (senha: string) => {
  return !/[/\s+/g]/.test(senha);
};
