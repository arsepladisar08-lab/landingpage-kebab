import test from 'node:test';
import assert from 'node:assert/strict';
import { validateIndonesianPhone, validateCartForm } from './cartForm';

test('validateIndonesianPhone accepts valid loose Indonesian formats', () => {
  assert.equal(validateIndonesianPhone('081234567890'), true);
  assert.equal(validateIndonesianPhone('0838-3036-1617'), true);
  assert.equal(validateIndonesianPhone('+62 812 3456 7890'), true);
  assert.equal(validateIndonesianPhone('628123456789'), true);
  assert.equal(validateIndonesianPhone('(0812) 3456-7890'), true);
});

test('validateIndonesianPhone rejects empty, letters, too short, or non-Indonesian formats', () => {
  assert.equal(validateIndonesianPhone(''), false);
  assert.equal(validateIndonesianPhone('08123'), false);
  assert.equal(validateIndonesianPhone('0812abc67890'), false);
  assert.equal(validateIndonesianPhone('02112345678'), false);
  assert.equal(validateIndonesianPhone('++628123456789'), false);
});

test('validateCartForm requires name and phone, and requires address only for delivery', () => {
  const emptyPickup = validateCartForm({
    customerName: '',
    customerPhone: '',
    deliveryOption: 'pickup',
    deliveryAddress: '',
    generalNotes: '',
  });
  assert.equal(emptyPickup.isValid, false);
  assert.equal(emptyPickup.firstErrorField, 'customerName');
  assert.ok(emptyPickup.errors.customerName);
  assert.ok(emptyPickup.errors.customerPhone);
  assert.equal(emptyPickup.errors.deliveryAddress, undefined);

  const validPickup = validateCartForm({
    customerName: 'Siti Aminah',
    customerPhone: '0812-3456-7890',
    deliveryOption: 'pickup',
    deliveryAddress: '',
    generalNotes: 'Saus dipisah',
  });
  assert.equal(validPickup.isValid, true);
  assert.equal(validPickup.firstErrorField, null);

  const missingDeliveryAddress = validateCartForm({
    customerName: 'Siti Aminah',
    customerPhone: '+62 812 3456 7890',
    deliveryOption: 'delivery',
    deliveryAddress: '   ',
    generalNotes: '',
  });
  assert.equal(missingDeliveryAddress.isValid, false);
  assert.equal(missingDeliveryAddress.firstErrorField, 'deliveryAddress');
  assert.ok(missingDeliveryAddress.errors.deliveryAddress);

  const validDelivery = validateCartForm({
    customerName: 'Siti Aminah',
    customerPhone: '+62 812 3456 7890',
    deliveryOption: 'delivery',
    deliveryAddress: 'Jl. Bali No. 13, Medaeng Kulon',
    generalNotes: '',
  });
  assert.equal(validDelivery.isValid, true);
});
