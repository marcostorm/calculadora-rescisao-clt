// Cálculos simplificados de rescisão CLT.
// AVISO: valores aproximados, sem caráter jurídico definitivo.

// Diferença em meses cheios entre duas datas (arredonda para cima a partir de 15 dias).
export function monthsBetween(start, end) {
  if (!start || !end || end < start) return 0;
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  // Regra simplificada: 15+ dias do mês contam como mês cheio
  if (end.getDate() - start.getDate() >= 15) months += 1;
  return Math.max(0, months);
}

// Meses trabalhados dentro do ano da rescisão (para 13º e férias proporcionais)
export function monthsInDismissalYear(admission, dismissal) {
  if (!admission || !dismissal) return 0;
  const startOfYear = new Date(dismissal.getFullYear(), 0, 1);
  const start = admission > startOfYear ? admission : startOfYear;
  return monthsBetween(start, dismissal);
}

// Saldo de salário = (salario / 30) * dias trabalhados no mês da demissão
function saldoSalario(salary, dismissal) {
  if (!salary || !dismissal) return 0;
  const dias = dismissal.getDate();
  return (salary / 30) * dias;
}

export const DISMISSAL_TYPES = {
  SEM_JUSTA_CAUSA: 'sem_justa_causa',
  PEDIDO_DEMISSAO: 'pedido_demissao',
};

/**
 * Calcula a rescisão.
 * @param {Object} params
 * @param {number} params.salary       Salário bruto mensal (R$)
 * @param {Date}   params.admission    Data de admissão
 * @param {Date}   params.dismissal    Data de desligamento
 * @param {string} params.type         Tipo de rescisão (DISMISSAL_TYPES)
 */
export function calculateRescision({ salary, admission, dismissal, type }) {
  const totalMonths = monthsBetween(admission, dismissal);
  const yearMonths = monthsInDismissalYear(admission, dismissal);

  const saldo = saldoSalario(salary, dismissal);
  const decimoTerceiro = (salary / 12) * yearMonths;

  const feriasBase = salary * (yearMonths / 12);
  const ferias = feriasBase + feriasBase / 3; // + 1/3 constitucional

  const fgts = salary * 0.08 * totalMonths;

  const isSemJustaCausa = type === DISMISSAL_TYPES.SEM_JUSTA_CAUSA;
  const multaFgts = isSemJustaCausa ? fgts * 0.4 : 0;

  const total = saldo + decimoTerceiro + ferias + multaFgts;
  // Obs.: o FGTS acumulado fica na Caixa, não é pago direto na rescisão.
  // Por isso ele é exibido como informativo, mas NÃO entra no "total".

  return {
    saldo,
    decimoTerceiro,
    ferias,
    fgts,
    multaFgts,
    total,
    totalMonths,
    yearMonths,
  };
}
