export const caracterEspecial = (senha: string) => {
  return /[!@#$%^&*()-+]/.test(senha);
};
