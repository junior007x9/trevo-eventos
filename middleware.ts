import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Verifica se a pessoa está tentando entrar na página de Admin
  if (pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    
    // Puxa a senha secreta que você guardou no .env.local
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (basicAuth) {
      // Descriptografa o usuário e a senha que a pessoa digitou
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // O usuário padrão será "admin" e a senha será a do seu .env.local
      if (user === 'admin' && pwd === adminPassword) {
        return NextResponse.next(); // Senha correta, pode passar!
      }
    }

    // Se não colocou senha ou errou, barra a entrada e mostra a caixinha do navegador
    return new NextResponse('Acesso Negado. Área Restrita.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Painel Admin - Trevo Eventos"',
      },
    });
  }

  // Para o resto do site (Home, Casamentos), deixa passar livremente
  return NextResponse.next();
}

// Configura o middleware para observar apenas a rota admin para não deixar o site lento
export const config = {
  matcher: ['/admin/:path*'],
};