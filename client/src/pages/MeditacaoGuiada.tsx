import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { Link } from "wouter";

interface Meditacao {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number; // em segundos
  instrucoes: string[];
  emoji: string;
}

const MEDITACOES: Meditacao[] = [
  {
    id: "respiracao-4-7-8",
    titulo: "Respiração 4-7-8",
    descricao: "Técnica de respiração que acalma o sistema nervoso",
    duracao: 180,
    emoji: "🌬️",
    instrucoes: [
      "Sente-se confortavelmente com as costas retas",
      "Inspire pelo nariz contando até 4",
      "Segure a respiração contando até 7",
      "Expire pela boca contando até 8",
      "Repita 4 vezes",
      "Observe como seu corpo se sente mais calmo",
    ],
  },
  {
    id: "meditacao-corpo",
    titulo: "Varredura do Corpo",
    descricao: "Relaxe cada parte do seu corpo conscientemente",
    duracao: 300,
    emoji: "🧘",
    instrucoes: [
      "Deite-se ou sente-se confortavelmente",
      "Feche os olhos e respire profundamente",
      "Comece pelos pés e vá subindo",
      "Relaxe cada parte do corpo, uma por uma",
      "Sinta a tensão saindo do seu corpo",
      "Termine com uma respiração profunda",
    ],
  },
  {
    id: "meditacao-gratidao",
    titulo: "Meditação de Gratidão",
    descricao: "Cultive sentimentos positivos e gratidão",
    duracao: 240,
    emoji: "🙏",
    instrucoes: [
      "Sente-se em um lugar tranquilo",
      "Feche os olhos e respire lentamente",
      "Pense em 3 coisas pelas quais você é grato",
      "Sinta a gratidão em seu coração",
      "Visualize essas coisas boas em sua vida",
      "Abra os olhos sentindo-se renovado",
    ],
  },
  {
    id: "respiracao-caixa",
    titulo: "Respiração em Caixa",
    descricao: "Técnica para reduzir ansiedade e estresse",
    duracao: 120,
    emoji: "📦",
    instrucoes: [
      "Sente-se confortavelmente",
      "Inspire contando até 4",
      "Segure contando até 4",
      "Expire contando até 4",
      "Segure contando até 4",
      "Repita 5 vezes",
    ],
  },
];

export default function MeditacaoGuiada() {
  const [selectedMeditacao, setSelectedMeditacao] = useState<Meditacao | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const startMeditacao = (meditacao: Meditacao) => {
    setSelectedMeditacao(meditacao);
    setCurrentStep(0);
    setTimeLeft(meditacao.duracao);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    if (selectedMeditacao && currentStep < selectedMeditacao.instrucoes.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishMeditacao = () => {
    setSelectedMeditacao(null);
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (selectedMeditacao) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="text-5xl mb-4">{selectedMeditacao.emoji}</div>
            <CardTitle className="text-3xl">{selectedMeditacao.titulo}</CardTitle>
            <CardDescription className="text-lg mt-2">
              {formatTime(timeLeft)} restantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{
                  width: `${((selectedMeditacao.instrucoes.length - currentStep) / selectedMeditacao.instrucoes.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Current Instruction */}
            <div className="bg-blue-50 rounded-lg p-6 min-h-24 flex items-center justify-center">
              <p className="text-xl text-center text-gray-800 font-semibold">
                {selectedMeditacao.instrucoes[currentStep]}
              </p>
            </div>

            {/* Step Counter */}
            <div className="text-center text-sm text-gray-600">
              Passo {currentStep + 1} de {selectedMeditacao.instrucoes.length}
            </div>

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={currentStep === 0}
              >
                ← Anterior
              </Button>
              <Button
                size="lg"
                onClick={togglePlay}
                className="gap-2 bg-blue-500 hover:bg-blue-600"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Retomar
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={nextStep}
                disabled={currentStep === selectedMeditacao.instrucoes.length - 1}
              >
                Próximo →
              </Button>
            </div>

            {/* Finish Button */}
            <Button
              onClick={finishMeditacao}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              ✓ Concluir Meditação
            </Button>

            {/* Completion Message */}
            {currentStep === selectedMeditacao.instrucoes.length - 1 && isPlaying && (
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold">
                  🎉 Parabéns! Você completou a meditação!
                </p>
                <p className="text-sm text-green-600 mt-2">
                  Observe como você se sente agora. Você notou alguma mudança?
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-blue-600">🧘 Meditação Guiada</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="mb-8 bg-blue-50">
          <CardHeader>
            <CardTitle>Bem-vindo ao Espaço de Meditação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              A meditação é uma prática poderosa para acalmar a mente, reduzir a ansiedade e promover bem-estar.
              Escolha uma das meditações abaixo e siga as instruções no seu próprio ritmo.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Encontre um lugar tranquilo e confortável</li>
              <li>Siga as instruções passo a passo</li>
              <li>Não há pressa - faça no seu próprio ritmo</li>
              <li>Repita quantas vezes quiser</li>
            </ul>
          </CardContent>
        </Card>

        {/* Meditation Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {MEDITACOES.map((meditacao) => (
            <Card key={meditacao.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-4xl mb-2">{meditacao.emoji}</div>
                    <CardTitle>{meditacao.titulo}</CardTitle>
                    <CardDescription className="mt-2">{meditacao.descricao}</CardDescription>
                  </div>
                  <div className="text-sm font-semibold text-gray-500">
                    {Math.floor(meditacao.duracao / 60)} min
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Passos:</p>
                  <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                    {meditacao.instrucoes.slice(0, 3).map((instr, idx) => (
                      <li key={idx}>{instr}</li>
                    ))}
                    {meditacao.instrucoes.length > 3 && (
                      <li>... e mais {meditacao.instrucoes.length - 3} passos</li>
                    )}
                  </ol>
                </div>
                <Button
                  onClick={() => startMeditacao(meditacao)}
                  className="w-full bg-blue-500 hover:bg-blue-600 gap-2"
                >
                  <Play className="w-4 h-4" />
                  Começar Meditação
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-cyan-50">
          <CardHeader>
            <CardTitle className="text-lg">💡 Dicas para Melhorar sua Prática</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>✓ Pratique em um horário consistente para criar um hábito</p>
            <p>✓ Comece com meditações mais curtas se for iniciante</p>
            <p>✓ Não se preocupe se sua mente vagar - é completamente normal</p>
            <p>✓ Observe como você se sente após cada meditação</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
