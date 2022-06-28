export const digitosExiste = (senha: string) => {
  if (senha.replace(/\s+/g, "").length === 0) {
    return false;
  }
  return true;
};
