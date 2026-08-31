import type { Metadata } from 'next';
import { Noto_Sans_SC } from 'next/font/google';
import './globals.css';

const sans = Noto_Sans_SC({ variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '600', '700', '900'] });

export const metadata: Metadata = {
  title: '巩凯旋｜3D 个人简历',
  description: '一份围绕 3D 虚拟形象展开的 AI Native 个人简历。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={sans.variable}>{children}</body></html>;
}
