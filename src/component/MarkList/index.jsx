
import { useEffect, useState } from 'react';
import styles from './MarkList.module.css';
const MarkList = ({ list = [], nameClass='', setContentSelected = undefined }) => {
    if( nameClass ) {
        nameClass = ' ' + nameClass
    }

    const [ listLineSelected, setListLineSelected ] = useState([])

    const completeClassName = styles.markList + nameClass

    const handleCheckboxMarked = ( position ) => {
        handleSelectLine( position )
    }

    const handleSelectLine = ( position ) => {
        let tmpSelectList = [ ...listLineSelected ]

        for( let i = 0; i < tmpSelectList.length; i ++ ){
            //console.log(" listLineSelected: ", listLineSelected, position)
            
            if( i == position ) {
                if( tmpSelectList[i] === false ) {
                    tmpSelectList[i] = true

                    if( setContentSelected ) {
                        setContentSelected( position )
                    }
                    
                }
                else {
                    tmpSelectList[i] = false
                }

            }
            else {
                tmpSelectList[i] = false
            }
        }

        setListLineSelected( tmpSelectList )


    }



    useEffect(() => {
        let tmpList = []

        for( let i = 0; i < list.length; i ++ ) {
            tmpList.push(false)
        }
        
        setListLineSelected( tmpList )
 
    }, [list])


    useEffect(() => {
        
    }, [listLineSelected])

    return (
        <ul className={ completeClassName }>
            { list && (list.map((item, i) => (
                <li
                    key={i}
                    onDoubleClick={ () => (
                        handleSelectLine( i )
                    )}

                    className={ listLineSelected[i] === true ? styles.lineSelected : ''}
                >
                    <input
                        type={'checkbox'}
                        checked={ listLineSelected[i] ? true : false }
                        onChange={ () => (
                            handleCheckboxMarked( i )
                        )}
                    />
                    <label>
                        {item}
                    </label>

                </li>
            )))}
        </ul>
    )
}

export default MarkList;