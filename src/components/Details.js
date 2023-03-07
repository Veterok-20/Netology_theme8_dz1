import React from 'react';


export default function Details(props) {
    const { obj, loading } = props;
    let obj1 = { ...obj };
    let part2 = { ...obj1.details };
    delete obj1.details;
    let arr1 = Object.keys(obj1).map((key) => [key, obj1[key]]);
    let arr2 = Object.keys(part2).map((key) => [key, part2[key]]);
    let objforview = arr1.concat(arr2);
    [objforview[1], objforview[2]] = [objforview[2], objforview[1]]

    let style = {
        backgroundImage: `url(${objforview[1][1]})`,
        backgroundClip: 'border-box',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }
    if (loading) { return (<div>Loading...</div>) }
    else {
        return (
            <table className='table'>
                <tbody>
                    <tr>
                        <td className='cell-for-img' style={style}></td>
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
    }


}