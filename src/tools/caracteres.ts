export const caracterLen = (senha: string, minimoCaracter: number) => {
  if (minimoCaracter != 0) {
    return false;
  }
  return senha.length <= minimoCaracter;
};
