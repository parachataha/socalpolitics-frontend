const Badge = ( {text, color} ) => {
    return ( 
        <div className={`badge ${text} ${color || ''}`}>
            {text}
        </div>
     );
}
 
export default Badge;