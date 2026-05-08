import React from 'react'

// ── 베이스 경로 ───────────────────────────────────
const PHONE_BASE_MAP = {
    'impact': '/images/custom/model/impact',
    'magsafe-bounce': '/images/custom/model/bounce',
    'magsafe-compact': '/images/custom/model/ring',
}
const IPAD_BASE = '/images/custom/model/ipad'
const LAPTOP_BASE = '/images/custom/model/macbook'

// ── impact 파일명 ─────────────────────────────────
const MODEL_FILE_MAP = {
    // ── iPhone ──
    'iphone17promax': null,
    'iphone17pro':    'iphone17pro',
    'iphone17':       'IPHONE17',
    'iphone16promax': null,
    'iphone16pro':    'iphone16pro',
    'iphone16':       'IPHONE16',
    'iphone15pro':    'iphone15pro',
    'iphone15':       'IPHONE15',
    'iphone14plus':   null,
    'iphone13promax': null,
    'iphoneMini':     null,
    // ── Samsung ──
    's25ultra':       null,
    's25plus':        'GALAXYS25PLUS',
    's25':            'galxeys25',
    's26plus':        'galxeys26plus',
    's26':            'galxeys26',
    's24':            null,
    'z6fold':         'galxeysZfold6',
    'z6flip':         'ZFLIP6',
    'z7fold':         'galxeysZfold7',
    'z7flip':         'ZFLIP7',
    // ── Pixel ──
    'pixel9pro':      'GOOGLEPRO9',
    'pixel9':         'GOOGLE9',
    'pixel8pro':      null,
    'pixel10pro':     'pixel10pro',
    'pixel10':        'pixel10',
}

// ── 카메라 파일명 오버라이드 (대/소문자 혼재 대응) ──────────────────
// 기본: fileKey + '-camera.png'
// 대문자 CAMERA인 경우만 명시
const CAMERA_FILE_OVERRIDE = {
    'GALAXYS25PLUS': 'GALAXYS25PLUS-CAMERA',
    'GOOGLE9':       'GOOGLE9-CAMERA',
    'GOOGLEPRO9':    'GOOGLEPRO9-CAMERA',
    'IPHONE15':      'IPHONE15-CAMERA',
    'IPHONE16':      'IPHONE16-CAMERA',
    'IPHONE17':      'IPHONE17-CAMERA',
    // ZFLIP6/7은 소문자 -camera 이므로 기본값 사용
}



// ── bounce 파일명 ─────────────────────────────────
export const BOUNCE_FILE_MAP = {
    'iphone17promax': '17pro-bouce',
    'iphone17pro': '17pro-bouce',
    'iphone17': 'iphone17-bouce',
    'iphone16promax': '16pro-bouce',
    'iphone16': 'iphone16-bouce',
    'iphone15': 'iphone15-bouce',
    'iphone15promax': '15pro-bouce',
    'iphone14plus': null,
    'iphone13promax': null,
    'iphoneMini': null,
    's25ultra': null,
    's25plus': null,
    's25': null,
    's24': null,
    'z6fold': null,
    'z6flip': null,
    'pixel9pro': null,
    'pixel9': null,
    'pixel8pro': null,
}

// ── ring 파일명 ───────────────────────────────────
export const RING_FILE_MAP = {
    'iphone17promax': '17pro-ring',
    'iphone17pro': '17pro-ring',
    'iphone17': 'iphone17-ring',
    'iphone16promax': '16pro-ring',
    'iphone16': 'iphone16-ring',
    'iphone15promax': '15pro-ring',
    'iphone15': 'iphone15-ring',
    'iphone14plus': null,
    'iphone13promax': null,
    'iphoneMini': null,
    's25ultra': null,
    's25plus': null,
    's25': null,
    's24': null,
    'z6fold': '26plus-ring',
    'z6flip': '26-ring',
    'pixel9pro': null,
    'pixel9': null,
    'pixel8pro': null,
}

// ── 아이패드 파일명 ───────────────────────────────
const IPAD_FILE_MAP = {
    'ipad': 'ipad',
    'ipadmini': 'ipadmini',
    'ipadair4': 'ipadair4',
    'ipadair11': 'ipadair11',
    'ipadair13': 'ipadair13',
    'ipadpro11': 'ipadpro11',
    'ipadpro11s3': 'ipadpro11s3',
    'ipadpro12.9': 'ipadpro12.9',
    'ipadpro13': 'ipadpro13',
}

// ── 아이패드 캔버스 위치 (이미지 원본 590x1000 픽셀 기준) ──────────
// 본체/카메라 이미지가 모두 590x1000 동일 크기 → 겹치면 자동 정렬
const IPAD_CANVAS_MAP = {
    'ipad':        { top: 190, left: 65, w: 457, h: 618, radius: 16 },
    'ipadmini':    { top: 220, left: 85, w: 418, h: 558, radius: 14 },
    'ipadair4':    { top: 175, left: 54, w: 468, h: 648, radius: 12 },
    'ipadair11':   { top: 175, left: 54, w: 468, h: 648, radius: 12 },
    'ipadair13':   { top: 140, left: 35, w: 518, h: 718, radius: 14 },
    'ipadpro11':   { top: 175, left: 60, w: 468, h: 648, radius: 12 },
    'ipadpro11s3': { top: 175, left: 60, w: 468, h: 648, radius: 12 },
    'ipadpro12.9': { top: 123, left: 35, w: 518, h: 718, radius: 10 },
    'ipadpro13':   { top: 140, left: 35, w: 518, h: 718, radius: 10 },
}
const IPAD_IMG_W = 590
const IPAD_IMG_H = 1000


