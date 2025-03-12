interface Props {
  children: React.ReactNode;
}

export function Main({ children, }: Props) {
  return (
    <main>
      {children}
    </main>
  );
}
