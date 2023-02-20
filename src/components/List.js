import React from 'react';


export default function List(props) {
    const { data, onClick } = props;  
    console.log('from list data=', data);

    return (
        <table className='table' style={{width: "30%", height: 'auto'}}>
            <tbody>
            {
                data.map((obj) => {                            
                <tr key={obj.id}>
                    <td className='table-cells' onClick={(e) => onClick(e, obj.id)}>{obj.name}</td>
                </tr>
                })
            }
            </tbody>
        </table>
    )
}