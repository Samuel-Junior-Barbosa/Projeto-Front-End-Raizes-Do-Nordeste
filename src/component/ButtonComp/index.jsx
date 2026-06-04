

import { useEffect, useState } from 'react';
import styles from './ButtonComp.module.css';
import { useSearchParams } from 'react-router-dom';

const ButtonComp = ({text='', onClickButton=null, icon = null, nameClass = '', urlImage=undefined, idValue=''}) => {


    return (
        <button
            onClick = {onClickButton ? onClickButton : undefined}
            className={styles.ButtonCompMainDiv + ' ' + nameClass}
            id={idValue}
            style={{
                backgroundImage: `url(${urlImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            { icon && (
                <img
                    src={icon}
                    
                />
            )}
            { text && (
                
                <label
                >
                    {text}
                </label>
            
                
            )}


        </button>
    )
};


export default ButtonComp;