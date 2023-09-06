import  { useEffect, useState } from 'react';

import '../App.css';
import TableContact from '../components/table/tablecontact';
import HttpService from '../services/HttpService';
import DrowerForm from '../components/drower/FormDrower';

function App () { 
  const [data,setData] = useState<any[]>([]);
  useEffect(()=>{
    HttpService.get(urlApi+"contacts").then((d)=>{setData(d)});
  },[]);



  const handleAdd=(info :any )=>{
    HttpService.post(urlApi+"contact",info).then((responce)=>{
           // debugger;
            if(responce.id){
            
                setData([...data,responce]);
                //setVisibleSuccess(true);
            }else{
                //setVisibleError(true);
            }

        }
    );

}
  const champs =[
  {
    "input":"nom",
    "label":"nom"
  },
  {
    "input":"prenom",
    "label":"prénom"
  },
  {
    "input":"mail",
    "label":"email"
  },
  {
    "input":"telephone",
    "label":"téléphone"
  },
  {
    "input":"ville",
    "label":"code postal et ville"
  },
  ];

  

    return(<>
    <div className="contactHeader">
        <h1>Contacts</h1>
        <p>{data.length} contacts</p>
        <DrowerForm champs={champs} submitCall={(info:any)=>handleAdd(info)} title="Create a new account">+ Contact</DrowerForm>
    </div>
    <TableContact data={data}/>
    </>
    );
}

export default App;
export const urlApi:string= 'http://127.0.0.1:8000/api/';