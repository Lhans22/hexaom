
import { Table } from "antd";

 function TableContact  (props:any){
  


  
      

     
    const columns = [
        {
          title: 'nom',
          dataIndex: 'nom',
          key: 'nom',
        },
        {
            title: 'prenom',
            dataIndex: 'prenom',
            key: 'prenom',
        },
        {
          title: 'telephone',
          dataIndex: 'telephone',
          key: 'telephone',
        },
        {
          title: 'mail',
          dataIndex: 'mail',
          key: 'mail',
        },
        {
            title: 'ville',
            dataIndex: 'ville',
            key: 'ville',
        },
      ];
      
        return <><Table columns={columns} dataSource={props.data} rowKey={"id"}/></>;
        
      

      

  }
  export default TableContact