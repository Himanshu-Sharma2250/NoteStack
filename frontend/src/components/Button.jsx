const Button = ({ name, txtColor, bgColor, btnSize, ...rest }) => {
    return (
        <div>
            <button 
                {...rest}
                className={`px-4 py-1 cursor-pointer rounded-xs font-medium transition-all duration-200 active:scale-95 hover:opacity-90`} 
                style={{ backgroundColor: bgColor, fontSize: btnSize, color: txtColor ? txtColor : '#F8FAFC' }}
            >
                {name}
            </button>
        </div>
    )
}

export default Button;