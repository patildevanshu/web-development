export default function MsgBox({userName , textColor}) {
    let styles = {color : textColor}
    return (
        <p style={styles}> Hello , {userName}</p>
    )
}