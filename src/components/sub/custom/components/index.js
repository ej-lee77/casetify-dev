export const BRANDS = [
  {
    id: 'apple', label: 'APPLE',
    models: [
      { id: 'iphone17promax', label: '아이폰 17 Pro Max' },
      { id: 'iphone17pro',    label: '아이폰 17 Pro' },
      { id: 'iphone17',       label: '아이폰 17' },
      { id: 'iphone16promax', label: '아이폰 16 Pro Max' },
      { id: 'iphone16pro',    label: '아이폰 16 Pro' },
      { id: 'iphone16',       label: '아이폰 16' },
      { id: 'iphone15',       label: '아이폰 15' },
      { id: 'iphone14plus',   label: '아이폰 14 Plus' },
      { id: 'iphone13promax', label: '아이폰 13 Pro Max' },
      { id: 'iphoneMini',     label: '아이폰 mini' },
    ],
  },
  {
    id: 'samsung', label: 'SAMSUNG',
    models: [
      { id: 's25ultra', label: 'Galaxy S25 Ultra' },
      { id: 's25plus',  label: 'Galaxy S25+' },
      { id: 's25',      label: 'Galaxy S25' },
      { id: 's24ultra', label: 'Galaxy S24 Ultra' },
      { id: 's24',      label: 'Galaxy S24' },
      { id: 'z6fold',   label: 'Galaxy Z Fold 6' },
      { id: 'z6flip',   label: 'Galaxy Z Flip 6' },
    ],
  },
  {
    id: 'google', label: 'GOOGLE',
    models: [
      { id: 'pixel9pro', label: 'Pixel 9 Pro' },
      { id: 'pixel9',    label: 'Pixel 9' },
      { id: 'pixel8pro', label: 'Pixel 8 Pro' },
    ],
  },
]

export const CASE_COLORS = [
  { id: 'black',  label: '블랙',  hex: '#111111' },
  { id: 'red',    label: '레드',  hex: '#E02020' },
  { id: 'white',  label: '화이트', hex: '#F0F0F0' },
  { id: 'yellow', label: '주황',  hex: '#F5A623' },
]

export const CASE_TYPES = [
  { id: 'magsafe-bounce',  label: '맥세이프 호환 바운스 케이스',     image: '/images/case-magsafe-bounce.png' },
  { id: 'magsafe-compact', label: '맥세이프 호환 임팩트 링 스탠드', image: '/images/case-magsafe-compact.png' },
  { id: 'magsafe-glaze',   label: '맥세이프 호환 케이스',            image: '/images/case-magsafe-glaze.png' },
  { id: 'impact',          label: '임팩트 케이스',                    image: '/images/case-impact.png' },
]

export const PHOTO_FILTERS = [
  { id: 'retro',   label: 'Retro Rainbow', preview: '/images/filter-retro.jpg' },
  { id: 'digicam', label: 'Digicam',       preview: '/images/filter-digicam.jpg' },
  { id: 'mono',    label: 'Classic Mono',  preview: '/images/filter-mono.jpg' },
]

export const FONT_COLORS = [
  { id: 'black', label: '블랙', hex: '#111111' },
  { id: 'red',   label: '빨강', hex: '#E02020' },
  { id: 'blue',  label: '파랑', hex: '#1A5ADB' },
]

export const DEVICE_TYPES = [
  { id: 'phone',   label: '폰케이스',    image: '/images/device-phone.png' },
  { id: 'tablet',  label: '태블릿 케이스', image: '/images/device-tablet.png' },
  { id: 'laptop',  label: '노트북 케이스', image: '/images/device-laptop.png' },
]

export const INITIAL_SELECTIONS = {
  designType: null,
  deviceType: null,
  brand: null,
  model: null,
  color: null,
  caseType: null,
  photoFile: null,
  photoURL: null,
  photoFilter: null,
  filterStrength: 50,
  textValue: '',
  fontColor: null,
}