// ── 바운스 캔버스 위치 (이미지 원본 780x1360 픽셀 기준) ──────────
// 본체/카메라 이미지가 모두 780x1360 동일 크기 → 겹치면 자동 정렬
const BOUNCE_CANVAS_MAP = {
    // 'iphone17promax': { top: 225, left: 154, w: 472, h: 907, radius: 27 },
    'iphone17pro':    { top: 278, left: 200, w: 380, h: 810, radius: 60 },
    'iphone17':       { top: 340, left: 230, w: 320, h: 678, radius: 55 },
    // 'iphone16promax': { top: 296, left: 195, w: 391, h: 766, radius: 22 },
    'iphone16':       { top: 315, left: 223, w: 335, h: 730, radius: 55 },
    'iphone15':       { top: 330, left: 224, w: 330, h: 698, radius: 54 },
    // 'iphone15promax': { top: 309, left: 196, w: 388, h: 743, radius: 23 },
}


// ── impact 캔버스 위치 (780x1360 기준, radius 포함) ──────────────────
const IMPACT_CANVAS_MAP = {
    'iphone17pro':    { top: 296, left: 208, w: 368, h: 781, radius: 55 },
    'iphone17':       { top: 280, left: 204, w: 371, h: 800, radius: 65 },
    'iphone16pro':    { top: 280, left: 200, w: 378, h: 808, radius: 75 },
    'iphone16':       { top: 280, left: 200, w: 380, h: 800, radius: 74 },
    'iphone15pro':    { top: 238, left: 170, w: 436, h: 918, radius: 66 },
    'iphone15':       { top: 220, left: 170, w: 437, h: 924, radius: 67 },
    's25plus':        { top: 283, left: 208, w: 368, h: 799, radius: 34 },
    's25':            { top: 281, left: 210, w: 370, h: 800, radius: 40 },
    's26plus':        { top: 280, left: 202, w: 378, h: 800, radius: 36 },
    's26':            { top: 280, left: 208, w: 370, h: 800, radius: 27 },
    'z6fold':         { top: 258, left: 218, w: 362, h: 853, radius: 18 },
    'z6flip':         { top: 684, left: 215, w: 358, h: 410, radius: 10},
    'z7fold':         { top: 269, left: 214, w: 370, h: 822, radius:11 },
    'z7flip':         { top: 687, left: 220, w: 338, h: 375, radius: 10 },
    'pixel9pro':      { top: 260, left: 198, w: 389, h: 845, radius: 56 },
    'pixel9':         { top: 258, left: 198, w: 390, h: 845, radius: 60 },
    'pixel10':        { top: 280, left: 210, w: 364, h: 799, radius: 54 },
    'pixel10pro':     { top: 284, left: 210, w: 365, h: 795, radius: 54 },
}

// ── ring 캔버스 위치 (780x1360 기준, radius 포함) ─────────────────────
const RING_CANVAS_MAP = {
    // 'iphone17promax': { top: 246, left: 190, w: 400, h: 867, radius: 27 },
    'iphone17pro':    { top: 286, left: 218, w: 348, h: 810, radius: 67 },
    'iphone17':       { top: 269, left: 199, w: 380, h: 826, radius: 56 },
    // 'iphone16promax': { top: 186, left: 222, w: 389, h: 846, radius: 23 },
    'iphone16':       { top: 277, left: 200, w: 380, h: 808, radius: 49 },
    // 'iphone15promax': { top: 261, left: 182, w: 416, h: 838, radius: 23 },
    'iphone15':       { top: 275, left: 198, w: 383, h: 820, radius: 50 },
    'z6fold':         { top: 260, left: 189, w: 408, h: 848, radius: 30 },
    'z6flip':         { top: 274, left: 185, w: 410, h: 863, radius: 30 },
}
const PHONE_IMG_W = 780   // impact/ring/bounce 공통
const PHONE_IMG_H = 1360
const PHONE_DISPLAY_H = 600
const BOUNCE_IMG_W = 780
const BOUNCE_IMG_H = 1360
const BOUNCE_DISPLAY_H = 600

const IPAD_NO_CAMERA = ['ipadair11', 'ipadair13', 'ipadpro11']

// ── 맥북 파일명 ───────────────────────────────────
const LAPTOP_FILE_MAP = {
    'macbook13': 'macbook13',
    'macbook15': 'macbook15',
    'macbookair13': 'macbookair13',
    'macbookair13s1': 'macbookair13s1',
    'macbookpro14': 'macbookpro14',
    'macbookpro16': 'macbookpro16',
}

