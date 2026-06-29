import { useEffect, useState } from 'react';
import styles from './ManagePromotionDiscount.module.css';
import LabelComp from '/src/component/LabelComp';
import ButtonComp from '/src/component/ButtonComp';
import getPromotionData from '../../../function/Data/Get/getPromotionData';
import alterPromotionDiscount from '../../../function/Data/Set/alterPromotionDiscount';
import createPromotionDiscount from '../../../function/Data/Set/createPromotionDiscount';

const ManagePromotionDiscount = () => {

    const [ promotionList, setPromotionList ] = useState([]);

    const [ showPromotionDiscountList, setShowPromotionDiscountList ] = useState( true );
    const [ showEditPromotionDiscount, setShowEditPromotionDiscount ] = useState( false );
    const [ showCreatePromotionDiscount, setShowCreatePromotionDiscount ] = useState( false );
    const [ listInative, setListInative ] = useState( false );

    
    const [ discountData, setDiscountData ] = useState(undefined);
    const [ discountId, setDiscountId ] = useState('');
    const [ discountCode, setDiscountCode ] = useState('');
    const [ discountStatus, setDiscountStatus ] = useState( true )
    const [ discountValue, setDiscountValue ] = useState( 0 )
    const [ discountType, setDiscountType ] = useState( 0 )
    const [ discountSimbol, setDiscountSimbol ] = useState('%')


    const handleResetValues = () => {
        setDiscountData(undefined)
        setDiscountId('')
        setDiscountCode('')
        setDiscountStatus(true)
        setDiscountValue(0)
        setDiscountType(0)
        setDiscountSimbol('%')
    }

    const getPromotionListData = async () => {
        const response = await getPromotionData( '',  listInative);
        if( response ) {
            setPromotionList( response )
        }

        //console.log(" promotion list: ", response)

        return response
    }

    const handleChooseDiscountCode = ( discountValues ) => {
        setDiscountData( discountValues )
        setDiscountCode( discountValues.code )
        setDiscountId( discountValues.promotionId )
        
        if( discountValues.percentage ) {
            setDiscountType( 0 )
            setDiscountValue( discountValues.percentage)
            setDiscountSimbol("%")
        }

        else {
            setDiscountType( 1 )
            setDiscountValue( discountValues.moneyDiscount )
            setDiscountSimbol("R$")
        }
        try {
            if ( discountValues.status === true ||  discountValues.status === false ) {
                setDiscountStatus( discountValues.status )
            }
            else {
                setDiscountStatus( true )
            }
        } catch {
            setDiscountStatus( true )
        }
        
        setShowPromotionDiscountList( false )
        setShowEditPromotionDiscount( true )
    }

    const handleSaveDiscountAlteration = async () => {
        const confirmWindow = confirm(" Deseja realmente realizar a alteração no cupom de desconto?")
        if( !confirmWindow ) {
            return
        }


        await alterPromotionDiscount( discountId, discountCode, discountStatus, discountType, discountValue )

        handleResetValues()
        setShowEditPromotionDiscount( false )
        setShowPromotionDiscountList( true )
    }

    const handleCancelAlteration = () => {
        handleResetValues()
        setShowEditPromotionDiscount( false )
        setShowPromotionDiscountList( true )
    }

    const handleCancelCreation = () => {
        handleResetValues()

        setShowCreatePromotionDiscount( false )
        setShowPromotionDiscountList( true )
    }
    const handleCreatePromotionDiscount = async () => {

        if( !discountCode ) {
            alert("Preencha o codigo do cupom!")
            return
        }

        if( !discountValue ) {
            alert("Preencha o valor do cupom!")
            return
        }


        const confirmWindow = confirm("Deseja realmente criar um novo cupom de desconto?")
        if( !confirmWindow ) {
            return
        }

        await createPromotionDiscount( discountCode, discountStatus, discountType, discountValue )
        handleResetValues()
        setShowCreatePromotionDiscount( false )
        setShowPromotionDiscountList( true )
    }

    const handleShowCreatePromotionDiscount = () => {
        setShowPromotionDiscountList( false )
        setShowCreatePromotionDiscount( true )
    }

    useEffect(() => {
        getPromotionListData( )
    }, [])

    useEffect(() => {
        if( !showPromotionDiscountList ) {
            return
        }

        getPromotionListData( )
    }, [ showPromotionDiscountList, listInative ])

    return( 
        <div className={styles.promotionMainDiv}>
            <LabelComp
                text={'Gerenciar promoções'}
            />

            <div className={styles.promotionDiv}>
                { showPromotionDiscountList && (
                    <>
                        { promotionList.length > 0 && (
                            <ul className={ styles.promotionList}>
                                { promotionList.map((item, index) => (
                                        <li
                                            key={index}
                                            className={ !item.status ? styles.inativePromotion : ''}
                                            onClick={ () => handleChooseDiscountCode( item ) }
                                        >
                                            Codigo: {item.code} <br />
                                            Valor do desconto: { item.percentage ? `%${item.percentage}` : `R$${item.moneyDiscount}`}
                                        </li>
                                    ))
                                }
                            </ul>
                        )}

                        { !promotionList.length && (
                            <div className={ styles.promotionListEmpty}>
                                <LabelComp
                                    text={"Nenhum cupom de desconto encontrado."}
                                />
                            </div>
                        )}

                        <div className={ styles.bottomButtonDiv}>
                            <ButtonComp
                                text={"Novo"}
                                onClickButton={ handleShowCreatePromotionDiscount }
                            />

                            <div>
                                <label>
                                    Listar inativos
                                </label>
                                <input
                                    type={'checkbox'}
                                    checked={ listInative }
                                    onClick={ () => (
                                        setListInative( listInative ? false : true )
                                    )}
                                />
                            </div>
                        </div>
                    </>
                )}
                
                { showCreatePromotionDiscount && (
                    <>
                        <div className={ styles.createPromotionDiv }>
                            <div>
                                <label> Codigo: </label>
                                <input
                                    value={ discountCode }
                                    onChange={(e) => setDiscountCode(e.target.value )}
                                />
                            </div>
                            <div>
                                <label> Status: </label>
                                <select
                                    value={ discountStatus }
                                    onChange={(e) => setDiscountStatus(e.target.value )}
                                >
                                    <option value={true}> Ativo </option>
                                    <option value={false}> Inativo </option>
                                </select>
                            </div>
                            <div>
                                <label> Tipo de desconto: </label>
                                <select
                                    value={ discountType }
                                    onChange={(e) => {
                                        setDiscountType( Number(e.target.value) );
                                        if( e.target.value == 1 ) {
                                            setDiscountSimbol('R$');
                                        }
                                        else if( e.target.value == 0) {
                                            setDiscountSimbol('%');
                                        }

                                    }}
                                >
                                    <option value={0}> Porcentagem </option>
                                    <option value={1}> Dinheiro </option>
                                </select>
                            </div>
                            
                            <div>
                                <label> Valor: { discountSimbol }</label>
                                <input
                                    value={discountValue}
                                    onChange={ (e) => setDiscountValue( e.target.value.trim())}
                                />
                            </div>
                            <div className={ styles.bottomButtonDiv}>
                                <ButtonComp
                                    text={"criar"}
                                    onClickButton={ handleCreatePromotionDiscount }
                                />
                                <ButtonComp
                                    text={"Cancelar"}
                                    onClickButton={ handleCancelCreation }
                                />
                            </div>
                        </div>
                    </>
                )}

                { showEditPromotionDiscount && (
                    <>
                        <div className={ styles.editPromotionDiscountDiv }>
                            <div>
                                <label> ID: </label>
                                <input
                                    value={ discountId }
                                    readOnly={true}
                                />
                            </div>
                            <div>
                                <label> Codigo: </label>
                                <input
                                    value={ discountCode }
                                    onChange={(e) => setDiscountCode(e.target.value )}
                                />
                            </div>
                            <div>
                                <label> Status: </label>
                                <select
                                    value={ discountStatus }
                                    onChange={(e) => setDiscountStatus(e.target.value )}
                                >
                                    <option value={true}> Ativo </option>
                                    <option value={false}> Inativo </option>
                                </select>
                            </div>
                            <div>
                                <label> Tipo de desconto: </label>
                                <select
                                    value={ discountType }
                                    onChange={(e) => {
                                        setDiscountType( Number(e.target.value) );
                                        if( e.target.value == 1 ) {
                                            setDiscountSimbol('R$');
                                        }
                                        else if( e.target.value == 0) {
                                            setDiscountSimbol('%');
                                        }

                                    }}
                                >
                                    <option value={0}> Porcentagem </option>
                                    <option value={1}> Dinheiro </option>
                                </select>
                            </div>
                            
                            <div>
                                <label> Valor: { discountSimbol }</label>
                                <input
                                    value={discountValue}
                                    onChange={ (e) => setDiscountValue( e.target.value.trim())}
                                />
                            </div>

                            <div className={ styles.bottomButtonDiv}>
                                <ButtonComp
                                    text={"Salvar"}
                                    onClickButton={ handleSaveDiscountAlteration }
                                />
                                <ButtonComp
                                    text={"Cancelar"}
                                    onClickButton={ handleCancelAlteration }
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}


export default ManagePromotionDiscount;