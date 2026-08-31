import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '巩凯旋｜3D 个人简历',
  description: '一份围绕 3D 虚拟形象展开的 AI Native 个人简历。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