const MACBOOK_SIZE_MAP = {
    'macbook13': { imgW: 900, imgH: 789, displayW: 616.5, displayH: 450 },
    'macbook15': { imgW: 1097, imgH: 822, displayW: 600.5, displayH: 450 },
    'macbookair13': { imgW: 1115, imgH: 849, displayW: 591.0, displayH: 450 },
    'macbookair13s1': { imgW: 1133, imgH: 816, displayW: 624.8, displayH: 450 },
    'macbookpro14': { imgW: 1105, imgH: 783, displayW: 635.1, displayH: 450 },
    'macbookpro16': { imgW: 1100, imgH: 791, displayW: 625.8, displayH: 450 },
}

// ── 기본 레이아웃 ─────────────────────────────────
// const DEFAULT_LAYOUT = {
//     scale: 1.5,
//     bodyW: 200, bodyH: 358,
//     bodyRadius: 30,
//     canvas: { top: 63, left: 43, w: 128, h: 269, radius: 10 },
//     camera: { top: 59, left: 38, width: 67, height: 105 },
// }

// ── impact 레이아웃 ───────────────────────────────
// const MODEL_LAYOUT = {
//     'iphone17promax': {
//         scale: 1.5, bodyW: 280, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 30, left: 60, w: 140, h: 299, radius: 20 },
//         camera: { top: 32, left: 55, width: 150, height: 90 },
//     },
//     'iphone17pro': {
//         scale: 1.5, bodyW: 250, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 33, left: 49, w: 140, h: 300, radius: 30 },
//         camera: { top: 30, left: 43, width: 150, height: 100 },
//     },
//     'iphone17': {
//         scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 30, left: 38, w: 137, h: 298, radius: 20 },
//         camera: { top: 27, left: 35, width: 70, height: 75 },
//     },
//     'iphone16promax': {
//         scale: 1.5, bodyW: 260, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 20, left: 69, w: 140, h: 320, radius: 30 },
//         camera: { top: 22, left: 62, width: 80, height: 80 },
//     },
//     'iphone16pro': {
//         scale: 1.5, bodyW: 200, bodyH: 348, bodyRadius: 44,
//         canvas: { top: 23, left: 24, w: 157.2, h: 314, radius: 25 },
//         camera: { top: 24, left: 22, width: 92, height: 96 },
//     },
//     'iphone16': {
//         scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 43, left: 27, w: 140, h: 300, radius: 30 },
//         camera: { top: 45, left: 28, width: 73, height: 80 },
//     },
//     'iphone15pro': {
//         scale: 1.5, bodyW: 200, bodyH: 348, bodyRadius: 44,
//         canvas: { top: 27, left: 29, w: 148, h: 302, radius: 27 },
//         camera: { top: 26, left: 24, width: 90, height: 94 },
//     },
//     'iphone15': {
//         scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 35, left: 43, w: 135, h: 300, radius: 30 },
//         camera: { top: 35, left: 42, width: 77, height: 80 },
//     },
//     'iphone14plus': {
//         scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 39, left: 43, w: 143, h: 300, radius: 20 },
//         camera: { top: 38, left: 42, width: 77, height: 80 },
//     },
//     'iphone13promax': {
//         scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 33, left: 28, w: 140, h: 309, radius: 20 },
//         camera: { top: 30, left: 24, width: 87, height: 86 },
//     },
//     'iphoneMini': {
//         scale: 1.5, bodyW: 180, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 63, left: 23, w: 128, h: 269, radius: 10 },
//         camera: { top: 28, left: 20, width: 80, height: 80 },
//     },
//     's25plus': {
//         scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 38, left: 27, w: 153, h: 305, radius: 20 },
//         camera: { top: 37, left: 23, width: 78, height: 110, background: '#221f1f', radius: 20 },
//     },
//     's25': {
//         scale: 1.5, bodyW: 195, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 25, left: 22, w: 152, h: 310, radius: 19 },
//         camera: { top: 22, left: 19, width: 80, height: 118 },
//     },
//     's26plus': {
//         scale: 1.5, bodyW: 210, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 28, left: 30, w: 152, h: 313, radius: 17 },
//         camera: { top: 24, left: 28, width: 80, height: 120 },
//     },
//     's26': {
//         scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 27, left: 29, w: 148.9, h: 315, radius: 13 },
//         camera: { top: 22, left: 23, width: 88, height: 130 },
//     },
//     's24': {
//         scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 38, left: 26, w: 148, h: 300, radius: 20 },
//         camera: { top: 38, left: 23, width: 77, height: 115 },
//     },
//     'z6fold': {
//         scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 20,
//         canvas: { top: 44, left: 58, w: 140, h: 295, radius: 10 },
//         camera: { top: 40, left: 53, width: 74, height: 120 },
//     },
//     'z6flip': {
//         scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 194.6, left: 31, w: 142, h: 147, radius: 8 },
//         camera: { top: 45, left: 30, width: 56, height: 33 },
//     },
//     'z7fold': {
//         scale: 1.5, bodyW: 190, bodyH: 358, bodyRadius: 20,
//         canvas: { top: 33, left: 29, w: 135, h: 297, radius: 10 },
//         camera: { top: 32, left: 30, width: 72, height: 110 },
//     },
//     'z7flip': {
//         scale: 1.5, bodyW: 190, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 185, left: 23, w: 144, h: 150, radius: 7 },
//         camera: { top: 45, left: 30, width: 56, height: 33 },
//     },
//     'pixel9pro': {
//         scale: 1.5, bodyW: 220, bodyH: 348, bodyRadius: 30,
//         canvas: { top: 21.8, left: 37, w: 150, h: 310, radius: 15 },
//         camera: { top: 40, left: 37, width: 150, height: 55 },
//     },
//     'pixel9': {
//         scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 33, left: 50, w: 149, h: 310, radius: 27 },
//         camera: { top: 54, left: 48, width: 150, height: 60 },
//     },
//     'pixel8pro': {
//         scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 38, left: 38, w: 150, h: 300, radius: 25 },
//         camera: { top: 40, left: 34, width: 154, height: 64 },
//     },
//     'pixel10': {
//         scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 33, left: 38, w: 146, h: 310, radius: 30 },
//         camera: { top: 45, left: 19.9, width: 160, height: 58 },
//     },
//     'pixel10pro': {
//         scale: 1.5, bodyW: 225, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 29, left: 33, w: 165, h: 312, radius: 22 },
//         camera: { top: 58, left: 30, width: 170, height: 60 },
//     },
//     'macbook13': {
//         scale: 1.2, bodyW: 380, bodyH: 240, bodyRadius: 10,
//         canvas: { top: 19, left: 29, w: 338, h: 203, radius: 47 },
//         camera: null,
//     },
//     'macbook15': {
//         scale: 1.1, bodyW: 420, bodyH: 260, bodyRadius: 10,
//         canvas: { top: 29, left: 34, w: 370, h: 210, radius: 45 },
//         camera: null,
//     },
//     'macbookair13': {
//         scale: 1.2, bodyW: 380, bodyH: 240, bodyRadius: 10,
//         canvas: { top: 30, left: 35, w: 329, h: 191, radius: 46 },
//         camera: null,
//     },
//     'macbookair13s1': {
//         scale: 1.2, bodyW: 380, bodyH: 240, bodyRadius: 10,
//         canvas: { top: 21.2, left: 40, w: 320, h: 195, radius: 9 },
//         camera: null,
//     },
//     'macbookpro14': {
//         scale: 1.15, bodyW: 400, bodyH: 252, bodyRadius: 10,
//         canvas: { top: 17.6, left: 32, w: 348.8, h: 219, radius: 49.8 },
//         camera: null,
//     },
//     'macbookpro16': {
//         scale: 1.05, bodyW: 440, bodyH: 275, bodyRadius: 10,
//         canvas: { top: 25, left: 27, w: 388.8, h: 232.5, radius: 49 },
//         camera: null,
//     },
// }

