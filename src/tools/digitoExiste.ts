export const digitosExiste = (senha: string) => {
  if (senha.length === 0) {
    return false;
  }
  return true;
};
