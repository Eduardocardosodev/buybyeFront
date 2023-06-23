import React, { FormEvent, useEffect, useState } from 'react';
import { createEvent, getEvents } from '../services/api';
import { EventCard } from '../components/Event';
import Button from '../components/Button';
import { EventDTO } from '../interfaces/EventDTO';
import { RegraDTO } from '../interfaces/Regra';
import { PremioDTO } from '../interfaces/Premio';

const HomePage = () => {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<EventDTO>({
    nome_evento: '',
    vlr_inscricao: '',
    qtd_inscricao_sorteio: null,
    data_hr_prova: '',
    regras: [{ id_evento: 0, qtd_corrida: null, soma_nivel: null }],
    premios: [{ id_evento: 0, posicao: null, premio: '' }],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Chame o serviço de criação de evento passando os dados do novo evento
    await createEvent(newEvent);

    // Atualize a lista de eventos chamando a função getEvents novamente
    const response = await getEvents();
    setEvents(response.data.event);

    // Limpe os campos do formulário e esconda o formulário
    setNewEvent({
      nome_evento: '',
      vlr_inscricao: '',
      qtd_inscricao_sorteio: null,
      data_hr_prova: '',
      regras: [{ id_evento: 0, qtd_corrida: null, soma_nivel: null }],
      premios: [{ id_evento: 0, posicao: null, premio: '' }],
    });
    setShowForm(false);
  };

  useEffect(() => {
    (async () => {
      const response = await getEvents();
      setEvents(response.data.event);
      setLoading(false);
    })();
  }, []);

  console.log(events);
  if (loading) {
    return <div>CAAREGANDO...</div>;
  }

  const addRegra = () => {
    const newRegra: RegraDTO = {
      id_evento: 0,
      qtd_corrida: 0,
      soma_nivel: 0,
    };
    setNewEvent({ ...newEvent, regras: [...newEvent.regras, newRegra] });
  };

  const addPremio = () => {
    const newPremio: PremioDTO = {
      id_evento: 0,
      posicao: 0,
      premio: '',
    };
    setNewEvent({ ...newEvent, premios: [...newEvent.premios, newPremio] });
  };

  const handleRegraChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedRegras = newEvent.regras.map((regra, i) => {
      if (i === index) {
        return { ...regra, [field]: value };
      }
      return regra;
    });
    setNewEvent({ ...newEvent, regras: updatedRegras });
  };

  const handlePremioChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedPremios = newEvent.premios.map((premio, i) => {
      if (i === index) {
        return { ...premio, [field]: value };
      }
      return premio;
    });
    setNewEvent({ ...newEvent, premios: updatedPremios });
  };

  const show = () => {
    if (showForm === true) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  return (
    <>
      <Button label="Criar Evento" onClick={() => show()} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: '20px',
        }}
      >
        {events.map((event: EventDTO) => (
          <EventCard key={event.id} evento={event} />
        ))}
      </div>

      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#f2f2f2',
              height: '500px',
              width: '400px',
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <form onSubmit={handleSubmit}>
              <h3 style={{ color: 'black' }}>Criar Evento</h3>
              <input
                type="text"
                value={newEvent.nome_evento}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, nome_evento: e.target.value })
                }
                placeholder="Nome do Evento"
                style={{ marginBottom: '10px', height: '25px' }}
              />
              <input
                type="text"
                value={newEvent.vlr_inscricao}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, vlr_inscricao: e.target.value })
                }
                placeholder="Valor da inscrição"
                style={{ marginBottom: '10px', height: '25px' }}
              />
              <input
                type="number"
                value={newEvent.qtd_inscricao_sorteio}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    qtd_inscricao_sorteio: parseInt(e.target.value),
                  })
                }
                placeholder="Quantidade de inscrição"
                style={{ marginBottom: '10px', height: '25px' }}
              />
              <input
                type="text"
                value={newEvent.data_hr_prova}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    data_hr_prova: e.target.value,
                  })
                }
                placeholder="Data e hora da prova"
                style={{ marginBottom: '10px', height: '25px' }}
              />

              <h3 style={{ color: 'black' }}>Regras</h3>
              {newEvent.regras.map((regra, index) => (
                <div key={index}>
                  <input
                    type="number"
                    value={regra.qtd_corrida}
                    onChange={(e) =>
                      handleRegraChange(
                        index,
                        'qtd_corrida',
                        parseInt(e.target.value)
                      )
                    }
                    placeholder="Quantidade de Corrida"
                    style={{ marginBottom: '10px', height: '25px' }}
                  />
                  <input
                    type="number"
                    value={regra.soma_nivel}
                    onChange={(e) =>
                      handleRegraChange(
                        index,
                        'soma_nivel',
                        parseInt(e.target.value)
                      )
                    }
                    placeholder="Soma do Nível"
                    style={{ marginBottom: '10px', height: '25px' }}
                  />
                </div>
              ))}
              <button type="button" onClick={addRegra}>
                Adicionar Regra
              </button>

              <h3 style={{ color: 'black' }}>Prêmios</h3>
              {newEvent.premios.map((premio, index) => (
                <div key={index}>
                  <input
                    type="number"
                    value={premio.posicao}
                    onChange={(e) =>
                      handlePremioChange(
                        index,
                        'posicao',
                        parseInt(e.target.value)
                      )
                    }
                    placeholder="Posição"
                    style={{ marginBottom: '10px', height: '25px' }}
                  />
                  <input
                    type="text"
                    value={premio.premio}
                    onChange={(e) =>
                      handlePremioChange(index, 'premio', e.target.value)
                    }
                    placeholder="Prêmio"
                    style={{ marginBottom: '10px', height: '25px' }}
                  />
                </div>
              ))}
              <button type="button" onClick={addPremio}>
                Adicionar Prêmio
              </button>
              <button type="submit">Criar Evento</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