// ── bounce 레이아웃 ───────────────────────────────
// const BOUNCE_LAYOUT = {
//     'iphone17promax': {
//         scale: 1.5, bodyW: 240, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 30, left: 38, w: 160, h: 299, radius: 20 },
//         camera: { top: 32, left: 35, width: 170, height: 110 },
//     },
//     'iphone17pro': {
//         scale: 1.5, bodyW: 216, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 33, left: 39, w: 160, h: 300, radius: 30 },
//         camera: { top: 34, left: 30, width: 150, height: 90 },
//     },
//     'iphone17': {
//         scale: 1.5, bodyW: 230, bodyH: 350, bodyRadius: 44,
//         canvas: { top: 30, left: 43, w: 132, h: 298, radius: 20 },
//         camera: { top: 31, left: 42, width: 80, height: 90 },
//     },
//     'iphone16promax': {
//         scale: 1.5, bodyW: 240, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 28, left: 37, w: 159.7, h: 308, radius: 30 },
//         camera: { top: 27, left: 33, width: 90, height: 90 },
//     },
//     'iphone16': {
//         scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 24, left: 34, w: 152, h: 312, radius: 26 },
//         camera: { top: 25, left: 34, width: 83, height: 90 },
//     },
//     'iphone15': {
//         scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 24, left: 33, w: 153, h: 310, radius: 25 },
//         camera: { top: 25, left: 32, width: 77, height: 80 },
//     },
// }

// ── ring 레이아웃 ─────────────────────────────────
// const RING_LAYOUT = {
//     'iphone17promax': {
//         scale: 1.5, bodyW: 280, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 30, left: 43, w: 162, h: 299, radius: 20 },
//         camera: { top: 16, left: 40, width: 220, height: 120 },
//     },
//     'iphone17pro': {
//         scale: 1.5, bodyW: 250, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 33, left: 38, w: 145, h: 303, radius: 30 },
//         camera: { top: 20, left: 33, width: 210, height: 110 },
//     },
//     'iphone17': {
//         scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 44,
//         canvas: { top: 20, left: 34, w: 152, h: 316, radius: 27 },
//         camera: { top: 13, left: 32, width: 115, height: 100 },
//     },
//     'iphone16promax': {
//         scale: 1.5, bodyW: 190, bodyH: 318, bodyRadius: 44,
//         canvas: { top: 13, left: 21, w: 148, h: 290, radius: 22 },
//         camera: { top: 8, left: 22, width: 98, height: 80 },
//     },
//     'iphone16': {
//         scale: 1.5, bodyW: 200, bodyH: 318, bodyRadius: 44,
//         canvas: { top: 17, left: 24, w: 145, h: 280, radius: 26 },
//         camera: { top: 12, left: 23, width: 90, height: 80 },
//     },
//     'iphone15': {
//         scale: 1.5, bodyW: 195, bodyH: 328, bodyRadius: 44,
//         canvas: { top: 13, left: 23, w: 152, h: 302, radius: 24 },
//         camera: { top: 9, left: 21, width: 110, height: 85 },
//     },
//     'z6fold': {
//         scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 20,
//         canvas: { top: 15, left: 35, w: 162, h: 322, radius: 15 },
//         camera: { top: 10, left: 31, width: 114, height: 134 },
//     },
//     'z6flip': {
//         scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
//         canvas: { top: 18, left: 25, w: 149, h: 315, radius: 9 },
//         camera: { top: 12, left: 22.8, width: 110, height: 130 },
//     },
// }

