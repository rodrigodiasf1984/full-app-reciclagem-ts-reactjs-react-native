import React,{useEffect, useState, ChangeEvent} from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import axios from 'axios';
import './styles.css';

// Quando criar um estado para um object ou array é preciso informar o tipo, use interface

interface Item{
  id:number;
  title:string;
  image_url:string;
}

interface IBGEUFResponse {
  sigla:string;
}

interface IBGECityResponse {
  nome:string;
}

const CreatePoint = () => {
  const[items, setItems]=useState<Item[]>([]);  
  const[ufs, setUfs]=useState<string[]>([]);  
  const[cities, setCities]=useState<string[]>([]);
  const[selectedUF, setSelectedUF]=useState('0');
  const[selectedCity, setSelectedCity]=useState('0');

  //busca os item da api local
  useEffect(()=>{
     api.get('items').then(response =>{
       setItems(response.data);
     }) 
  },[])

  //busca os estados da api do IBGE
  useEffect(()=>{
    axios
      .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response =>{
        const ufInitials=response.data.map(uf => uf.sigla); 
        setUfs(ufInitials);      
      });
  },[]);

  useEffect(()=>{
    
    if(selectedUF === '0'){
      return;
    }
    //carrega as cidades toda vezes que o utilizador escolher um estado
    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(response =>{
       const cityNames = response.data.map(city => city.nome);
       setCities(cityNames);
      });
  },[selectedUF]);

  function handleSelectedUF(e:ChangeEvent<HTMLSelectElement> ){
    setSelectedUF(e.target.value);    
  }

  function handleSelectedCity(e:ChangeEvent<HTMLSelectElement>){
    setSelectedCity(e.target.value);
  }

  function handleInputChange(){
    
  }
  return(
   <div id="page-create-point">
     <header>
       <img src={logo} alt="Ecoleta"/>
       <Link to="/">
         <FiArrowLeft/>
         Voltar para home
       </Link>
     </header>
     <form>
       <h1>Cadastro do <br/> ponto de coleta </h1>
       <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

       <fieldset>
         <legend>
           <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
         </legend>

          <Map center={[38.6560185, -9.0633101]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[38.6560185, -9.0633101]}/>
          </Map>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select 
                  onChange={handleSelectedUF} 
                  name="uf" 
                  id="uf" 
                  value={selectedUF}
                >
                  <option value="0">Selecione um Estado </option>
                  {ufs.map(uf => (
                    <option key ={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
         
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select 
                  onChange={handleSelectedCity} 
                  name="city" 
                  id="city" 
                  value={selectedCity}
                >
                  <option value="0">Selecione uma cidade </option>
                  {cities.map(city => (
                    <option key ={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
       </fieldset>

       <fieldset>
         <legend>
           <h2>Ítens de coleta</h2>
           <span>Selecione um ou mais ítens abaixo</span>
         </legend>

         <ul className="items-grid">
           {items.map(item =>( 
            <li key={item.id}>
                <img src={item.image_url} alt={item.title}/>
                <span>{item.title}</span>
              </li>))}           
         </ul>
        
       </fieldset>
       <button type="submit">Cadastrar ponto de coleta</button>
     </form>
   </div>
  );
}

export default CreatePoint;