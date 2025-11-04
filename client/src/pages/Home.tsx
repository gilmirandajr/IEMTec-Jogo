import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Smile, Headphones } from "lucide-react";
import { Link } from "wouter";
import AccessibilityInfo from "@/components/AccessibilityInfo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-purple-600">
            <span aria-hidden="true">🌟</span> Jogo de Inteligência Emocional
          </h1>
          <p className="text-gray-600 mt-2">
            Aprenda a reconhecer, nomear e expressar suas emoções
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12" role="main">
        {/* Introduction Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Bem-vindo ao seu Jogo Educacional!
            </h2>
            <p className="text-gray-700 mb-4">
              Este jogo foi criado para ajudar você a desenvolver suas habilidades socioemocionais.
              Através de atividades divertidas e interativas, você aprenderá a:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Reconhecer e nomear suas emoções</li>
              <li>Entender como as emoções afetam seus pensamentos e comportamentos</li>
              <li>Desenvolver estratégias para lidar com sentimentos desafiadores</li>
              <li>Praticar empatia e respeito pelos outros</li>
              <li>Promover bem-estar e equilíbrio emocional</li>
            </ul>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Calendário Emocional */}
          <Link href="/calendario">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full focus-within:ring-2 focus-within:ring-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-8 h-8 text-red-500" aria-hidden="true" />
                  <CardTitle>Calendário Emocional</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-4">
                  Registre suas emoções diárias e veja como elas mudam ao longo do tempo.
                </CardDescription>
                <p className="text-sm text-gray-600 mb-4">
                  Clique em cada dia para registrar como você se sentiu e refletir sobre suas emoções.
                </p>
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  Abrir Calendário
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Meditação Guiada */}
          <Link href="/meditacao">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full focus-within:ring-2 focus-within:ring-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Headphones className="w-8 h-8 text-blue-500" aria-hidden="true" />
                  <CardTitle>Meditação Guiada</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-4">
                  Pratique técnicas de respiração e meditação para acalmar a mente.
                </CardDescription>
                <p className="text-sm text-gray-600 mb-4">
                  Escolha uma meditação e siga as instruções para relaxar e se reconectar com você mesmo.
                </p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Começar Meditação
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Ouça os Sentimentos */}
          <Link href="/jogo">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full focus-within:ring-2 focus-within:ring-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Smile className="w-8 h-8 text-green-500" aria-hidden="true" />
                  <CardTitle>Ouça os Sentimentos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-4">
                  Desenvolva empatia através de cenários interativos e tomada de decisão.
                </CardDescription>
                <p className="text-sm text-gray-600 mb-4">
                  Leia histórias e escolha como você responderia, aprendendo sobre empatia e escuta ativa.
                </p>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Jogar Agora
                </Button>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Footer Info */}
        <section className="mb-8 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            <span aria-hidden="true">💡</span> Dicas para aproveitar melhor:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span aria-hidden="true">✓</span> Dedique alguns minutos por dia para as atividades
            </li>
            <li>
              <span aria-hidden="true">✓</span> Seja honesto ao registrar suas emoções
            </li>
            <li>
              <span aria-hidden="true">✓</span> Não há respostas certas ou erradas - cada sentimento é válido
            </li>
            <li>
              <span aria-hidden="true">✓</span> Compartilhe suas experiências com amigos ou professores
            </li>
          </ul>
        </section>

        {/* Accessibility Info */}
        <section>
          <AccessibilityInfo />
        </section>
      </main>
    </div>
  );
}
