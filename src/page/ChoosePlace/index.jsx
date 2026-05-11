import { useState } from "react";
import LabelComp from '/src/component/LabelComp'
import styles from './ChoosePlace.module.css'
import { useNavigate } from "react-router-dom";

const ChoosePlace = () => {

    const navigate = useNavigate()

    const [ placeChoosed, setPlaceChoosed ] = useState({})
    const place_list = [
        {
            'id': 1,
            'description' : 'Retirar no local'
        }, {
            'id' : 2,
            'description' : 'Entregar'
        }
    ]


    const handleChoosePlace = ( id ) => {
        let data = {
            'id_place_form' : id
        }
        //console.log( " data: ", data)
        if( !place_list.some( place => place.id === id )) {
            return
        }
        navigate('/choose-payment', { state: data })
        


    }

    return (
        <div>
            <LabelComp
                text={"Selecione a forma do pedido"}
            />

            <div
                className={styles.ListPlaceDiv}
            >
                <ul
                    className={styles.ListPlace}
                >
                    { place_list.map((item, i) => (
                        <li
                            key={i}
                            onClick={ (e) => (
                                handleChoosePlace( item.id )
                            )}
                        >
                            {item.description}
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    );
}


export default ChoosePlace;