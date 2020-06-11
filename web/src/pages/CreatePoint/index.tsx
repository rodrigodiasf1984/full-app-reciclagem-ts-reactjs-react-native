import React,{useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import axios from 'axios';
import './styles.css';
import Dropzone from '../../components/Dropzone';

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
  const[selectedFile, setSelectedFile]=useState<File>();
  const[selectedPosition, setSelectedPosition]=useState<[number, number]>([0, 0]);
  const[intialPosition, setInitialPosition]=useState<[number, number]>([0, 0]);
  const[selectedItems, setSelectedItems]=useState<number[]>([]);
  const[formData, setFormData]=useState({
    name:'',
    email:'',
    whatsapp:'',
  });

  const history = useHistory();
  //busca a position
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position =>{
      const {latitude, longitude}=position.coords;
      console.log(position.coords);
      setInitialPosition([
        latitude, 
        longitude,
      ]);
    });
  },[]);

  //busca os item da api local
  useEffect(()=>{
     api.get('items').then(response =>{
       setItems(response.data);
     }) 
  },[])

  //busca os estados da api do IBGE
  useEffect(()=>{
    axios
      .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
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
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios?orderBy=nome`)
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

  function handleMapClick(e:LeafletMouseEvent){
    setSelectedPosition([
      e.latlng.lat,
      e.latlng.lng,
    ]);
  }

  function handleInputChange(e:ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSelectItem(id:number){
    const alreadySelected = selectedItems.findIndex(item => item === id );
    if(alreadySelected >= 0 ){
      //si já foi selecionado e clicou novamente remove do array
      const fielteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(fielteredItems);
    }else{
      //senão estiver já sido selecionado adiciona
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSubmit(e:FormEvent){
    e.preventDefault();
    const{name, whatsapp, email}=formData;
    const uf = selectedUF;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data  = new FormData();
      data.append('name',name); 
      data.append('email',email);
      data.append('whatsapp',whatsapp);
      data.append('uf',uf);
      data.append('city',city);
      data.append('latitude',String(latitude)); 
      data.append('longitude',String(longitude));
      data.append('items',items.join(','));
      
      if(selectedFile){
        data.append('image', selectedFile);
      }
    
    const response = await api.post('points', data);
    console.log(response);
    if(response.status===200){
      alert('Ponto de coleta adicionado com sucesso');
      history.push('/');
    }else{
      alert('Erro ao adicionar o ponto de coleta, verifique os dados digitados');
    }

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
     <form onSubmit={handleSubmit}>
       <h1>Cadastro do <br/> ponto de coleta </h1>
        <Dropzone onFileUploaded={setSelectedFile}/>
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

          <Map center={intialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition}/>
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
            <li 
              key={item.id} 
              onClick={() => handleSelectItem(item.id)}
              className={selectedItems.includes(item.id) ? 'selected' : ''}
            >                
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