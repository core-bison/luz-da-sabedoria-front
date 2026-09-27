export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div data-area="auth">{children}</div>;
}