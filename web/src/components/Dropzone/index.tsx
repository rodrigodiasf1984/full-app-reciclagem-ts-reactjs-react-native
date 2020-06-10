import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Container} from './styles';
import {FiUpload} from 'react-icons/fi';

const Dropzone = () => {
  const[selectedFileUrl, setSelectedFileUrl]= useState('');  
    // Do something with the files  
  const onDrop = useCallback(acceptedFiles =>{
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);  
    setSelectedFileUrl(fileUrl);
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept:'image/*'
  })

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />            
        {
          selectedFileUrl ? 
          (<img src={selectedFileUrl} alt="Imagem Preview"/> ) 
          : (
            <p>
              <FiUpload/> 
              Imagem do ponto de coleta
            </p> 
          )
        }               
        
    </Container>
  )
}

export default Dropzone;