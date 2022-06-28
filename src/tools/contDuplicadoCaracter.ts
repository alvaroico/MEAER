export const contDuplicadoCaracter = (senha: string) => {
  const caracterMapa = [] as any;

  for (const caracter of senha) {
    if (!caracterMapa[caracter]) {
      caracterMapa[caracter] = 1;
    } else {
      caracterMapa[caracter] = caracterMapa[caracter] + 1;
    }
  }

  const repeatedValues = Object.values(caracterMapa).filter(
    (count: any) => count > 1
  );
  return repeatedValues.length === 0;
};
