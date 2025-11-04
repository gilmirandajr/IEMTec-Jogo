import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccessibilityInfo() {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertCircle className="w-5 h-5 text-blue-600" aria-hidden="true" />
          Recursos de Acessibilidade
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-700 space-y-2">
        <p>
          <strong>Navegação por Teclado:</strong> Use Tab para navegar entre elementos e Enter para
          ativar botões.
        </p>
        <p>
          <strong>Leitores de Tela:</strong> Este jogo é compatível com leitores de tela como NVDA
          e JAWS.
        </p>
        <p>
          <strong>Contraste:</strong> O jogo usa cores com alto contraste para melhor legibilidade.
        </p>
        <p>
          <strong>Tamanho de Fonte:</strong> Você pode ajustar o tamanho da fonte no seu navegador
          (Ctrl + ou Cmd +).
        </p>
      </CardContent>
    </Card>
  );
}
