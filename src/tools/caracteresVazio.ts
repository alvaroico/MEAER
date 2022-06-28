export const caracteresVazio = (senha: string) => {
  if (senha !== senha.replace(/\s/g, "")) {
    return false;
  }
  return true;
};
