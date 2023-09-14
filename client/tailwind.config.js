/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        suit: ['SUIT', 'sans-serif'],
        CrimsonPro: ['Crimson Pro', 'serif'],
      },
      colors: {
        bgColor: {
          light: '#fafafa',
          dark: '#151515',
        },
        textColor: {
          light: '#151515',
          dark: '#eeeeee',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [], // true: 모든 테마 | false: 라이트 + 다크만 | 배열: 특정 테마 지정 예시 ["라이트", "다크", "컵케이크"]
    base: false, // 기본적으로 루트 요소에 대한 배경 색상 및 전경 색상 적용
    styled: true, // 모든 구성 요소에 대한 daisyUI 색상 및 디자인 결정 포함
    utils: true, // 반응형 및 수정자 유틸리티 클래스 추가
  },
};
