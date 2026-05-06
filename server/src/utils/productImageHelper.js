const normalizeText = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

const slugifyProductName = (name) =>
  normalizeText(name)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const hashString = (value) =>
  Array.from(String(value || '')).reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) >>> 0;
  }, 7);

const pickFromArray = (items, hash) => items[hash % items.length];

const unsplashDownload = (photoId) => `https://unsplash.com/photos/${photoId}/download?force=true&w=1200`;

const REAL_IMAGE_LIBRARY = {
  'running-shoe': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    unsplashDownload('W_uDEmTq0po'),
    unsplashDownload('YehfyFdVK0A'),
  ],
  'gym-shoe': [
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
  ],
  'football-shoe': [
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80',
  ],
  'tennis-shoe': [
    'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80',
  ],
  'basketball-shoe': [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  ],
  'badminton-shoe': [
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80',
  ],
  'trail-shoe': [
    'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80',
  ],
  'walking-shoe': [
    'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80',
  ],
  tee: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    unsplashDownload('veqyyLkAcHU'),
  ],
  jacket: [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80',
  ],
  hoodie: [
    unsplashDownload('JykMeDZUHwY'),
    unsplashDownload('xXofYCc3hqc'),
    unsplashDownload('sMhOBWWoaJQ'),
  ],
  polo: [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80',
  ],
  tank: [
    unsplashDownload('XW47yQNE0TQ'),
    unsplashDownload('uO7dPRdkRlw'),
  ],
  'long-sleeve': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
  ],
  rashguard: [
    unsplashDownload('a8QvjO4KK0o'),
    unsplashDownload('iCf2ugNKhW0'),
  ],
  shorts: [
    'https://images.unsplash.com/photo-1506629905607-d9b1a0c7c40d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  ],
  pants: [
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80',
    unsplashDownload('8u-gocKshk0'),
  ],
  leggings: [
    'https://images.unsplash.com/photo-1515888311861-63f5f7f8e8c2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506629905607-d9b1a0c7c40d?auto=format&fit=crop&w=1200&q=80',
  ],
  jogger: [
    unsplashDownload('8u-gocKshk0'),
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=80',
  ],
  'track-pants': [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1200&q=80',
  ],
  'swim-jammer': [
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
  ],
  backpack: [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    unsplashDownload('W-nrHuJlfI8'),
  ],
  cap: [
    'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80',
  ],
  gloves: [
    unsplashDownload('CYyoMFLljJo'),
    unsplashDownload('GivgFcWh3Cc'),
  ],
  bottle: [
    unsplashDownload('Aej5gA11eHQ'),
    unsplashDownload('N-MqWXXZvNY'),
    unsplashDownload('aa3Js2ymB3k'),
  ],
  socks: [
    'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1200&q=80',
  ],
  goggles: [
    unsplashDownload('4QKJkJO6iOk'),
    unsplashDownload('-BUPaAMSOdE'),
  ],
  sensor: [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
  ],
  'belt-bag': [
    unsplashDownload('bnZzUWEUWi0'),
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
  ],
  'support-belt': [
    unsplashDownload('eJCPaYMZLLA'),
    unsplashDownload('PubbVHBHV5k'),
  ],
  wristband: [
    unsplashDownload('1BCcgvkqvw4'),
  ],
  towel: [
    unsplashDownload('3nZqChzzFrY'),
    'https://images.unsplash.com/photo-1526401485004-2fda9f82f8f0?auto=format&fit=crop&w=1200&q=80',
  ],
  ball: [
    'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80',
  ],
  'resistance-band': [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  ],
  mat: [
    'https://images.unsplash.com/photo-1546032996-6dfacbacbf0a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
  ],
  roller: [
    unsplashDownload('6ZWxlMtoAAQ'),
    unsplashDownload('6ZWxlMtoAAQ'),
  ],
  dumbbell: [
    unsplashDownload('0zkJ1EsH9dY'),
    unsplashDownload('JWK2H-2qz1Y'),
  ],
  'jump-rope': [
    'https://images.unsplash.com/photo-1518611507436-d376d7f1f0e6?auto=format&fit=crop&w=1200&q=80',
  ],
  racket: [
    unsplashDownload('imHF66HA3VY'),
    unsplashDownload('wieTrtA9v6I'),
  ],
  bench: [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
  ],
  goal: [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  ],
  rack: [
    'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
  ],
  'stability-ball': [
    unsplashDownload('3cb2NIf7vZw'),
  ],
  accessory: [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
  ],
  equipment: [
    unsplashDownload('dhJd3ax1pFs'),
  ],
  default: [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  ],
};

