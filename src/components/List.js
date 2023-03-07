import React from 'react';


export default function List(props) {
    const { data, onClick } = props;      

    return (     
        <table className='table'>
        <tbody>  
            {  
            data.map((item)=> {
                return (
                    <tr key={item.id}>
                    <td className='table-cells' 
                        onClick={(e) => onClick(e, item.id)}
                        style={{backgroundColor: item.active?'blue':null,
                                color: item.active?'white':'black'}}>{item.name}</td>
                </tr>
                )
            })                     
           
}          
        </tbody>
    </table>
    )
}