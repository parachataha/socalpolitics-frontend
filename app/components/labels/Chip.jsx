const Chip = ( {variant, children} ) => {
    return ( 
        <div className={`chip ${variant?.classes || ''}`}>
            {children}
        </div>
    );
}
 
export default Chip;