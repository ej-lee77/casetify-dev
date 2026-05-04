import React from 'react'
import { FONT_COLORS } from './constants'

const EMOJIS = ['😀', '😊', '😍', '🥰', '😎', '🤩', '❤️', '🧡', '💛', '💚', '💙', '💜',
    '🔥', '✨', '🎉', '🌸', '🐶', '🐱', '🍕', '🍔', '⭐', '🏆', '🎁', '👍']

export function TextInputSection({
    textValue, setTextValue,
    fontColor, setFontColor,
    showEmojiPicker, setShowEmojiPicker,
}) {
    return (
        <div className="detail-info-box">
            <p className="label">텍스트 입력</p>
            <div className="custom-text-input-wrap">
                <input
                    type="text"
                    className="custom-text-input"
                    placeholder="원하시는 글씨를 입력하세요 (최대 10자)"
                    value={textValue}
                    maxLength={9}
                    onChange={e => setTextValue(e.target.value)}
                />
                <div style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex', alignItems: 'center', gap: 6,
                }}>
                    <span className="custom-char-count" style={{ position: 'static', transform: 'none' }}>
                        {textValue.length} / 10
                    </span>
                    <button
                        onClick={() => setShowEmojiPicker(p => !p)}
                        style={{
                            background: 'none', border: 'none',
                            cursor: 'pointer', fontSize: 18,
                            padding: 0, lineHeight: 1,
                        }}
                    >
                        😊
                    </button>
                </div>

                {showEmojiPicker && (
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: 4,
                        padding: 8, borderTop: '1px solid #eee', marginTop: 48,
                    }}>
                        {EMOJIS.map((e, i) => (
                            <button key={i}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, padding: 2 }}
                                onClick={() => {
                                    if (textValue.length < 9) setTextValue(p => p + e)
                                    setShowEmojiPicker(false)
                                }}>
                                {e}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <p className="label" style={{ marginTop: 16 }}>폰트 색상</p>
            <div className="detail-colors">
                {FONT_COLORS.map(c => (
                    <button key={c.id}
                        className={fontColor === c.hex ? 'active' : ''}
                        onClick={() => setFontColor(c.hex)}>
                        <span className="color-chip" style={{
                            backgroundColor: c.hex,
                            border: c.id === 'white' ? '1px solid #ddd' : 'none'
                        }} />
                        {c.label}
                    </button>
                ))}
            </div>
        </div>
    )
}