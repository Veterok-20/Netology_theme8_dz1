import { autocompleteClasses } from '@mui/material';
import React from 'react';


export default function Details(props) {
    console.log('from details props=', props);
    const { obj } = props;
    let obj1 = { ...obj };

    // if (obj) {
        let part2 = { ...obj1.details };
        delete obj1.details;
        let arr1 = Object.keys(obj1).map((key) => [key, obj1[key]]);
        let arr2 = Object.keys(part2).map((key) => [key, part2[key]]);
        let objforview = arr1.concat(arr2);
        [objforview[1], objforview[2]] = [objforview[2], objforview[1]]
        console.log("objforview=", objforview);

        let style = {
            backgroundImage: `url(${objforview[1][1]})`,
            backgroundClip: 'border-box',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }

        // if (loading) {
            return (
                <table className='table'>
                    <tbody>
                        <tr>
                            <td className='cell-for-img' style={style}>
                                {/* <img className='img' src={objforview[1][1]} width="100%" height="100%"></img> */}
                            </td>
                        </tr>
                        {
                            objforview.map((item, index) => {
                                if (index > 1) {
                                    return (
                                        <tr key={index}>
                                            <td className='table-cells'>{item[1]}</td>
                                        </tr>
                                    )
                                }
                                else { return null }
                            })
                        }
                    </tbody>
                </table>
            )
        // }
    // }
    // else { return <div>Loading...</div> }

}