const detectProductVisual = (product) => {
  const normalizedName = normalizeText(product.name);
  const normalizedCategory = normalizeText(product.category);

  if (normalizedCategory.includes('giay')) {
    if (normalizedName.includes('bong ro')) return { kind: 'basketball-shoe', label: 'Basketball shoes' };
    if (normalizedName.includes('bong da') || normalizedName.includes('futsal')) return { kind: 'football-shoe', label: 'Football shoes' };
    if (normalizedName.includes('tennis')) return { kind: 'tennis-shoe', label: 'Tennis shoes' };
    if (normalizedName.includes('cau long')) return { kind: 'badminton-shoe', label: 'Badminton shoes' };
    if (normalizedName.includes('trail')) return { kind: 'trail-shoe', label: 'Trail shoes' };
    if (normalizedName.includes('gym')) return { kind: 'gym-shoe', label: 'Training shoes' };
    if (normalizedName.includes('di bo')) return { kind: 'walking-shoe', label: 'Walking shoes' };
    return { kind: 'running-shoe', label: 'Running shoes' };
  }

  if (normalizedCategory.includes('ao')) {
    if (normalizedName.includes('hoodie')) return { kind: 'hoodie', label: 'Sport hoodie' };
    if (normalizedName.includes('khoac') || normalizedName.includes('jacket')) return { kind: 'jacket', label: 'Track jacket' };
    if (normalizedName.includes('polo')) return { kind: 'polo', label: 'Polo shirt' };
    if (normalizedName.includes('tank')) return { kind: 'tank', label: 'Tank top' };
    if (normalizedName.includes('dai tay') || normalizedName.includes('compression')) return { kind: 'long-sleeve', label: 'Long sleeve top' };
    if (normalizedName.includes('boi') || normalizedName.includes('rashguard')) return { kind: 'rashguard', label: 'Swim top' };
    return { kind: 'tee', label: 'Sport tee' };
  }

  if (normalizedCategory.includes('quan')) {
    if (normalizedName.includes('legging')) return { kind: 'leggings', label: 'Sport leggings' };
    if (normalizedName.includes('jogger')) return { kind: 'jogger', label: 'Jogger pants' };
    if (normalizedName.includes('track')) return { kind: 'track-pants', label: 'Track pants' };
    if (normalizedName.includes('boi')) return { kind: 'swim-jammer', label: 'Swim jammer' };
    if (normalizedName.includes('short') || normalizedName.includes('tennis') || normalizedName.includes('bong da')) {
      return { kind: 'shorts', label: 'Sport shorts' };
    }
    return { kind: 'pants', label: 'Training pants' };
  }

  if (normalizedCategory.includes('phu kien')) {
    if (normalizedName.includes('balo')) return { kind: 'backpack', label: 'Sport backpack' };
    if (normalizedName.includes('mu')) return { kind: 'cap', label: 'Sport cap' };
    if (normalizedName.includes('gang tay') || normalizedName.includes('bao tay')) return { kind: 'gloves', label: 'Training gloves' };
    if (normalizedName.includes('binh nuoc') || normalizedName.includes('voi binh')) return { kind: 'bottle', label: 'Water bottle' };
    if (normalizedName.includes('tat')) return { kind: 'socks', label: 'Sport socks' };
    if (normalizedName.includes('kinh boi')) return { kind: 'goggles', label: 'Swim goggles' };
    if (normalizedName.includes('sensor')) return { kind: 'sensor', label: 'Heart-rate strap' };
    if (normalizedName.includes('deo hong') || normalizedName.includes('dung dien thoai')) return { kind: 'belt-bag', label: 'Running belt' };
    if (normalizedName.includes('that lung') || normalizedName.includes('dai lung')) return { kind: 'support-belt', label: 'Support belt' };
    if (normalizedName.includes('bang co tay')) return { kind: 'wristband', label: 'Wristband' };
    if (normalizedName.includes('khan')) return { kind: 'towel', label: 'Cooling towel' };
    return { kind: 'accessory', label: 'Sport accessory' };
  }

  if (normalizedCategory.includes('dung cu')) {
    if (normalizedName.includes('bong') && normalizedName.includes('stability')) return { kind: 'stability-ball', label: 'Stability ball' };
    if (normalizedName.includes('bong')) return { kind: 'ball', label: 'Training ball' };
    if (normalizedName.includes('khang luc')) return { kind: 'resistance-band', label: 'Resistance band' };
    if (normalizedName.includes('tham')) return { kind: 'mat', label: 'Training mat' };
    if (normalizedName.includes('con lan')) return { kind: 'roller', label: 'Recovery roller' };
    if (normalizedName.includes('ta')) return { kind: 'dumbbell', label: 'Strength tool' };
    if (normalizedName.includes('nhay')) return { kind: 'jump-rope', label: 'Jump rope' };
    if (normalizedName.includes('vot')) return { kind: 'racket', label: 'Racket gear' };
    if (normalizedName.includes('ghe')) return { kind: 'bench', label: 'Workout bench' };
    if (normalizedName.includes('luoi')) return { kind: 'goal', label: 'Training goal' };
    if (normalizedName.includes('khung')) return { kind: 'rack', label: 'Training rack' };
    return { kind: 'equipment', label: 'Training gear' };
  }

  return { kind: 'default', label: 'Sport product' };
};

const imageForProduct = (product) => {
  const { kind } = detectProductVisual(product);
  const imageOptions = REAL_IMAGE_LIBRARY[kind] || REAL_IMAGE_LIBRARY.default;
  return pickFromArray(imageOptions, hashString(product.name));
};

const applyProductImage = (product) => ({
  ...product,
  image: imageForProduct(product),
});

module.exports = {
  applyProductImage,
  detectProductVisual,
  imageForProduct,
  normalizeText,
  slugifyProductName,
};
