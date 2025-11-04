import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface EmocaoRegistro {
  data: string;
  emocao: string;
  intensidade: number;
  motivo?: string;
}

const EMOCOES = [
  { nome: "Feliz", emoji: "😊", cor: "bg-yellow-100 border-yellow-400" },
  { nome: "Triste", emoji: "😢", cor: "bg-blue-100 border-blue-400" },
  { nome: "Ansioso", emoji: "😰", cor: "bg-purple-100 border-purple-400" },
  { nome: "Raiva", emoji: "😠", cor: "bg-red-100 border-red-400" },
  { nome: "Calmo", emoji: "😌", cor: "bg-green-100 border-green-400" },
  { nome: "Confuso", emoji: "😕", cor: "bg-orange-100 border-orange-400" },
];

export default function CalendarioEmocional() {
  const [emocoes, setEmocoes] = useState<EmocaoRegistro[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedEmocao, setSelectedEmocao] = useState<string>("");
  const [intensidade, setIntensidade] = useState<number>(5);
  const [motivo, setMotivo] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("emocoes");
    if (saved) {
      setEmocoes(JSON.parse(saved));
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem("emocoes", JSON.stringify(emocoes));
  }, [emocoes]);

  const handleRegistrarEmocao = () => {
    if (!selectedEmocao) return;

    const novaEmocao: EmocaoRegistro = {
      data: selectedDate,
      emocao: selectedEmocao,
      intensidade,
      motivo: motivo || undefined,
    };

    const index = emocoes.findIndex((e) => e.data === selectedDate);
    if (index >= 0) {
      const updated = [...emocoes];
      updated[index] = novaEmocao;
      setEmocoes(updated);
    } else {
      setEmocoes([...emocoes, novaEmocao]);
    }

    // Reset form
    setSelectedEmocao("");
    setIntensidade(5);
    setMotivo("");
  };

  const getEmocaoForDate = (date: string) => {
    return emocoes.find((e) => e.data === date);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const emocao = getEmocaoForDate(dateStr);
      const emocaoInfo = emocao ? EMOCOES.find((e) => e.nome === emocao.emocao) : null;

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`p-3 rounded-lg border-2 text-center transition-all ${
            selectedDate === dateStr ? "ring-2 ring-purple-500" : ""
          } ${emocaoInfo ? emocaoInfo.cor : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
        >
          <div className="text-sm font-semibold">{day}</div>
          {emocao && <div className="text-lg">{emocaoInfo?.emoji}</div>}
        </button>
      );
    }

    return days;
  };

  const selectedEmocaoInfo = EMOCOES.find((e) => e.nome === selectedEmocao);
  const emocaoHoje = getEmocaoForDate(selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-red-600">❤️ Calendário Emocional</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                    </CardTitle>
                    <CardDescription>Clique em um dia para registrar sua emoção</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    >
                      ←
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date())}
                    >
                      Hoje
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    >
                      →
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

                {/* Legend */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-semibold mb-3">Legenda de Emoções:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {EMOCOES.map((e) => (
                      <div key={e.nome} className="flex items-center gap-2 text-sm">
                        <span className="text-lg">{e.emoji}</span>
                        <span>{e.nome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emotion Selector */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {new Date(selectedDate).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-3">Como você se sentiu?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {EMOCOES.map((e) => (
                      <button
                        key={e.nome}
                        onClick={() => setSelectedEmocao(e.nome)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          selectedEmocao === e.nome
                            ? "ring-2 ring-purple-500 " + e.cor
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <div className="text-2xl">{e.emoji}</div>
                        <div className="text-xs font-semibold mt-1">{e.nome}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedEmocao && (
                  <>
                    <div>
                      <label className="text-sm font-semibold block mb-2">
                        Intensidade: {intensidade}/10
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={intensidade}
                        onChange={(e) => setIntensidade(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold block mb-2">
                        Por que você se sentiu assim? (opcional)
                      </label>
                      <textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Descreva o que causou essa emoção..."
                        className="w-full p-2 border rounded-lg text-sm"
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={handleRegistrarEmocao}
                      className="w-full bg-red-500 hover:bg-red-600"
                    >
                      Registrar Emoção
                    </Button>
                  </>
                )}

                {emocaoHoje && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Ver Registro de Hoje
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Seu Registro Emocional</DialogTitle>
                        <DialogDescription>
                          {new Date(selectedDate).toLocaleDateString("pt-BR")}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold">Emoção:</p>
                          <p className="text-lg">
                            {EMOCOES.find((e) => e.nome === emocaoHoje.emocao)?.emoji} {emocaoHoje.emocao}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Intensidade:</p>
                          <p>{emocaoHoje.intensidade}/10</p>
                        </div>
                        {emocaoHoje.motivo && (
                          <div>
                            <p className="text-sm font-semibold">Motivo:</p>
                            <p>{emocaoHoje.motivo}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-sm">💡 Dica</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                Registre suas emoções diariamente para entender melhor seus padrões emocionais e como você reage a diferentes situações.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
