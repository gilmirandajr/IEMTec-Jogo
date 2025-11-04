import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";

interface Opcao {
  id: string;
  texto: string;
  feedback: string;
  empatia: number; // 0-10
  emoji: string;
}

interface Cenario {
  id: string;
  titulo: string;
  descricao: string;
  contexto: string;
  personagem: string;
  emoji: string;
  opcoes: Opcao[];
}

const CENARIOS: Cenario[] = [
  {
    id: "amigo-triste",
    titulo: "Seu Amigo Está Triste",
    descricao: "Seu melhor amigo não está se sentindo bem",
    personagem: "João",
    emoji: "😢",
    contexto:
      "João chegou na escola com o rosto triste. Você percebe que ele não está participando das brincadeiras como de costume. Ele fica sozinho no canto do pátio.",
    opcoes: [
      {
        id: "ignorar",
        texto: "Ignorar e continuar brincando com outros amigos",
        feedback:
          "João se sente mais sozinho e triste. Lembre-se: quando alguém está triste, ela precisa saber que não está sozinha.",
        empatia: 1,
        emoji: "❌",
      },
      {
        id: "perguntar",
        texto: "Aproximar-se e perguntar o que aconteceu",
        feedback:
          "João se sente acolhido e aprecia sua preocupação. Você demonstrou empatia ao reconhecer seus sentimentos!",
        empatia: 9,
        emoji: "✅",
      },
      {
        id: "contar-piada",
        texto: "Contar uma piada para tentar fazê-lo rir",
        feedback:
          "Sua intenção é boa, mas João pode se sentir incompreendido. Às vezes, as pessoas precisam ser ouvidas antes de serem animadas.",
        empatia: 5,
        emoji: "⚠️",
      },
    ],
  },
  {
    id: "colega-nervoso",
    titulo: "Colega Nervoso na Prova",
    descricao: "Seu colega está muito ansioso antes de uma prova",
    personagem: "Maria",
    emoji: "😰",
    contexto:
      "Maria está tremendo antes de fazer uma prova importante. Você a vê respirando rapidamente e com as mãos suadas. Ela parece muito assustada.",
    opcoes: [
      {
        id: "criticar",
        texto: "Dizer que ela é fraca por ficar nervosa",
        feedback:
          "Maria se sente pior e mais envergonhada. A crítica nunca ajuda alguém que está ansioso.",
        empatia: 0,
        emoji: "❌",
      },
      {
        id: "respiracao",
        texto: "Sugerir uma respiração profunda e dizer que você acredita nela",
        feedback:
          "Maria se sente apoiada e mais calma. Você mostrou empatia ao reconhecer sua ansiedade e oferecer ajuda prática!",
        empatia: 10,
        emoji: "✅",
      },
      {
        id: "ignorar",
        texto: "Fingir que não vê e focar em sua própria prova",
        feedback:
          "Maria continua ansiosa e sozinha. Você perdeu uma oportunidade de ajudar um colega que precisava.",
        empatia: 2,
        emoji: "⚠️",
      },
    ],
  },
  {
    id: "novo-aluno",
    titulo: "Novo Aluno na Turma",
    descricao: "Um novo aluno chegou na sua turma",
    personagem: "Lucas",
    emoji: "🆕",
    contexto:
      "Lucas é novo na escola e está sentado sozinho no intervalo. Ele parece tímido e desconfortável. Ninguém está falando com ele.",
    opcoes: [
      {
        id: "exclusao",
        texto: "Deixar ele sozinho - ele vai se virar",
        feedback:
          "Lucas se sente rejeitado e isolado. Isso pode afetar sua confiança e bem-estar na escola.",
        empatia: 1,
        emoji: "❌",
      },
      {
        id: "inclusao",
        texto: "Convidá-lo para brincar e apresentá-lo aos seus amigos",
        feedback:
          "Lucas se sente bem-vindo e seguro. Você mostrou grande empatia ao reconhecer sua solidão e agir para incluí-lo!",
        empatia: 10,
        emoji: "✅",
      },
      {
        id: "observar",
        texto: "Observar de longe para ver se ele faz amigos",
        feedback:
          "Sua intenção é boa, mas Lucas continua sozinho. Às vezes, precisamos tomar a iniciativa para ajudar.",
        empatia: 4,
        emoji: "⚠️",
      },
    ],
  },
  {
    id: "amigo-raiva",
    titulo: "Amigo Muito Bravo",
    descricao: "Seu amigo está com raiva de você",
    personagem: "Pedro",
    emoji: "😠",
    contexto:
      "Pedro está muito bravo porque você acidentalmente derrubou seu desenho que ele estava fazendo. Ele está gritando e não quer falar com você.",
    opcoes: [
      {
        id: "defender",
        texto: "Gritar de volta e dizer que foi acidente",
        feedback:
          "A situação piora. Quando alguém está com raiva, gritar de volta só aumenta o conflito.",
        empatia: 1,
        emoji: "❌",
      },
      {
        id: "desculpar",
        texto: "Pedir desculpas sinceras e oferecer ajudar a refazer o desenho",
        feedback:
          "Pedro vê que você realmente se importa. Você demonstrou empatia ao reconhecer seus sentimentos e tentar corrigir o erro!",
        empatia: 9,
        emoji: "✅",
      },
      {
        id: "ignorar",
        texto: "Fingir que não ouve e ir embora",
        feedback:
          "Pedro fica ainda mais bravo e machucado. Ignorar alguém com raiva não resolve o problema.",
        empatia: 2,
        emoji: "⚠️",
      },
    ],
  },
];

