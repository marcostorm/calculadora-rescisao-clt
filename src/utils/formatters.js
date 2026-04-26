// Funções utilitárias para formatação de valores e datas

// Converte número para string em Real (R$ 1.234,56)
export function formatBRL(value) {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00';
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Recebe a string digitada pelo usuário e devolve o valor numérico em reais.
// Ex.: "1234,56" -> 1234.56 ; "R$ 2.500,00" -> 2500.00
export function parseBRLInput(text) {
  if (!text) return 0;
  const onlyDigits = String(text).replace(/\D/g, '');
  if (!onlyDigits) return 0;
  // Trata os 2 últimos dígitos como centavos
  return parseInt(onlyDigits, 10) / 100;
}

// Aplica máscara de moeda enquanto o usuário digita.
// Ex.: digitando "12345" mostra "R$ 123,45"
export function maskCurrency(text) {
  const value = parseBRLInput(text);
  return formatBRL(value);
}

// Formata Date -> "dd/mm/aaaa"
export function formatDate(date) {
  if (!date) return '';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