// ── 케이스타입 지원 여부 체크 ─────────────────────
export function isCaseTypeSupported(modelId, caseTypeId) {
    if (caseTypeId === 'magsafe-bounce') return !!BOUNCE_FILE_MAP[modelId]
    if (caseTypeId === 'magsafe-compact') return !!RING_FILE_MAP[modelId]
    return true
}

// ── 필터 스타일 ──────────────────────────────────
function getFilterStyle(filterId, strength) {
    const s = strength / 100
    switch (filterId) {
        case 'retro': return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
        case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
        case 'mono': return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
        default: return {}
    }
}

// ── 케이스타입별 레이아웃 선택 ────────────────────
function getLayout(selectedModel, selectedCaseType) {
    if (selectedCaseType === 'magsafe-bounce') {
        return BOUNCE_LAYOUT[selectedModel] || MODEL_LAYOUT[selectedModel] || DEFAULT_LAYOUT
    }
    if (selectedCaseType === 'magsafe-compact') {
        return RING_LAYOUT[selectedModel] || MODEL_LAYOUT[selectedModel] || DEFAULT_LAYOUT
    }
    return MODEL_LAYOUT[selectedModel] || DEFAULT_LAYOUT
}

// ── 기기 타입별 Placeholder (SVG 모형) ──────────────
function DevicePlaceholder({ deviceType, selectedModel, selectedCaseType, bodySrc, selectedCaseColor }) {
    const line1 = !selectedModel ? '기종을'
        : !selectedCaseType ? '케이스 타입을'
            : !bodySrc ? '이미지'
                : '커스텀 내용을'
    const line2 = !selectedModel ? '선택하세요'
        : !selectedCaseType ? '선택하세요'
            : !bodySrc ? '준비 중입니다'
                : '선택하세요'
    const cc = selectedCaseColor || '#888'

    if (deviceType === 'laptop') {
        return (
            <svg width="340" height="230" viewBox="0 0 340 230" style={{ display: 'block', margin: '0 auto' }}>
                <rect x="10" y="10" width="320" height="200" rx="10"
                    fill={cc} fillOpacity="0.12"
                    stroke={cc} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="6 4" />
                <rect x="24" y="22" width="292" height="176" rx="6"
                    fill={cc} fillOpacity="0.07"
                    stroke={cc} strokeOpacity="0.2" strokeWidth="1" />
                <circle cx="170" cy="30" r="4" fill={cc} fillOpacity="0.4" />
                <rect x="0" y="212" width="340" height="8" rx="3" fill={cc} fillOpacity="0.15" />
                <text x="170" y="104" textAnchor="middle" fontSize="13" fill={cc} fillOpacity="0.5" fontFamily="sans-serif">{line1}</text>
                <text x="170" y="122" textAnchor="middle" fontSize="13" fill={cc} fillOpacity="0.5" fontFamily="sans-serif">{line2}</text>
            </svg>
        )
    }

    if (deviceType === 'tablet') {
        return (
            <svg width="180" height="260" viewBox="0 0 180 260" style={{ display: 'block', margin: '0 auto' }}>
                <rect x="10" y="10" width="160" height="240" rx="16"
                    fill={cc} fillOpacity="0.12"
                    stroke={cc} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="6 4" />
                <circle cx="90" cy="24" r="5" fill={cc} fillOpacity="0.4" />
                <rect x="22" y="36" width="136" height="196" rx="6"
                    fill={cc} fillOpacity="0.07"
                    stroke={cc} strokeOpacity="0.2" strokeWidth="1" />
                <text x="90" y="128" textAnchor="middle" fontSize="13" fill={cc} fillOpacity="0.5" fontFamily="sans-serif">{line1}</text>
                <text x="90" y="146" textAnchor="middle" fontSize="13" fill={cc} fillOpacity="0.5" fontFamily="sans-serif">{line2}</text>
            </svg>
        )
    }

    return (
        <div className="custom-phone-preview" style={{ '--case-color': selectedCaseColor || '#111111' }}>
            <div className="custom-phone-body">
                <div className="custom-phone-camera">
                    <div className="custom-phone-lens" />
                    <div className="custom-phone-lens" />
                    <div className="custom-phone-lens" />
                </div>
                <div className="custom-phone-screen">
                    <p className="custom-phone-placeholder">
                        {!selectedModel ? '기종을\n선택하세요'
                            : !selectedCaseType ? '케이스 타입을\n선택하세요'
                                : !bodySrc ? '해당 케이스 타입의\n이미지 준비 중입니다'
                                    : '커스텀 내용을\n선택하세요'}
                    </p>
                </div>
                <div className="custom-phone-grid" />
            </div>
        </div>
    )
}


