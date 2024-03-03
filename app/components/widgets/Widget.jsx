const Widget = ( {variant, children} ) => {

    return ( 
        <div className={`widget ${variant?.classes}`}>

            {children}

        </div>
    );
}
 
export default Widget;