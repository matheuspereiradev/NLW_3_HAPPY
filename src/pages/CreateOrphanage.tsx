import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';

import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet'

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";

import mapIcon from '../utils/mapIcon'
import api from "../services/api";

export default function CreateOrphanage() {

  const [latitudeLongitude, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [nome, setNome] = useState('');
  const [sobre, setSobre] = useState('');
  const [instrucoes, setInstrucoes] = useState('');
  const [abre_as, setHorario] = useState('');
  const [aberto_final_semana, setAbreFinalDeSemana] = useState(true);
  const [imagens, setImagens] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<string[]>([]);

  function mapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  

  function handleSelectImages(event:ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const imagem = Array.from(event.target.files);
    setImagens(imagem)

    const imgPreview = imagem.map(img=>{
      return URL.createObjectURL(img)
    })

    setPreviewImg(imgPreview)
  }

  async function handleSubmit(event: FormEvent) {
    
   // const history = useHistory();
    event.preventDefault();//nao deixa o padrao
    const { latitude, longitude } = latitudeLongitude;

    const dados = new FormData();
    dados.append('nome',nome)
    dados.append('sobre',sobre)
    dados.append('instrucoes',instrucoes)
    dados.append('aberto_final_semana', String(aberto_final_semana))
    dados.append('abre_as', abre_as)
    dados.append('latitude', String(latitude))
    dados.append('longitude', String(longitude))

    imagens.forEach(img =>{
      dados.append('images',img)
    })

    try{
      await api.post('orfanatos', dados)

      alert('Enviou')

      
     // history.push('/')
    }catch(e){
      alert('deu ruim')
    }

    

  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-7.2281782, -39.3309997]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={mapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TOKENMAPBOX}`}
              />
              {latitudeLongitude.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[
                    latitudeLongitude.latitude,
                    latitudeLongitude.longitude
                  ]} />
              )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={nome}
                onChange={
                  event => {
                    setNome(event.target.value)
                  }
                } />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={sobre}
                onChange={
                  event => {
                    setSobre(event.target.value)
                  }
                }

              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImg.map(imag=>{
                  return(
                      <img key={imag} src={imag} alt={nome} />
                 
                    
                  )
                })}

                <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
            <input multiple onChange={handleSelectImages} type="file" id="images[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instrucoes}
                onChange={
                  event => {
                    setInstrucoes(event.target.value)
                  }
                }
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário</label>
              <input
                id="opening_hours"
                value={abre_as}
                onChange={
                  event => {
                    setHorario(event.target.value)
                  }
                }
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={aberto_final_semana ? ("active") : ("")} onClick={() => { setAbreFinalDeSemana(true) }}>Sim</button>
                <button type="button" className={!aberto_final_semana ? ("active") : ("")} onClick={() => { setAbreFinalDeSemana(false) }}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
