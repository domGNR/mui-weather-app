 const degConversion = (unit,value) => {
    switch (unit) {
        case 'C':
            return Math.round(value-273.15)+' '+unit+'°'
        case 'F':
            return Math.round(((value - 273.15)*(9/5))+32)+' '+unit+'°'
        case 'K':
            return Math.round(value)+' '+unit+'°'
        default:
            break;
        }
    }
    export default degConversion
