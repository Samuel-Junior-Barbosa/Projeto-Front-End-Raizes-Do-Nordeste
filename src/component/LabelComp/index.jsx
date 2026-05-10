import styles from './LabelComp.module.css'

const LabelComp = ({text, nameClass=''}) => {
    return (
        <label
            className={styles.labelDiv + ' ' + nameClass}>
            {text}
        </label>
    )
}


export default LabelComp;