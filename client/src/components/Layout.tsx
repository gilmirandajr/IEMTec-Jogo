import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface LayoutProps {
  children: ReactNode;
  title: string;
  emoji: string;
  showBackButton?: boolean;
  backLink?: string;
  subtitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function Layout({
  children,
  title,
  emoji,
  showBackButton = true,
  backLink = "/",
  subtitle,
  gradientFrom = "from-blue-50",
  gradientTo = "to-purple-50",
}: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {showBackButton && (
            <Link href={backLink}>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                aria-label="Voltar para página anterior"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Voltar</span>
              </Button>
            </Link>
          )}
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              <span aria-hidden="true">{emoji}</span> {title}
            </h1>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8" role="main">
        {children}
      </main>

      {/* Skip to main content link (for accessibility) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white"
      >
        Pular para conteúdo principal
      </a>
    </div>
  );
}
