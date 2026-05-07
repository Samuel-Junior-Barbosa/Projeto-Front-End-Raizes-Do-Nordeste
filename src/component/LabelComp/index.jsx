import styles from './LabelComp.module.css'

const LabelComp = ({text}) => {
    return (
        <label className={styles.labelDiv}>
            {text}
        </label>
    )
}


export default LabelComp;