export default function OucaOsSentimentos() {
  const [currentCenarioIndex, setCurrentCenarioIndex] = useState(0);
  const [selectedOpcao, setSelectedOpcao] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedCenarios, setCompletedCenarios] = useState<string[]>([]);
  const [totalEmpatia, setTotalEmpatia] = useState(0);

  const currentCenario = CENARIOS[currentCenarioIndex];
  const selectedOption = currentCenario.opcoes.find((o) => o.id === selectedOpcao);

  const handleSelectOpcao = (opcaoId: string) => {
    setSelectedOpcao(opcaoId);
    setShowFeedback(true);
  };

  const handleProxCenario = () => {
    if (selectedOption) {
      setTotalEmpatia(totalEmpatia + selectedOption.empatia);
      setCompletedCenarios([...completedCenarios, currentCenario.id]);
    }

    if (currentCenarioIndex < CENARIOS.length - 1) {
      setCurrentCenarioIndex(currentCenarioIndex + 1);
      setSelectedOpcao(null);
      setShowFeedback(false);
    }
  };

  const handleReiniciar = () => {
    setCurrentCenarioIndex(0);
    setSelectedOpcao(null);
    setShowFeedback(false);
    setCompletedCenarios([]);
    setTotalEmpatia(0);
  };

  const isGameComplete = completedCenarios.length === CENARIOS.length;
  const empatiaPercentual = Math.round((totalEmpatia / (CENARIOS.length * 10)) * 100);

  if (isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <CardTitle className="text-3xl">Parabéns!</CardTitle>
            <CardDescription className="text-lg mt-2">
              Você completou todos os cenários!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score */}
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Sua Pontuação de Empatia</p>
              <p className="text-5xl font-bold text-green-600">{empatiaPercentual}%</p>
              <p className="text-gray-700 mt-4">
                {empatiaPercentual >= 80
                  ? "🌟 Excelente! Você tem grande capacidade de empatia!"
                  : empatiaPercentual >= 60
                    ? "👍 Muito bom! Você está desenvolvendo bem sua empatia!"
                    : "💪 Bom começo! Continue praticando a empatia!"}
              </p>
            </div>

            {/* Reflection */}
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="font-semibold mb-3">Reflexão Final:</p>
              <p className="text-gray-700 mb-4">
                A empatia é a capacidade de entender e compartilhar os sentimentos de outras pessoas.
                Ao praticar a escuta ativa e reconhecer as emoções alheias, você cria conexões mais
                profundas e contribui para um mundo mais compassivo.
              </p>
              <p className="text-gray-700">
                Lembre-se: sempre há tempo para melhorar. Quanto mais você pratica a empatia, mais
                natural ela se torna!
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link href="/" className="flex-1">
                <Button className="w-full" variant="outline">
                  Voltar ao Menu
                </Button>
              </Link>
              <Button onClick={handleReiniciar} className="flex-1 bg-green-500 hover:bg-green-600">
                Jogar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-green-600">👂 Ouça os Sentimentos</h1>
          <div className="text-sm font-semibold text-gray-600">
            {completedCenarios.length + 1}/{CENARIOS.length}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-5xl mb-3">{currentCenario.emoji}</div>
                    <CardTitle className="text-2xl">{currentCenario.titulo}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {currentCenario.descricao}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Personagem</p>
                    <p className="text-lg font-semibold">{currentCenario.personagem}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scenario Context */}
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {currentCenario.contexto}
                  </p>
                </div>

                {/* Options */}
                {!showFeedback ? (
                  <div className="space-y-3">
                    <p className="font-semibold text-gray-800">O que você faria?</p>
                    {currentCenario.opcoes.map((opcao) => (
                      <button
                        key={opcao.id}
                        onClick={() => handleSelectOpcao(opcao.id)}
                        className="w-full p-4 rounded-lg border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 transition-all text-left"
                      >
                        <p className="font-semibold text-gray-800">{opcao.texto}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Selected Option */}
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <p className="font-semibold text-gray-800 mb-2">Sua escolha:</p>
                      <p className="text-gray-700">{selectedOption?.texto}</p>
                    </div>

                    {/* Feedback */}
                    <div
                      className={`rounded-lg p-4 border-l-4 ${
                        selectedOption!.empatia >= 8
                          ? "bg-green-50 border-green-500"
                          : selectedOption!.empatia >= 5
                            ? "bg-yellow-50 border-yellow-500"
                            : "bg-red-50 border-red-500"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{selectedOption?.emoji}</span>
                        <div>
                          <p className="font-semibold text-gray-800 mb-2">Feedback:</p>
                          <p className="text-gray-700">{selectedOption?.feedback}</p>
                        </div>
                      </div>
                    </div>

                    {/* Empathy Score */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">Pontuação de Empatia</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${(selectedOption!.empatia / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-blue-600">{selectedOption?.empatia}/10</span>
                      </div>
                    </div>

                    {/* Next Button */}
                    <Button
                      onClick={handleProxCenario}
                      className="w-full bg-green-500 hover:bg-green-600 gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {currentCenarioIndex === CENARIOS.length - 1
                        ? "Ver Resultado Final"
                        : "Próximo Cenário"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {CENARIOS.map((cenario, idx) => (
                    <div
                      key={cenario.id}
                      className={`p-3 rounded-lg text-sm font-semibold ${
                        completedCenarios.includes(cenario.id)
                          ? "bg-green-100 text-green-700"
                          : idx === currentCenarioIndex
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {completedCenarios.includes(cenario.id) ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-current"></div>
                        )}
                        {cenario.titulo}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-sm">💡 Dica de Empatia</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                Empatia significa se colocar no lugar do outro e entender seus sentimentos. Sempre
                ouça com atenção e mostre que você se importa!
              </CardContent>
            </Card>

            {/* Score */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pontuação Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {completedCenarios.length > 0
                    ? Math.round((totalEmpatia / (completedCenarios.length * 10)) * 100)
                    : 0}
                  %
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  {totalEmpatia}/{completedCenarios.length * 10} pontos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
