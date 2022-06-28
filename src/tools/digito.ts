export const digitosExiste = (senha: string) => {
  const senhaReplace = senha.replace(/\s/g, "");
  if (senhaReplace.length === 0) {
    return false;
  }
  return true;
};
