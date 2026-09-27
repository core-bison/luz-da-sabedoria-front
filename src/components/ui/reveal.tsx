import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Revela o conteúdo com fade + leve subida conforme entra na tela.
 * Só CSS (animation-timeline: view(), ver globals.css): não depende de JavaScript e,
 * em navegadores sem suporte ou com movimento reduzido, o conteúdo aparece direto.
 */
export function Reveal({ children, className }: RevealProps) {
  return (
    <div data-reveal className={cn(className)}>
      {children}
    </div>
  );
}
