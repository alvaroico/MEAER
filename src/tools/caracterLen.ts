export const caracterLen = (senha: string, minimoCaracter: number) => {
  if (senha.length < minimoCaracter) {
    return false;
  }
  return senha.length >= minimoCaracter;
};
