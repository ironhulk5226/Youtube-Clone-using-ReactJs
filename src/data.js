export const API_KEY = 'AIzaSyBTd6lO5f4wslzMcGM1bXPYojyN8VJSGTE'


// to convert 516824 views into simplified M or K values 
export const value_Converter = (value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }

}