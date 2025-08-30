// Máscara de telefone para React (formato brasileiro)
export function maskPhoneBR(value: string): string {
  value = value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  // Celular: (11) 9XXXX-XXXX
  if (value.length >= 11 && value[2] === '9') {
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  }
  // Fixo: (11) XXXX-XXXX
  if (value.length === 10) {
    return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
  }
  // Impede 5 dígitos antes do hífen se não for celular
  if (value.length > 6) {
    if (value.length > 7 && value[2] !== '9') {
      // Força formato fixo
      return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
    }
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  }
  if (value.length > 2) {
    return `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }
  if (value.length > 0) {
    return `(${value}`;
  }
  return "";
}
