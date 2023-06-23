import { Container } from '../styles/EventComponentStyles';

interface EventDTO {
  id: number;
  nome_evento: string;
  vlr_inscricao: string;
  qtd_inscricao_sorteio: number;
  data_hr_prova: string;
  regras: {
    id: number;
    id_evento: number;
    qtd_corrida: number;
    soma_nivel: number;
  }[];
  premios: {
    id: number;
    id_evento: number;
    posicao: number;
    premio: string;
  }[];
}
export const EventCard = ({ evento }: { evento: EventDTO }) => {
  const {
    nome_evento,
    vlr_inscricao,
    qtd_inscricao_sorteio,
    data_hr_prova,
    regras,
    premios,
  } = evento;

  return (
    <Container>
      <h3>{nome_evento}</h3>
      <p>Valor de Inscrição: R$ {parseFloat(vlr_inscricao).toFixed(2)}</p>
      <p>Quantidade de Inscrições para Sorteio: {qtd_inscricao_sorteio}</p>
      <p>Data da Prova: {new Date(data_hr_prova).toLocaleString()}</p>

      <h4>Regras:</h4>
      <ul>
        {regras.map((regra, index) => (
          <li key={index}>
            Qtd. de Corridas: {regra.qtd_corrida}, Soma do Nível:
            {regra.soma_nivel}
          </li>
        ))}
      </ul>

      <h4>Prêmios:</h4>
      <ul>
        {premios.map((premio, index) => (
          <li key={index}>
            Posição: {premio.posicao}, Prêmio: {premio.premio}
          </li>
        ))}
      </ul>
    </Container>
  );
};