// ── PhonePreview 컴포넌트 ─────────────────────────
export function PhonePreview({
    selectedModel,
    selectedCaseType,
    designType,
    previewURL,
    photoFilter,
    filterStrength,
    textValue,
    fontColor,
    photoTab,
    selectedCaseColor,
    deviceType,
}) {
    const isTablet = deviceType === 'tablet'
    const isLaptop = deviceType === 'laptop'

    let bodySrc = null
    let cameraSrc = null

    if (isTablet) {
        const fileKey = IPAD_FILE_MAP[selectedModel]
        if (fileKey) {
            bodySrc = `${IPAD_BASE}/${fileKey}.png`
            if (!IPAD_NO_CAMERA.includes(selectedModel)) {
                cameraSrc = `${IPAD_BASE}/${fileKey}-camera.png`
            }
        }
    } else if (isLaptop) {
        const fileKey = LAPTOP_FILE_MAP[selectedModel]
        if (fileKey) bodySrc = `${LAPTOP_BASE}/${fileKey}.png`
        cameraSrc = null
    } else {
        if (selectedCaseType === 'magsafe-bounce') {
            const fileKey = BOUNCE_FILE_MAP[selectedModel]
            if (fileKey) {
                bodySrc = `${PHONE_BASE_MAP['magsafe-bounce']}/${fileKey}.png`
                cameraSrc = `${PHONE_BASE_MAP['magsafe-bounce']}/${fileKey}-camera.png`
            }
        } else if (selectedCaseType === 'magsafe-compact') {
            const fileKey = RING_FILE_MAP[selectedModel]
            if (fileKey) {
                bodySrc = `${PHONE_BASE_MAP['magsafe-compact']}/${fileKey}.png`
                cameraSrc = `${PHONE_BASE_MAP['magsafe-compact']}/${fileKey}-camera.png`
            }
        } else {
            const phoneBase = PHONE_BASE_MAP['impact']
            const fileKey = MODEL_FILE_MAP[selectedModel]
            bodySrc = fileKey ? `${phoneBase}/${fileKey}.png` : null
            const camKey = fileKey
                ? (CAMERA_FILE_OVERRIDE[fileKey] || `${fileKey}-camera`)
                : null
            cameraSrc = camKey ? `${phoneBase}/${camKey}.png` : null
        }
    }

    const showPreview = !!selectedModel && (isTablet ? !!bodySrc : !!selectedCaseType && !!bodySrc)

    // ── Placeholder ───────────────────────────────
    if (!showPreview) {
        return (
            <DevicePlaceholder
                deviceType={deviceType}
                selectedModel={selectedModel}
                selectedCaseType={selectedCaseType}
                bodySrc={bodySrc}
                selectedCaseColor={selectedCaseColor}
            />
        )
    }


    // ── 바운스 전용 렌더 ──────────────────────────
    // 본체/카메라 모두 780x1360 동일 캔버스 → 겹치면 자동 정렬
    if (!isTablet && !isLaptop && selectedCaseType === 'magsafe-bounce' && bodySrc) {
        const canvasInfo = BOUNCE_CANVAS_MAP[selectedModel]
        const displayH = BOUNCE_DISPLAY_H * 1.5
        const displayW = (BOUNCE_IMG_W / BOUNCE_IMG_H) * displayH
        const scaleX = displayW / BOUNCE_IMG_W
        const scaleY = displayH / BOUNCE_IMG_H

        const scaledCanvas = canvasInfo ? {
            top:    canvasInfo.top    * scaleY,
            left:   canvasInfo.left   * scaleX,
            w:      canvasInfo.w      * scaleX,
            h:      canvasInfo.h      * scaleY,
            radius: (canvasInfo.radius || 0) * scaleX,
        } : null

        return (
            <div style={{ position: 'relative', width: displayW, height: displayH, margin: '0 auto', flexShrink: 0 }}>

                {/* ❶ 본체 */}
                <img src={bodySrc} alt={selectedModel} style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'fill', zIndex: 1, pointerEvents: 'none',
                }} />

                {/* ❷ 케이스 컬러 오버레이 */}
                {selectedCaseColor && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: selectedCaseColor,
                        mixBlendMode: 'multiply', opacity: 0.45,
                        zIndex: 2, pointerEvents: 'none',
                        WebkitMaskImage: `url(${bodySrc})`,
                        maskImage: `url(${bodySrc})`,
                        WebkitMaskSize: '100% 100%',
                        maskSize: '100% 100%',
                    }} />
                )}

                {/* ❸ 디자인 캔버스 */}
                {scaledCanvas && (
                    <div style={{
                        position: 'absolute',
                        top:    scaledCanvas.top,
                        left:   scaledCanvas.left,
                        width:  scaledCanvas.w,
                        height: scaledCanvas.h,
                        borderRadius: scaledCanvas.radius || 0,
                        overflow: 'hidden', zIndex: 3,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        {designType === 'photo' && previewURL && (
                            <img src={previewURL} alt="미리보기" style={{
                                width: '100%', height: '100%', objectFit: 'cover',
                                ...(photoFilter && getFilterStyle(photoFilter, filterStrength)),
                            }} />
                        )}
                        {designType === 'text' && textValue && (
                            <span style={{
                                color: fontColor || '#fff', fontSize: 14, fontWeight: 600,
                                textAlign: 'center', padding: 8,
                                wordBreak: 'break-all', whiteSpace: 'pre-line',
                            }}>{textValue}</span>
                        )}
                        {!((designType === 'photo' && previewURL) || (designType === 'text' && textValue)) && (
                            <p style={{
                                fontSize: 11, color: 'rgba(255,255,255,0.4)',
                                textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4,
                            }}>
                                {designType === 'photo'
                                    ? (photoTab === 'sticker' ? '스티커를\n선택하세요' : '사진을\n업로드하세요')
                                    : designType === 'text' ? '텍스트를\n입력하세요'
                                    : '커스텀 내용을\n선택하세요'}
                            </p>
                        )}
                    </div>
                )}

                {/* ❹ 카메라 - 780x1360 동일 크기로 겹치기 → 자동 정렬 */}
                {cameraSrc && (
                    <img src={cameraSrc} alt="camera" style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'fill', zIndex: 4, pointerEvents: 'none',
                    }} />
                )}
            </div>
        )
    }

    // ── 아이패드 전용 렌더 ────────────────────────
    // 본체/카메라 이미지가 동일 크기(590x1000)이므로 절대위치로 겹치기만 하면 됨
    if (isTablet) {
        const canvasInfo = IPAD_CANVAS_MAP[selectedModel]
        // 표시할 컨테이너 높이 고정 (원본 비율 590:1000 유지)
        const displayH = 600  // 원하는 표시 높이 (px)
        const displayW = (IPAD_IMG_W / IPAD_IMG_H) * displayH  // 590/1000 * 400 = 236

        // 캔버스 위치를 표시 크기 기준으로 스케일
        const scaleX = displayW / IPAD_IMG_W
        const scaleY = displayH / IPAD_IMG_H

        const scaledCanvas = canvasInfo ? {
            top:    canvasInfo.top    * scaleY,
            left:   canvasInfo.left   * scaleX,
            w:      canvasInfo.w      * scaleX,
            h:      canvasInfo.h      * scaleY,
            radius: (canvasInfo.radius || 0) * scaleX,
        } : null

        return (
            <div style={{
                position: 'relative',
                width: displayW,
                height: displayH,
                margin: '0 auto',
                flexShrink: 0,
            }}>
                {/* ❶ 본체 이미지 */}
                <img
                    src={bodySrc}
                    alt={selectedModel}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />

                {/* ❷ 케이스 컬러 오버레이 */}
                {selectedCaseColor && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: selectedCaseColor,
                        mixBlendMode: 'multiply',
                        opacity: 0.45,
                        zIndex: 2,
                        pointerEvents: 'none',
                        WebkitMaskImage: `url(${bodySrc})`,
                        maskImage: `url(${bodySrc})`,
                        WebkitMaskSize: '100% 100%',
                        maskSize: '100% 100%',
                    }} />
                )}

                {/* ❸ 디자인 캔버스 (화면 영역) */}
                {scaledCanvas && (
                    <div style={{
                        position: 'absolute',
                        top:    scaledCanvas.top,
                        left:   scaledCanvas.left,
                        width:  scaledCanvas.w,
                        height: scaledCanvas.h,
                        borderRadius: scaledCanvas.radius || 0,
                        overflow: 'hidden',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {designType === 'photo' && previewURL && (
                            <img src={previewURL} alt="미리보기" style={{
                                width: '100%', height: '100%', objectFit: 'cover',
                                ...(photoFilter && getFilterStyle(photoFilter, filterStrength)),
                            }} />
                        )}
                        {designType === 'text' && textValue && (
                            <span style={{
                                color: fontColor || '#fff',
                                fontSize: 14,
                                fontWeight: 600,
                                textAlign: 'center',
                                padding: 8,
                                wordBreak: 'break-all',
                                whiteSpace: 'pre-line',
                            }}>
                                {textValue}
                            </span>
                        )}
                        {!((designType === 'photo' && previewURL) || (designType === 'text' && textValue)) && (
                            <p style={{
                                fontSize: 11,
                                color: 'rgba(255,255,255,0.4)',
                                textAlign: 'center',
                                whiteSpace: 'pre-line',
                                lineHeight: 1.4,
                            }}>
                                {designType === 'photo'
                                    ? (photoTab === 'sticker' ? '스티커를\n선택하세요' : '사진을\n업로드하세요')
                                    : designType === 'text'
                                        ? '텍스트를\n입력하세요'
                                        : '커스텀 내용을\n선택하세요'}
                            </p>
                        )}
                    </div>
                )}

                {/* ❹ 카메라 이미지 - 본체와 동일 크기로 겹치기 → 자동 정렬 */}
                {cameraSrc && (
                    <img
                        src={cameraSrc}
                        alt="camera"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill',
                            zIndex: 4,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </div>
        )
    }

    // ── 맥북 렌더 ────────────────────────────────
    if (isLaptop) {
        const info = MACBOOK_SIZE_MAP[selectedModel]
        const dW = info ? info.displayW : 620
        const dH = info ? info.displayH : 450
        return (
            <div style={{ position: 'relative', width: dW, height: dH, margin: '0 auto', flexShrink: 0 }}>
                <img src={bodySrc} alt={selectedModel} style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'fill', zIndex: 1, pointerEvents: 'none',
                }} />
                {/* 디자인 캔버스 = 이미지 전체 */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 3,
                    borderRadius: info ? `${Math.round((info.displayH / info.imgH) * 48)}px` : '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                }}>
                    {designType === 'photo' && previewURL && (
                        <img src={previewURL} alt="미리보기" style={{
                            width: '100%', height: '100%', objectFit: 'cover',
                            ...(photoFilter && getFilterStyle(photoFilter, filterStrength)),
                        }} />
                    )}
                    {designType === 'text' && textValue && (
                        <span style={{
                            color: fontColor || '#fff', fontSize: 18, fontWeight: 600,
                            textAlign: 'center', padding: 12,
                            wordBreak: 'break-all', whiteSpace: 'pre-line',
                        }}>{textValue}</span>
                    )}
                    {!((designType === 'photo' && previewURL) || (designType === 'text' && textValue)) && (
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
                            {designType === 'photo'
                                ? (photoTab === 'sticker' ? '스티커를\n선택하세요' : '사진을\n업로드하세요')
                                : designType === 'text' ? '텍스트를\n입력하세요'
                                : '커스텀 내용을\n선택하세요'}
                        </p>
                    )}
                </div>
            </div>
        )
    }

    // ── 폰(impact/ring) 렌더 - 780x1360 캔버스맵 기반, 1.5배 ──────────
    {
        const SCALE = 1.5
        const displayH = PHONE_DISPLAY_H * SCALE
        const displayW = (PHONE_IMG_W / PHONE_IMG_H) * displayH

        const canvasMap = selectedCaseType === 'magsafe-compact' ? RING_CANVAS_MAP : IMPACT_CANVAS_MAP
        const canvasInfo = canvasMap[selectedModel]
        const scaleX = displayW / PHONE_IMG_W
        const scaleY = displayH / PHONE_IMG_H

        const scaledCanvas = canvasInfo ? {
            top:    canvasInfo.top    * scaleY,
            left:   canvasInfo.left   * scaleX,
            w:      canvasInfo.w      * scaleX,
            h:      canvasInfo.h      * scaleY,
            radius: (canvasInfo.radius || 0) * scaleX,
        } : null

        return (
            <div style={{ position: 'relative', width: displayW, height: displayH, margin: '0 auto', flexShrink: 0 }}>
                {/* ❶ 본체 */}
                <img src={bodySrc} alt={selectedModel} style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'fill', zIndex: 1, pointerEvents: 'none',
                }} />

                {/* ❷ 케이스 컬러 오버레이 */}
                {selectedCaseColor && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: selectedCaseColor,
                        mixBlendMode: 'multiply', opacity: 0.45,
                        zIndex: 2, pointerEvents: 'none',
                        WebkitMaskImage: `url(${bodySrc})`,
                        maskImage: `url(${bodySrc})`,
                        WebkitMaskSize: '100% 100%',
                        maskSize: '100% 100%',
                    }} />
                )}

                {/* ❸ 디자인 캔버스 */}
                {scaledCanvas ? (
                    <div style={{
                        position: 'absolute',
                        top:    scaledCanvas.top,
                        left:   scaledCanvas.left,
                        width:  scaledCanvas.w,
                        height: scaledCanvas.h,
                        borderRadius: scaledCanvas.radius,
                        overflow: 'hidden', zIndex: 3,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        {designType === 'photo' && previewURL && (
                            <img src={previewURL} alt="미리보기" style={{
                                width: '100%', height: '100%', objectFit: 'cover',
                                ...(photoFilter && getFilterStyle(photoFilter, filterStrength)),
                            }} />
                        )}
                        {designType === 'text' && textValue && (
                            <span style={{
                                color: fontColor || '#fff', fontSize: 16, fontWeight: 600,
                                textAlign: 'center', padding: 10,
                                wordBreak: 'break-all', whiteSpace: 'pre-line',
                            }}>{textValue}</span>
                        )}
                        {!((designType === 'photo' && previewURL) || (designType === 'text' && textValue)) && (
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
                                {designType === 'photo'
                                    ? (photoTab === 'sticker' ? '스티커를\n선택하세요' : '사진을\n업로드하세요')
                                    : designType === 'text' ? '텍스트를\n입력하세요'
                                    : '커스텀 내용을\n선택하세요'}
                            </p>
                        )}
                    </div>
                ) : (
                    // 캔버스맵 없으면 전체 영역
                    <div style={{ position: 'absolute', inset: 0, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {designType === 'photo' && previewURL && (
                            <img src={previewURL} alt="미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover', ...(photoFilter && getFilterStyle(photoFilter, filterStrength)) }} />
                        )}
                    </div>
                )}

                {/* ❹ 카메라 - 동일 크기로 겹치기 */}
                {cameraSrc && (
                    <img src={cameraSrc} alt="camera" style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%',
                        objectFit: 'fill', zIndex: 4, pointerEvents: 'none',
                    }} />
                )}
            </div>
        )
    }
}

export default PhonePreview