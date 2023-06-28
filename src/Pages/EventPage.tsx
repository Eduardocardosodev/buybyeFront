import { useEffect, useState, FormEvent } from 'react';
import { getEvent, subscribe } from '../services/api';
import { useParams } from 'react-router-dom';
import { EventDTO } from '../interfaces/EventDTO';
import Button from '../components/Button';
import { SubscribeDTO } from '../interfaces/SubscribeDTO';
import ButtonBack from '../components/ButtonBack';

const EventPage = () => {
  const { id } = useParams();

  const [event, setEvent] = useState<EventDTO>();
  const [loading, setLoading] = useState<boolean>(true);
  const [subs, setSubs] = useState<SubscribeDTO>({
    escolha: '',
    qtd_inscricao: undefined,
    id_evento: Number(id),
  });

  const handleSub = async (e: FormEvent) => {
    e.preventDefault();

    console.log(subs);

    await subscribe(subs);
  };

  useEffect(() => {
    (async () => {
      const response = await getEvent(Number(id));
      setEvent(response.data.event);
      console.log(response.data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <p>CARREGANDO...</p>;
  }

  return (
    <div className="event-page">
      <ButtonBack label="Voltar" />
      <p className="event-name">{event?.nome_evento}</p>
      <p>{event?.qtd_inscricao_sorteio}</p>
      <p>{event?.vlr_inscricao}</p>

      <h3>Premios:</h3>
      {event?.premios &&
        event.premios.map((premio) => (
          <div key={premio.id}>
            <p>{premio.posicao}</p>
            <p>{premio.premio}</p>
          </div>
        ))}
      <h3>Regras:</h3>
      {event?.regras &&
        event.regras.map((regras) => (
          <div key={regras.id}>
            <p>{regras.qtd_corrida}</p>
            <p>{regras.soma_nivel}</p>
          </div>
        ))}

      <form className="subscription-form" method="post" onSubmit={handleSub}>
        <label>Gostaria de correr aonde?</label>
        <select
          value={subs.escolha}
          onChange={(event) =>
            setSubs({ ...subs, escolha: event.target.value })
          }
        >
          <option>Selecione</option>
          <option value="cabeca">Cabeca</option>
          <option value="pe">Pe</option>
        </select>

        <label>Gostaria de fazer quantas inscrições?</label>
        <input
          type="number"
          value={subs.qtd_inscricao !== undefined ? subs.qtd_inscricao : ''}
          onChange={(event) =>
            setSubs({ ...subs, qtd_inscricao: Number(event.target.value) })
          }
        />
        <Button label="Me inscrever" />
      </form>
    </div>
  );
};

export default EventPage;
