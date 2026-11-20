export type CartFormField = 'customerName' | 'customerPhone' | 'deliveryAddress';

export interface CartFormValues {
  customerName: string;
  customerPhone: string;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress: string;
  generalNotes: string;
}

export type CartFormErrors = Partial<Record<CartFormField, string>>;

export interface CartFormValidationResult {
  isValid: boolean;
  errors: CartFormErrors;
  firstErrorField: CartFormField | null;
}

/**
 * Loose Indonesian WhatsApp / mobile phone validation.
 * Accepts formats such as:
 * - 081234567890
 * - 0812-3456-7890
 * - +62 812 3456 7890
 * - 6281234567890
 * - (0812) 3456 7890
 */
export function validateIndonesianPhone(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;

  // Reject characters outside digits, spaces, +, -, (, ), .
  if (/[^0-9+\-().\s]/.test(trimmed)) {
    return false;
  }

  // '+' may only appear once at the very start
  const plusMatches = trimmed.match(/\+/g);
  if (plusMatches && (plusMatches.length > 1 || !trimmed.startsWith('+'))) {
    return false;
  }

  const digits = trimmed.replace(/\D/g, '');

  if (digits.startsWith('08')) {
    return digits.length >= 10 && digits.length <= 15;
  }
  if (digits.startsWith('628')) {
    return digits.length >= 11 && digits.length <= 16;
  }
  if (digits.startsWith('8')) {
    return digits.length >= 9 && digits.length <= 14;
  }

  return false;
}

export function validateCartForm(values: CartFormValues): CartFormValidationResult {
  const errors: CartFormErrors = {};

  if (!values.customerName.trim()) {
    errors.customerName = 'Nama pemesan wajib diisi.';
  } else if (values.customerName.trim().length < 2) {
    errors.customerName = 'Nama pemesan minimal 2 karakter.';
  }

  if (!values.customerPhone.trim()) {
    errors.customerPhone = 'Nomor WhatsApp wajib diisi.';
  } else if (!validateIndonesianPhone(values.customerPhone)) {
    errors.customerPhone = 'Masukkan nomor WhatsApp Indonesia yang valid (contoh: 0812-3456-7890 atau +62 812...).';
  }

  if (values.deliveryOption === 'delivery' && !values.deliveryAddress.trim()) {
    errors.deliveryAddress = 'Alamat lengkap wajib diisi untuk metode antar.';
  }

  const fieldOrder: CartFormField[] = ['customerName', 'customerPhone', 'deliveryAddress'];
  const firstErrorField = fieldOrder.find((field) => Boolean(errors[field])) ?? null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}
