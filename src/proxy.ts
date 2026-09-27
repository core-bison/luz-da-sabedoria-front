import { NextResponse } from "next/server";

// TODO: validar sessão e redirecionar para /login; restringir /painel a papéis administrativos.
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/biblioteca/:path*", "/perfil/:path*", "/painel/:path*"],
};
